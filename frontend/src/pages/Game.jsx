import { useLocation, useParams } from "react-router-dom"
import Board from "../components/Board"
import { useContext, useEffect, useState } from "react";
import { apiUrl, Context } from "../constant";

const Game = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState([]);
    const [ready, setReady] = useState(false);
    const [started, setStarted] = useState(false);
    const [myTurn, setMyturn] = useState(false);
    const [readyButtonEnabled, setReadyButtonEnabled] = useState(true);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const location = useLocation();
    const { roomName } = useParams();
    const {host} = location.state || {}
    console.log(roomName, host);

    useEffect(() => {
        setReady(false);
    }, [started])

    useEffect(() => {
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
                "layout": selectedBoard.layout
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
        <div>
            <h1>Room: {roomName}</h1>
            {(!ready && !started) && <div>
                <ul>
                    {boards.map((board, index) => (
                        <li key={index} onClick={() => {selectBoard(board, index)}}>
                            {board.name}
                            {(selectedBoard !== null && selectedBoard.index === index) && <span> ---selected</span>}
                            </li>
                        ))}
                </ul>
                <input type="button" value="Ready" disabled={readyButtonEnabled} onClick={ () => readyClicked() }/> 
            </div>}
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
        <div>
            waiting for other player
        </div>
    )
}

const prevData = {
	"board": [
		[
			" ",
			" ",
			" ",
			"p2",
			"p2",
			"p2",
			" ",
			" ",
			"p2"
		],
		[
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2"
		],
		[
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			" ",
			"p2"
		],
		[
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		[
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		[
			"g3 p1",
			" ",
			" ",
			"p p1",
			"lc p1",
			"g5 p1",
			"p p1",
			" ",
			" "
		],
		[
			" ",
			"l1 p1",
			"sp p1",
			"cp p1",
			"sg p1",
			"p p1",
			" ",
			"g4 p1",
			"sp p1"
		],
		[
			"l2 p1",
			"m p1",
			"cl p1",
			"p p1",
			"p p1",
			"f p1",
			"g1 p1",
			"g2 p1",
			"p p1"
		]
	],
	"move": [
		[
			6,
			0
		],
		[
			7,
			0
		]
	],
	"result": {
		"winning_piece": null,
		"winning_player": null
	}
}

const dummyData = {
	"board": [
		[
			" ",
			" ",
			" ",
			"p2",
			"p2",
			"p2",
			" ",
			" ",
			"p2"
		],
		[
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2"
		],
		[
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			"p2",
			" ",
			"p2"
		],
		[
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		[
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		[
			"g3 p1",
			" ",
			" ",
			"p p1",
			"lc p1",
			"g5 p1",
			"p p1",
			" ",
			" "
		],
		[
			"l2 p1",
			"l1 p1",
			"sp p1",
			"cp p1",
			"sg p1",
			"p p1",
			" ",
			"g4 p1",
			"sp p1"
		],
		[
			" ",
			"m p1",
			"cl p1",
			"p p1",
			"p p1",
			"f p1",
			"g1 p1",
			"g2 p1",
			"p p1"
		]
	],
	"move": [
		[
			7,
			0
		],
		[
			6,
			0
		]
	],
	"result": {
		"winning_piece": null,
		"winning_player": null
	}
}

export const GamePanel = ({roomName}) => {
    const {credentials} = useContext(Context);
    const [myTurn, setMyturn] = useState(false);
    const [board, setBoard] = useState([]);
    const [newBoard, setNewBoard] = useState([]);
    const [move, setMove] = useState(null);
	const [whichPlayer, setWhichPlayer] = useState("");


	const parseData = (data) => {
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
				(cell.piece.length > 2) ? 
					showAvailableMoves : () => {},
			color: ""
				}));
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
				color: 
					(index % 2 === 0) ?
						 "bg-slate-50" : "bg-slate-600"
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
			setMove(data.move);
			setNewBoard(data.board);
		}) 
		.catch(error => console.error('Fetch error:', error));
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
				setBoard(parseData(data.board).reverse());
			} else {
				setBoard(parseData(data.board));
			}
		}) 
		.catch(error => console.error('Fetch error:', error));
    }, [])

    const updateBoard = () => {
		if(whichPlayer === "p2"){
			setBoard(d => parseData(newBoard).reverse());
		} else {
			setBoard(d => parseData(newBoard));
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
                    if(response.ok){
                        return response.json();
                    } else {
                        return null
                    }
                })
                .then(data => {
                    console.log("Response Data:", data);
                    
					if(data.turn){
						setMove(data.move);
						setNewBoard(data.board);
					}
                    setMyturn(data.turn);
                }) 
                .catch(error => console.error('Fetch error:', error)); 
            }, 1000);
        }
        return () => {
            if(intervalId){
                clearInterval(intervalId);
            }
        };
    }, [myTurn])
    
    return (
        <div>
            <Board 
			board={board} 
			move={move} 
			updateBoard={updateBoard}
			whichPlayer={whichPlayer}
			/>
        </div>
    )
}


export default Game