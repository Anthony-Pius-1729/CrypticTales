import React, { useEffect, useState } from 'react'
import Keys from './Components/Keys'


const Board = ({dataSet}) => {
  // console.log(dataSet)
  // console.log(dataSet[0][`title`])

  
    return (
    <>
    <div className=' backdrop-blur-xl text-center bg-[rgba(22,33,62,0.9)]
    flex flex-col p-4
     rounded-xl w-full 
     h-[85%] border-[rgba(79,209,199,0.3)]  border-2 py-14'>
      <h1 className='text-[#4fd1c7] font-bold text-2xl text-center'>Decode the Message</h1>
      {/* <h3 className='text-xl mt-2 text-[#14a297] opacity-45 italic'>{dataSet[0][`title`]}  <span className='text-lg'>by {dataSet[0][`author`]}</span> </h3> */}
        <Keys  dataSet={dataSet}/>
    </div>
    </>
  )
}


export default Board