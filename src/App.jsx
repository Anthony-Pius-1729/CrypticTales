import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";
import RSideBar from "./Components/RSideBar";
import LSideBar from "./Components/LSideBar";
import Header from "./Components/Header";
const App = () => {

  const [data, setData] = useState([])
    useEffect( ()=>{
      const fetchData = async ()=>{
        const response = await fetch("https://gist.githubusercontent.com/Anthony-Pius-1729/5d43c2b529f5169bbdef126c9358fa6d/raw/532d56992fa04c28a36c5c28782bd1d707f689a5/db.json");
        const result = await response.json()
        console.log(result)
        const stories = result["data"]["stories"];
        console.log(stories)
        setData(stories);

      }
      fetchData();
    }, [])

    console.log(data);

  return (
    <>
    <div className=" overflow-hidden font-[raleway] bg-[linear-gradient(135deg,#0f0f23_0%,#1a1a2e_50%,#16213e_100%)] px-4 w-full h-full flex flex-col">
  <Header/>
    <div className="w-full h-[100vh] p-6  gap-x-4 flex justify-center">
    <LSideBar/>
    <Board dataSet={data}/>
    <RSideBar/>
    </div>
    </div>

    </>
  )
}

export default App