import { useEffect, useState } from "react";
import './style.css'
import Square from "../components/square";





export default function TicTacToe (){
    const[squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const[status,setStatus]=useState("")

    function handleClick(index) {
        let cpySquares=[...squares];

        if (getWinner(cpySquares) || cpySquares[index]) return;
        cpySquares[index]=xIsNext ? 'X' : 'O';
        setXIsNext(!xIsNext);
        setSquares(cpySquares);
    }

    function handlerestart() {
        setSquares(Array(9).fill(null));
    }

    useEffect(()=>{
        if (!getWinner(squares) && squares.every(item=> item !== null) ){
             setStatus("This is a draw! please restart the game ")
        }else if (getWinner(squares) ){
            setStatus(`Winner is ${getWinner(squares)}. Please restart the game!`)
        }else{
            setStatus(`Next player is ${xIsNext ? 'X': 'O'}`)
        }

    },[squares,xIsNext])

    function getWinner(squares){
        const winning = [[0,1,2],[3,4,5],[6,7,8], [2,5,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7]];

        for(let i = 0 ; i <winning.length; i++){
            const [x,y,z]=winning[i]

            if (squares[x] && squares[x]=== squares[y] && squares[x]=== squares[z] ){
                return squares[x]
            }
        }
        return null
    }
    return (
        <div className="container">

            <h1>Tic Tac Toe</h1>
            <div className="row">
                <Square value={squares[0]} onClick={()=>handleClick(0)}/>
                  <Square value={squares[1]}  onClick={()=>handleClick(1)}/>
                    <Square value={squares[2]}  onClick={()=>handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]}  onClick={()=>handleClick(3)}/>
                <Square value={squares[4]}  onClick={()=>handleClick(4)}/>
                 <Square value={squares[5]}  onClick={()=>handleClick(5)}/>

            </div>
            <div className="row">
                    <Square value={squares[6]}  onClick={()=>handleClick(6)}/>
                    <Square value={squares[7]}  onClick={()=>handleClick(7)}/>
                    <Square value={squares[8]}  onClick={()=>handleClick(8)}/>

            </div>

            <h1>{status}</h1>
           <div className="restart">
             <button onClick={handlerestart}>Restart</button>
           </div>

        </div>

    );
}