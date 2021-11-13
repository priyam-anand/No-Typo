import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import GameMenu from "./components/GameMenu"
import socket from './socketConfig';
import CreateGame from "./components/CreateGame"
import { useHistory } from 'react-router';
import JoinGame from "./components/JoinGame"
import TypeRacer from './components/TypeRacer';

const App = () => {
  
  const [gameState,setGameState] = useState({_id:"",isOpen:false,player:[],words:[]});
  const history = useHistory();

  useEffect(()=>{
    socket.on('update-game',(game)=>{
      console.log(game);
      setGameState(game);
    });
    return () => {
      socket.removeAllListeners();
    }
  },[]);
  
  useEffect(()=>{
    if(gameState._id !== "")
    {
      history.push(`/game/${gameState._id}`);
    }
  },[gameState._id,history])

  return (
    <>
        <Switch>
          <Route exact path='/'>
            <GameMenu/>
          </Route>
          <Route exact path='/game/create'>
            <CreateGame/>
          </Route>
          <Route exact path='/game/join'>
            <JoinGame/>
          </Route>
          <Route exact path='/game/:gameID'>
            <TypeRacer game={gameState}/>
          </Route>
        </Switch>
    </>
  )
}

export default App
