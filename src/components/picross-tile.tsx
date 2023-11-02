import '../components/picross-tile.css'
import { useState } from 'react';

export default function PicrossTile(props: any) {
  const height = props.height
  const width = props.width
  const onClick = props.onClick
  const setIsVictory = props.setIsVictory
  const isVictory = props.isVictory
  const [clicked, setValue] = useState(false)

  function handleClick(){
    setValue(!clicked);
    onClick(width, height, setIsVictory);
  }

  return <button 
    className={'tile ' + (clicked ? (isVictory ? 'win' : 'checked') : 'unchecked')} 
    disabled={isVictory}
    onClick={handleClick}>
  </button>;
}
