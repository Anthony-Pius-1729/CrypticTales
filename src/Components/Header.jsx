import React from 'react'

const Header = () => {
  return (
    <>
    
    <div className="flex justify-between  items-center bg-[rgba(15,15,35,0.8)] backdrop-blur-3xl h-full m-5 p-4 rounded-lg text-white border-[1px] border-[rgba(79,209,199,0.3)]">
        <h1 className='text-transparent 
        bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]
         bg-clip-text font-bold font-[VT323]
           text-5xl'>Cryptic Tales</h1>
        <div className='flex justify-start gap-x-5 items-center'>
            <p className=''>Chapter 1: The Fibonacci Mystery</p>
            <div className='bg-purple-950 rounded-2xl p-2 flex justify-center'>
              <p className='text-sm px-2.5 text-purple-300'>
            Pattern: F(n) = F(n-1) + F(n-2)
              </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header