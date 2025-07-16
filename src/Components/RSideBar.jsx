import React from 'react'

const RSideBar = () => {

  const hints = [
    {
      id: 1,
      icon: <i class=" mr-2.5 text-xl ">🔢</i>,
      heading: "Mathematical clue:",
      explanation: "Each number follows the golden ratio sequence..."
    },
    {
      id: 2,
      icon: <i class="fa-solid fa-arrow-down-a-z mr-2.5 text-xl text-amber-200"></i>,
      heading: "Letter Mapping:",
      explanation: "A=1, B=2, C=3... but transformed by the sequence!"
    },
    {
      id: 3,
      icon: <i class="fa-solid fa-bullseye mr-2.5 text-xl text-[rgb(252,83,61)]"></i>,
      heading: "Pattern Recognition:",
      explanation: "Look for the sum of consecutive terms..."
    }
  ]
  const partialSequence = [
    {
      id: 1,
      value: 1
    },
    {
      id: 2,
      value: 1
    },
    {
      id: 3,
      value: 2
    },
    {
      id: 4,
      value: 3
    },
    {
      id: 5,
      value: 5
    }
    
  ]
  return (
    <>
   

    <div className='w-[50%] h-[85%] rounded-2xl  flex flex-col text-white border-1 p-4 border-[rgba(79,209,199,0.3)]'>

      <h1 className='font-[montserrat] text-xl font-semibold p-4 bg-clip-text text-transparent bg-[linear-gradient(315deg,#20bf55_0%,#01baef_74%)] text-center'>Cryptic Hints</h1>
      
      <div>
        {
          hints.map((item)=>{
        
            return <div key ={item.id} className='p-4 mb-4 bg-[rgba(63,22,65,0.3)] rounded-xl border-[1px] border-[rgba(226,82,234,0.3)]'>

        <div className='flex justify-start items-center'>
        {item.icon}
        <h1 className='font-semibold mb-0.5'>{item.heading}</h1>
        </div>
          <p className='block'> 
          {item.explanation}
          </p>
        </div>
          })
        }
        
        
      </div>
    <div className='bg-[rgba(10,15,28,0.9)] rounded-xl w-full border-2 h-full border-[rgba(79,209,199,0.3)] '>
      <h1 className='font-bold text-[#4fd1c7] p-4'>Current Sequence:</h1>
      <div className='grid grid-cols-6 px-4 overflow-y-auto overscroll-contain'>

        {
          partialSequence.map((btn)=>{
            return <button className='bg-[#031a19] text-[#4fd1c7]  border-[1px] border-[#39978f] p-1 w-[2rem] mb-1.5 rounded-md gap-x-6'>{btn.value}</button>
          })
        }
      </div>
    </div>
    </div>
    
    </>
  )
}

export default RSideBar