import React from 'react'

const Keys = ({dataSet}) => {
  const base = dataSet[0][`story_text`].replaceAll(" ", "")
  const textArray = base.split('');
  const len  = textArray.length;
  console.log("from Keys", textArray);
  console.log(typeof(","));
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  {/*
    Let's display all characters.
    --->create a map for each alphabets and their corresponding numerical values
    --->get a list of functions and map them to an array
    create a function to randomly assign numbers 
    */}
    // let dict = {}

    // for (let i = 0; i < 26; i++) {
    //   dict[alphabet[i]] = i
    // }
    // console.log("Dictionary: ", dict);

    const Lucas = (x)=>{
      if( x == 0 )return 2;
      if(x == 1) return 1;
      return Lucas (x-1) + Lucas(x - 2);
    }
    let lucasArray = []

    for (let i = 1; i <= 26; i++) {
      lucasArray.push(Lucas(i));
    }
    console.log(lucasArray)

    const funcMaps = [
      {
        "lucas" : lucasArray
      }
    ]
    const Maps = {}
    const special_chars = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`
    for (let i = 0; i< 26; i++) {
      Maps[alphabet[i]] = lucasArray[i]
    }
    console.log("Maps created: ", Maps);

  return (
    <>
    <div>

    <div className='m-6 border-2 rounded-3xl border-[rgba(79,209,199,0.3)] bg-[rgba(10,18,33,0.9)] h-[60%]'>
      
      <div className='grid grid-cols-7 grid-rows-9 gap-x-0.5 p-8 ' >
      {
        textArray.map((letter, idx) => {
          if (idx < len-488){
            // let ch = letter
            const newChar = letter.toUpperCase()
            let checker = special_chars.includes(letter)
            console.log(checker)
            

            return <button className={`p-2 w-[4rem]
               bg-${checker ? `white` : `[#FFCB61]`}
                text-${checker ?`gray-50` :`[#4fd1c7]`}
                 border-[1px] border-[#39978f] rounded-xl m-2`}>{checker? newChar : Maps[newChar]}</button>
          }
          else return <></>
        })
      }
      </div>
      
      </div>
      <div className='flex justify-between mx-6 gap-x-4'>
        <input type='text' placeholder='Enter decoded text...' className='p-6 drop-shadow-md drop-shadow-[#4fd1c7]  border-2 border-[#4fd1c7] outline-none w-full h-[2rem] rounded-md text-gray-400 bg-[rgba(19,35,63,0.9)]'/>
        <button className='p-2 outline-none rounded-lg text-gray-50 border-[rgba(79,209,199,0.3)] font-semibold border-none w-[30%] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]'>Decode</button>
      </div>
    </div>
    </>
  )
}

export default Keys