import React from "react";
import PicrossTile from "./picross-tile";
import './picross-board.css'
import seedrandom from "seedrandom";
import { useState } from 'react';
import { useRouter } from "next/router";
import ReloadButton from "./reload-button";

var trackingBoard: Array<Array<boolean>>;
var boardData: Array<Array<boolean>>;

function genBoard(width: number, height: number){
  var board = [];
  var randomVal;
  const seedrandom = require('seedrandom');
  const seed = new Date().getTime().toString()
  const rng = seedrandom(seed);
  console.log('generating board')

  for(var i = 0 ; i < width ; i++) {
    var row = [];
    for(var j = 0 ; j < height ; j++) {
      randomVal = rng();
      if(randomVal > 0.6){
        row.push(false)
      } else{
        row.push(true)
      }
    }
    board.push(row);
  } 

  return board
}

function compareStates(tracking: Array<Array<number>>, actual: Array<Array<number>>){
  for(var i = 0; i < tracking.length; i++){
    for(var j = 0; j < tracking.length; j++){
      if(tracking[i][j] != actual[i][j]){
        return false;
      }
    }
  }
  return true;
}

function countRows(boardData: Array<Array<boolean>>){
  var res: Array<Array<number>> = [];
  var count: number = 0;

  for(var i = 0; i < boardData.length; i++){
    var row: Array<number> = []
    for(var j = 0; j < boardData[0].length; j++){
      if(boardData[i][j]){
        count++;
      } else if(count != 0 && !boardData[i][j]){
        row.push(count);
        count = 0;
      }
    }
    if(count != 0){
      row.push(count)
      count = 0
    }
    res.push(row)
  }
  return res
}

function countCols(boardData: Array<Array<boolean>>){
  var res: Array<Array<number>> = [];
  var count: number = 0;

  for(var j = 0; j < boardData[0].length; j++){
    var col: Array<number> = []
    for(var i = 0; i < boardData.length; i++){
      if(boardData[i][j]){
        count++;
      } else if(count != 0 && !boardData[i][j]){
        col.push(count);
        count = 0;
      }
    }
    if(count != 0){
      col.push(count)
      count = 0
    }
    res.push(col)
  }
  return res
}

function emptyBoard(width: number, height: number){
  var board = [];
  
  for(var i = 0 ; i < width ; i++) {
    var row = [];
    for(var j = 0 ; j < height ; j++) {
      row.push(false)
    }
    board.push(row);
  } 
  return board;
}

export default function PicrossBoard(props: any) {
  let width: number = props.width;
  let height: number = props.height;
  //let data = Array.from({length: height}, (_,h_index) => (Array.from({length: width}, (_,w_index) => (0))));  

  var colNums: Array<Array<number>> = [[]];
  var rowNums: Array<Array<number>> = [];

  const [isVictory, setIsVictory] = useState(true)
  var [boardData, setBoardData] = useState(genBoard(width, height))

  if(!isVictory){
    trackingBoard = emptyBoard(width, height)
    rowNums = countRows(boardData);
    colNums = countCols(boardData)
    console.log(boardData)
  }

  
  const handleTileClick = (width: number, height: number, setIsVictory: any) => {
    trackingBoard[width][height] = !trackingBoard[width][height]
    console.log(typeof(setIsVictory))
    
    if(compareStates(countCols(trackingBoard),countCols(boardData))
    && compareStates(countRows(trackingBoard),countRows(boardData))){ 
      setIsVictory(true)
      console.log("VERIFIED")
    } else{
      setIsVictory(false)
      console.log("DEVERIFIED")
    }
  }
  
  return (
    <div>
      <div className="topNums">
        {colNums.map((col, rowIndex) => (
          <div key={rowIndex} className="topArr">
            {col.map((component: any, colIndex) => (
              <div className="topCell unselectable">{component}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="midsection">
        <div className="sideContainer">
          <div className="sideNums">
            {rowNums.map((col, rowIndex) => (
              <div key={rowIndex} className="sideArr">
                {col.map((component: any, colIndex) => (
                  <div className="sideCell unselectable">
                    <div className="vBalancer">{component}</div>
                    </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="board">
          {boardData.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((component, colIndex) => (
                <PicrossTile isVictory={isVictory} key={rowIndex + '-' + colIndex} onClick={handleTileClick} width={rowIndex} height={colIndex} setIsVictory={setIsVictory}></PicrossTile>
              ))}
            </div>
          ))}
        </div>
        <div className="resetPanel">
          <ReloadButton></ReloadButton>
        </div>
      </div>
      <div className="victoryIndicator" hidden={!isVictory}>
        <p className="victoryIndicator">You Win!</p>
      </div>
    </div>
  );
}

