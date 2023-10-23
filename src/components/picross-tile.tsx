import '../components/picross-tile.css'
import { useState } from 'react';

export default function PicrossTile(props: any) {
  const height = props.height
  const width = props.width
  const onClick = props.onClick
  const [clicked, setValue] = useState(false)

  function handleClick(){
    setValue(!clicked);
    const bubble = 'clicked ' + width + height
    onClick(bubble);
  }

  return <button 
    className={'tile ' + (clicked ? 'checked' : 'unchecked')} 
    onClick={handleClick}>
  </button>;
}
