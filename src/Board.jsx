import React from 'react'
import Keys from './Keys'


const Board = () => {
  
  
  
    return (
    <>
    <div className='absolute z-30 backdrop-blur-4xl flex flex-col items-center justify-center rounded-xl shadow-2xl opacity-40 w-3xl h-[80vh] border-amber-50 bg-linear-to-tr from-[#7debe4] to-[#01BAEF] border-2 '>
        <Keys/>
    </div>
    </>
  )
}


export default Board