import { useLocation, useNavigate, useParams } from "react-router-dom"
import Board from "../components/Board"
import { useContext, useEffect, useState } from "react";
import { apiUrl, Context, GameContext } from "../constant";
import BoardPreview from "../components/BoardPreview";
import ButtonLG from "../components/ButtonLG";

const Game = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState([]);
    const [ready, setReady] = useState(false);
    const [started, setStarted] = useState(false);
    const [myTurn, setMyturn] = useState(false);
    const [readyButtonEnabled, setReadyButtonEnabled] = useState(true);
    const [selectedBoard, setSelectedBoard] = useState({index: -1});
    const location = useLocation();
    const { roomName } = useParams();
    const {host} = location.state || {};
	const navigate = useNavigate();
    console.log(roomName, host);

    useEffect(() => {
        setReady(false);
    }, [started])

    useEffect(() => {
        let resume = false
        fetch(apiUrl + `game/update/?room_name=${roomName}&intent=resume`, {
            method: "GET", // HTTP method
            headers: {
                "Authorization": "Token " + credentials.token,
            }
        })
        .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                return response.json();
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log("Response Data:", data);
            if(data.resume){
                setStarted(true);
                setReady(false);
                resume = true;
                return;
            } else {
                throw new Error(data.error);
            }
        }) 
        .catch(error => console.error('Fetch error:', error)); 

        if(resume) return;

        fetch(apiUrl + "game/my-boards/", {
            method: "GET", // HTTP method
            headers: {
                "Authorization": "Token " + credentials.token,
            }
        })
        .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                return response.json();
            } else {
                return null
            }
        })
        .then(data => {
			if(data === null){
				navigator;
				navigate('/join');
			}
            console.log("Response Data:", data);
            setBoards(d => [...data]);
        }) 
        .catch(error => console.error('Fetch error:', error)); 
    }, [])

    const selectBoard = (board, index) => {
        setSelectedBoard({...board, index});
        setReadyButtonEnabled(false);
    };

    const readyClicked = () => {
        console.log("ready"); 
        setReady(true);
        setReadyButtonEnabled(false);
        fetch(apiUrl + "game/ready/", {
            method: "POST", // HTTP method
            headers: {
                "Authorization": "Token " + credentials.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "room_name": roomName,
                "layout": selectedBoard.id
            })
        })
        .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                setReady(true);
                return response.json();
            } else {
                return null
            }
        })
        .then(data => {
            console.log("Response Data:", data);
            setBoards(d => [...data]);
            
        }) 
        .catch(error => console.error('Fetch error:', error)); 
    }

    return(
        <div className="w-full h-full flex items-center flex-col">
            {(!ready && !started) && 
            <>
            <div className="flex flex-row justify-between items-center w-3/5 mb-5">
                <h1 className="text-xl my-4">Room: {roomName}</h1>
                <ButtonLG text={'Ready'} onClick={ () => readyClicked() } isDisabled={readyButtonEnabled} color={"bg-medium-1"}></ButtonLG>
            </div>
			<div className="w-2/3">
                <ul className="grid grid-cols-2 gap-4">
                    {boards.map((board, index) => (
                        <li className="flex flex-col items-center" key={index} onClick={() => {selectBoard(board, index)}}>
							<h3 className="text-xl">
								{board.name}
							</h3>
							<div className={`w-[90%] cursor-pointer ${(index === selectedBoard.index) ? "border-green-600 border-4 rounded-lg" : ""}`}>
								<BoardPreview board={board.layout} />
							</div>
                            </li>
                        ))}
                </ul>
            </div>
            </>
            }
            {ready && <WaitingPanel setStarted={setStarted} roomName={roomName} setMyturn={setMyturn}/>}
            {started && <GamePanel startingTurn={myTurn} roomName={roomName}/>}
        </div>
    )
}

const WaitingPanel = ( {setStarted, roomName, setMyturn} ) => {
    const {credentials} = useContext(Context);
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(apiUrl + `game/update/?room_name=${roomName}&intent=isStarted`, {
                method: "GET", // HTTP method
                headers: {
                    "Authorization": "Token " + credentials.token,
                }
            })
            .then(response => {
                console.log("Response Status:", response.status); // Log status code
                if(response.ok){
                    return response.json();
                } else {
                    return null
                }
            })
            .then(data => {
                console.log("Response Data:", data);
                if(data.started === true){
                    setStarted(true);
                    setMyturn(data.turn);
                }
            }) 
            .catch(error => console.error('Fetch error:', error)); 
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="h-full flex items-center text-3xl">
            Waiting for other player...
        </div>
    )
}


export const GamePanel = ({roomName}) => {
    const {credentials} = useContext(Context);
    const [myTurn, setMyturn] = useState(false);
    const [board, setBoard] = useState([]);
    const [newBoard, setNewBoard] = useState([]);
    const [move, setMove] = useState(null);
	const [whichPlayer, setWhichPlayer] = useState("");
    const navigate = useNavigate();


	const parseData = (data, turn) => {
		console.log("turn when parsed", turn);
		let parsedData = [];
		data.forEach((row, rowInd) => {
			row.forEach((col, colInd) => {
				parsedData.push({
					piece: col,
					position: {
						x: rowInd,
						y: colInd
					},
				})
			})
		})
		parsedData = parsedData.map((cell, index) => ({
			...cell, 
			onClick: 
				(cell.piece.length > 2 && turn) ? 
					showAvailableMoves : () => {},
			color: ""
				}));
		console.log(parsedData);
		return parsedData;
	}

	const showAvailableMoves = (index, cell) => {
		// console.log(cell);
		const indexToCheck = [((index + 1) % 9 === 0) ? -1 : index + 1, (index % 9 === 0) ? -1 : index - 1, index - 9, index + 9]
		setBoard(b => (
			b.map((cellItem, index) => {
				if(indexToCheck.includes(index)){
					if(cellItem.piece.length < 3){
						return {...cellItem, onClick: () => { moveHere(cellItem, [cell.position.x, cell.position.y]) }, color: "bg-green-500"}
					}
					return {...cellItem, onClick:() => {resetOnclicks()}}
				}
				return {...cellItem, onClick:() => {resetOnclicks()}}
			})
		))
	};

	const resetOnclicks = () => {
		setBoard(b => (
			b.map((cell, index) => ({
				...cell, 
				onClick: 
					(cell.piece.length > 2) ? 
						() => { showAvailableMoves(index, cell) } : () => {},
				color: ''
					}))
		))
	} 

	const moveHere = (cell, from) => {
		const move = [from, [cell.position.x, cell.position.y]];
		console.log(move);
		fetch(apiUrl + `game/move/`, {
			method: "POST", // HTTP method
			headers: {
				"Authorization": "Token " + credentials.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"room_name": roomName,
				"move": move
			})
		})
		.then(response => {
			console.log("Response Status:", response.status); // Log status code
			return response.json()
		})
		.then(data => {
            if(data.error){
                throw new Error(data.error)
            }
			console.log("Response Data:", data);
			console.log("turn: ", myTurn);
            if(data.winner !== null){
                console.log("winner", data.winner);
                if(data.winner){
                    alert("you won");
                } else {
                    alert("you lost");
                }
                setMyturn(true);
                setMove(data.move);
                setNewBoard(data.board);
                return;
            }
			setMyturn(data.turn);
			setMove(data.move);
			setNewBoard(data.board);
		}) 
		.catch(error => {
            console.error('Fetch error:', error)
            alert(error);
            navigate('/');
        });
	} 

    useEffect(() => {
		fetch(apiUrl + `game/update/?room_name=${roomName}&intent=initial`, {
			method: "GET", // HTTP method
			headers: {
				"Authorization": "Token " + credentials.token,
			}
		})
		.then(response => {
			console.log("Response Status:", response.status); // Log status code
			if(response.ok){
				return response.json();
			} else {
				return null
			}
		})
		.then(data => {
			console.log("Response Data:", data);
			console.log("turn: ", myTurn);
			setMyturn(data.turn);
			setMove(null);
			setWhichPlayer(data.player);
			if(data.player === "p2"){
				setBoard(parseData(data.board, data.turn).reverse());
			} else {
				setBoard(parseData(data.board, data.turn));
			}
		}) 
		.catch(error => console.error('Fetch error:', error));
    }, [])

    const updateBoard = (turn) => {
		console.log('myTurn whe updated', turn);
		if(whichPlayer === "p2"){
			setBoard(d => parseData(newBoard, turn).reverse());
		} else {
			setBoard(d => parseData(newBoard, turn));
		}
		setMove(null);
    }

    useEffect(() => {
        let intervalId;
        if(!myTurn){
            intervalId = setInterval(() => {
                fetch(apiUrl + `game/update/?room_name=${roomName}&intent=turnUpdate`, {
                    method: "GET", // HTTP method
                    headers: {
                        "Authorization": "Token " + credentials.token,
                    }
                })
                .then(response => {
                    console.log("Response Status:", response.status); // Log status code
                    return response.json();
                })
                .then(data => {
                    if(data.error){
                        throw new Error(data.error);
                    }
                    console.log("Response Data:", data);
                    if(data.winner !== null){
                        console.log("winner: ", data.winner);
                        if(data.winner){
                            alert("you won");
                        } else {
                            alert("you lost");
                        }
                        setMyturn(true);
                        setMove(data.move);
                        setNewBoard(data.board);
                        return;
                    }
					if(data.turn){
						setMove(data.move);
						setNewBoard(data.board);
						console.log("positive turn update no more should follow");
					} else {
						console.log("negative turn update");
					}
                    setMyturn(t => data.turn);
                }) 
                .catch(error => {
                    console.error('Fetch error:', error)
                    alert(error);
                    navigate("/");
                }); 
            }, 1000);
        } else {
			console.log("useEffect update", myTurn);
			// updateBoard(myTurn);
		}
        return () => {
            if(intervalId){
                clearInterval(intervalId);
            }
        };
    }, [myTurn])
    
    return (
		<GameContext.Provider value={{myTurn}}>
            <div className="flex flex-row w-full justify-center my-6">
                <div className="flex flex-col mr-6">
                    <h2 className="text-2xl mb-2">Room: {roomName}</h2>
                    <h2 className="text-2xl mb-2">Turn: {(myTurn)? "Your Turn" : "Opponent's Turn"}</h2>
                    <ButtonLG text={"Surrender"} color={"bg-red-200"}/>
                </div>
                <Board 
                turn={myTurn}
                board={board} 
                move={move} 
                updateBoard={updateBoard}
                whichPlayer={whichPlayer}
                />
            </div>
		</GameContext.Provider>
    )
}


export default Game