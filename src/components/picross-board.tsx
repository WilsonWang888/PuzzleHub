import React from "react";
import PicrossTile from "./picross-tile";
import './picross-board.css'

export default function PicrossBoard(props: any) {
  let width: number = props.width;
  let height: number = props.height;
  let data = Array.from({length: height}, (_,index) => (Array.from({length: width}, (_,index) => (<PicrossTile/>))));  
  
  return (
    <div className="board">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((component, _) => (
            component
          ))}
        </div>
      ))}
    </div>
  );
}
