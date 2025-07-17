import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";
import RSideBar from "./Components/RSideBar";
import LSideBar from "./Components/LSideBar";
import Header from "./Components/Header";
import dbData from "./data.json";
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = dbData;

    const stories = result.data.stories;

    setData(stories);
    console.log("Data fetched");
  }, []);

  const finalData = data.map((e) => e);

  return (
    <>
      <div className=" overflow-hidden font-[raleway] bg-[linear-gradient(135deg,#0f0f23_0%,#1a1a2e_50%,#16213e_100%)] px-4 w-full h-full flex flex-col">
        <Header />
        <div className="w-full h-[100vh] p-6  gap-x-4 flex justify-center">
          <LSideBar />

          <Board dataSet={finalData} />

          <RSideBar />
        </div>
      </div>
    </>
  );
};

export default App;
