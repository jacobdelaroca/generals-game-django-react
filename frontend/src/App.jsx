import { useState, useEffect, createContext, useContext, useRef} from 'react'
import './App.css'
import { WIDTH, Context } from './constant';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import PieceConfigScreen from './pages/PieceConfig';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Game from './pages/Game';
import BoardLayout from './Layouts/BoardLayouts';
import MyBoards from './pages/MyBoards';
import JoinGame from './pages/JoinGame';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='layout' element={ <BoardLayout/> }>
        <Route path='config' element={<PieceConfigScreen/>}/>
        <Route 
          path='boards' 
          element={<MyBoards/>}
        />
      </Route>
      <Route path='game/:roomName' element={<Game/>}/>
      <Route path='join' element={<JoinGame/>}/>
    </Route>
  )
)

function App() {
  const [credentials, setCredentials] = useState({token: "", user: ""})
  useEffect(() => {console.log("stateData", credentials)}, [credentials])

  return (
    <>
      <Context.Provider value={{credentials, setCredentials}}>
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  )
}



export default App
