import Board from "../components/Board"
import BoardPreview from "../components/BoardPreview"
import { GamePanel } from "./Game"
import hero1 from "../assets/hero-img-1-2x.png"
import ButtonLG from "../components/ButtonLG"
import { useNavigate } from "react-router-dom"


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col items-center relative">
            <img className=" w-full h-auto cover block absolute -z-0 translate-y-[-30%] translate-x-[0%]" src={hero1} alt="hero image" />
            <div className="relative w-3/5 bg-white rounded-xl mt-52 shadow-2xl">
                <div className="w-full flex justify-between">
                    <h1 className="text-[3em]  mb-3 ml-4 ">
                        Take. Advance. Conquer.
                    </h1>
                    <ButtonLG color={"bg-medium-2 translate-y-[-70%] mr-32"} text={"Play"} customWidth={'w-52'} onClick={() => {navigate("/join")}}></ButtonLG>
                    
                </div>
                <div className="flex relative items-center w-full p-4 mt-12">
                        <h2 className="text-2xl mb-12">
                            Take charge of your own army. Lead them to victory. Crush the enemy. Play Slapakan, otherwise known as Game of the Generals.
                        </h2>
                </div>
                <div className=" w-full p-4 ">
                        <h2 className="text-2xl mb-6">
                            Play with your friends
                        </h2>
                        <p className="text-xl">Create your own room and invite over a friend to have exciting matches to see which one is the best strategist</p>
                        <ButtonLG color={"bg-medium-2"} text={"Invite Friends"} customWidth={'w-52'} onClick={() => {navigate("/join")}}></ButtonLG>
                </div>
                <div className=" w-full p-4 ">
                        <h2 className="text-2xl mb-6">
                            How to play
                        </h2>
                        <p className="text-xl">If you are new to the game and is not quite sure how to play. Check out the game rules and the learn how to play.</p>
                        <ButtonLG color={"bg-medium-2"} text={"Wiki"} customWidth={'w-52'} onClick={() => {window.open("https://en.wikipedia.org/wiki/Game_of_the_Generals", '_blank', 'noopener,noreferrer') }}></ButtonLG>
                </div>
                <div className=" w-full p-4 ">
                        <h2 className="text-2xl mb-6">
                            Create your formation
                        </h2>
                        <p className="text-xl">To play Salpakan, you must first create your piece formation. Strategize where to put the pieces and plot some clever plans in order to secure victories against your enemies</p>
                        <ButtonLG color={"bg-medium-2"} text={"Create Board"} customWidth={'w-52'} onClick={() => {navigate("/layout/boards")}}></ButtonLG>
                </div>
                
            
                
            </div>
        </div>
    )
}

export default Home
