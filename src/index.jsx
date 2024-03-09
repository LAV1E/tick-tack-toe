import { useEffect, useState } from 'react';
import './App.css';

function Square({value, onClick}){
    return(
        <button onClick={onClick} className="square">{value}</button>
    )
}

const TickTacToe =()=>{
    
    const [square,setSquares] = useState(Array(9).fill(''));
    const[isXturn,setXturn] = useState(true);
    const [satus,setStatus] = useState(''); 

    function getWinner(square){
        const winningPattern = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [2,5,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
        ];

        for(let i = 0; i<winningPattern.length;i++){
            const [x,y,z] = winningPattern[i];

            if(square[x] && square[x] === square[y] &&square[x] === square[z]){
                return square[x];
            }
        }
        return null;
    }

    function handleClick(getCurrentSquare){
        let cpySquares = [...square];
        if(getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
        cpySquares[getCurrentSquare] = isXturn?  'X': 'O';
        setXturn(!isXturn);
        setSquares(cpySquares);
    }

    function handleRestart(){
        setXturn(true);
        setSquares(Array(9).fill(""))
    }

    useEffect(()=>{
       if(!getWinner(square) && square.every(item => item !== '')){
        setStatus('This is a draw please restart  the game :|')
       }else if(getWinner(square)){
         setStatus(`Winner is ${getWinner(square)} Please restart the game:)`)
       }else{
        setStatus(`Next player is ${isXturn ?  "X" : "O"}`)
       }
    }, [square,isXturn]);

  return(
    <div className="tic-tac-toe">
        <div className="row">
            <Square value={square[0]} onClick={()=> handleClick(0)} />
            <Square value={square[1]} onClick={()=> handleClick(1)}/>
            <Square value={square[2]} onClick={()=> handleClick(2)}/>
        </div>
        <div className="row">
            <Square value={square[3]} onClick={()=> handleClick(3)}/>
            <Square value={square[4]} onClick={()=> handleClick(4)}/>
            <Square value={square[5]} onClick={()=> handleClick(5)}/>
        </div>
        <div className="row">
            <Square value={square[6]} onClick={()=> handleClick(6)}/>
            <Square value={square[7]} onClick={()=> handleClick(7)}/>
            <Square value={square[8]} onClick={()=> handleClick(8)}/>
        </div>
        <h1>{satus}</h1>
        <button  className='btn' onClick={handleRestart}>Restart</button>
    </div>
  );
}
export default TickTacToe; 