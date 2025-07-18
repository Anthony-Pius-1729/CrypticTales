import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";
import RSideBar from "./Components/RSideBar";
import LSideBar from "./Components/LSideBar";
import Header from "./Components/Header";
import dbData from "./data.json";
const App = () => {
  const [data, setData] = useState([]);
  const [displayR, setDisplayR] = useState(true);

  useEffect(() => {
    const result = dbData;

    const stories = result.data.stories;

    setData(stories);
    console.log("Data fetched");
  }, []);

  const finalData = data.map((e) => e);

  return (
    <>
      <div className="relative overflow-x-hidden scroll-smooth   justify-center font-[raleway] bg-[linear-gradient(135deg,#0f0f23_0%,#1a1a2e_50%,#16213e_100%)] px-4 w-full h-full flex flex-col">
        <Header />
        <div className="w-full h-[100vh] px-6 pt-6  gap-x-4 flex justify-center">
          <LSideBar />

          <Board dataSet={finalData} />

          {displayR && <RSideBar />}
        </div>
        <div className="absolute bottom-[-3.5rem] flex flex-col justify-center items-center ">
          <div className="flex justify-between items-center mb-6 p-12 border-[0.2px] rounded-3xl border-[rgba(79,209,199,0.3)] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)] w-[87rem]">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Score: 2,330</span>
              <span>|</span>
              <span>❤️❤️❤️❤️❤️</span>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border-none bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                Hint
              </button>
              <button className="px-4 py-2 border-none bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 border-none bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
