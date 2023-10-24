// src/pages/about.js
import React from 'react';
import PicrossTile from '../components/picross-tile'
import '../styles/global.css'
import PicrossBoard from '@/components/picross-board';

export default PicrossPage;

function PicrossPage() {
  return (
    <div className='bg-primary'>
      <PicrossBoard width='10' height='10'></PicrossBoard>
    </div>
  );
}

