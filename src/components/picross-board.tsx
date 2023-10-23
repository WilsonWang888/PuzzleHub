import React from "react";
import PicrossTile from "./picross-tile";
import './picross-board.css'
import { useState } from 'react';
import { off } from "process";

// seed
var counter = 1258;

function genBoard(width: number, height: number){
  var board = [];
  var randomVal, fcount = 0, tcount = 0

  for(var i = 0 ; i < width ; i++) {
    var row = [];
    for(var j = 0 ; j < height ; j++) {
      randomVal = Math.random();
      if(randomVal > 0.5){
        row.push(false)
        fcount++
      } else{
        row.push(true)
        tcount++
      }
    }
    board.push(row);
  } 

  return board
}

const handleTileClick = (tileData: any) => {
  // Do something with the data received from Tile
  console.log(`Data received from Tile: ${tileData}`);
};


export default function PicrossBoard(props: any) {
  let width: number = props.width;
  let height: number = props.height;
  let data = Array.from({length: height}, (_,h_index) => (Array.from({length: width}, (_,w_index) => (0))));  

  //const [boardData, setValue] = useState(genBoard)
  const boardData = genBoard(width, height);
  
  return (
    <div className="board">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((component, colIndex) => (
            <PicrossTile key={rowIndex + '-' + colIndex} onClick={handleTileClick} width={rowIndex} height={colIndex}></PicrossTile>
          ))}
        </div>
      ))}
    </div>
  );
}

