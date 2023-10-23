import '../components/picross-tile.css'
import { useState } from 'react';

export default function PicrossTile() {
  const [clicked, setValue] = useState(false)
  function handleClick(){
    setValue(!clicked);
  }
  return <button className={'tile ' + (clicked ? 'checked' : 'unchecked')}
  onClick={handleClick}></button>;
}
