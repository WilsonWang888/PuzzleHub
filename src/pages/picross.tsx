// src/pages/about.js
import React from 'react';
import PicrossTile from '../components/picross-tile'
import '../styles/global.css'

export default PicrossPage;

import dynamic from 'next/dynamic'
 
const PicrossBoard = dynamic(() => import('../components/picross-board'), { ssr: false })

function PicrossPage() {
  return (
    <div className='bg-primary'>
      <PicrossBoard width='10' height='10'></PicrossBoard>
    </div>
  );
}

