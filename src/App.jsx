import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";
import RSideBar from "./Components/RSideBar";
import LSideBar from "./Components/LSideBar";
import Header from "./Components/Header";
import dbData from "./data.json";
import ChatComponent from "./Components/ChatComponent";
const App = () => {
  const [data, setData] = useState([]);
  const [displayR, setDisplayR] = useState(false);
  const [seqData, setSeqData] = useState(null);

  const handleDatas = (x) => {
    setSeqData(x);
  };

  const handleShow = () => {
    setDisplayR(false);
  };

  const handleClick = () => {
    setDisplayR(!displayR);
  };

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

          <Board dataSet={finalData} handleData={handleDatas} />

          {displayR && <RSideBar ondisp={handleShow} sequenceData={seqData} />}
        </div>
        <div className="fixed bottom-4 backdrop-blur-xs left-0 right-0 px-4 flex justify-center z-50">
          <div className="flex justify-between items-center gap-8 p-6 max-w-screen-xl w-full border border-[rgba(79,209,199,0.3)] rounded-3xl bg-gradient-to-br from-[#4fd1c7] to-[#7c3aed]">
            <div className="flex items-center gap-2 text-white font-semibold whitespace-nowrap">
              <span>Score: 2,330</span>
              <span>|</span>
              <span>❤️❤️❤️❤️❤️</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                className="px-4 py-2  hover:border-1  backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors"
              >
                Hint
              </button>
              <button className="px-4 py-2 hover:border-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 hover:border-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
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
