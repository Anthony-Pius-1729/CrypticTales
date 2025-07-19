import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import PatternBuilder from "./PatternBuilder";
import ChatComponent from "./ChatComponent";

const RSideBar = ({ ondisp, sequenceData }) => {
  const INITIAL_TIME = 60;
  const [text, setText] = useState("");
  const [time, setTime] = useState(INITIAL_TIME);
  const [disp, setDisp] = useState(true);
  const [chat, setChat] = useState(false);
  console.log("right bar", sequenceData);

  const progressPercentage = (time / INITIAL_TIME) * 100;

  useEffect(() => {
    if (time <= 0) {
      setDisp(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          setDisp(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const hints = [
    {
      id: 1,
      icon: <i className="mr-2.5 text-xl">🔢</i>,
      heading: "Mathematical clue:",
      explanation: sequenceData
        ? `Each letter maps to ${sequenceData.sequenceName.toLowerCase()} values...`
        : "Each number follows a mathematical sequence...",
    },
    {
      id: 2,
      icon: (
        <i className="fa-solid fa-arrow-down-a-z mr-2.5 text-xl text-amber-200"></i>
      ),
      heading: "Letter Mapping:",
      explanation: "A=1, B=2, C=3... but transformed by the sequence!",
    },
    {
      id: 3,
      icon: (
        <i className="fa-solid fa-bullseye mr-2.5 text-xl text-[rgb(252,83,61)]"></i>
      ),
      heading: "Pattern Recognition:",
      explanation: sequenceData?.sequencePreview
        ? `Look at the pattern: ${sequenceData.sequencePreview
            .slice(0, 5)
            .join(", ")}...`
        : "Look for the sum of consecutive terms...",
    },
  ];
  // console.log(sequenceData?.sequenceArray);

  const partialSequence = [
    { id: 1, value: 1 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 5 },
  ];

  const handleChat = () => {
    setChat(!chat);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      {disp && (
        <div className="relative z-10 w-[50%] h-[85%]">
          {chat ? (
            <div className="relative group right-0 cursor-pointer">
              <span
                onClick={handleChat}
                className="absolute z-90 top-[-0.8rem] right-1"
              >
                <i className="fa-solid fa-xmark text-3xl text-amber-400"></i>
              </span>
              <div
                className="absolute bottom-full mb-2 right-0 
                  w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 
                  transition-opacity pointer-events-none"
              >
                Close chat
              </div>
            </div>
          ) : (
            <div className="relative group right-0 cursor-pointer">
              <span
                onClick={handleChat}
                className="absolute z-90 top-[-0.8rem] right-1 animate-bounce"
              >
                <i className="fa-solid fa-lightbulb text-3xl text-amber-400"></i>
              </span>
              <div
                className="absolute bottom-full mb-2 right-0 
                w-max p-4 rounded bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 
                transition-opacity pointer-events-none"
              >
                Chat with Google's Gemini
              </div>
            </div>
          )}

          <div className="w-[100%] h-[100%] rounded-2xl flex flex-col text-white border border-[rgba(79,209,199,0.3)] p-4">
            <h1 className="font-[montserrat] text-xl font-semibold p-4 bg-clip-text text-transparent bg-[linear-gradient(315deg,#20bf55_0%,#01baef_74%)] text-center">
              Cryptic Hints
            </h1>

            <div className="relative p-4 flex h-[20%] flex-col justify-center text-center bg-[rgba(245,158,11,0.1)] border border-[#d18708] rounded-md">
              <h1 className="mb-4 font-bold font-[poppins] text-[#d18708]">
                {formatTime(time)}
              </h1>
              <div className="relative w-full h-1 mb-4">
                <div className="absolute inset-0 bg-[rgba(245,158,11,0.1)] border border-[#d18708] rounded-full"></div>

                <div
                  className="absolute left-0 top-0 h-full bg-[linear-gradient(90deg,#f59e0b,#ef4444)] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${Math.max(0, progressPercentage)}%` }}
                ></div>
              </div>

              <div className="text-md font-semibold text-[#d18708] rounded-lg mx-auto border border-amber-100 px-4 py-2">
                Speed Run Active
              </div>
            </div>

            {chat && <PatternBuilder onTextChange={setText} />}
            <ChatComponent text={text} />

            {!chat && (
              <div className="overflow-y-scroll no-scrollbar">
                <div className="mt-2">
                  {hints.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 mb-2 bg-[rgba(63,22,65,0.3)] rounded-xl border border-[rgb(193,65,200)] drop-shadow-xl shadow-2xs"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex justify-between items-center">
                          {item.icon}
                          <h1 className="font-semibold mb-0.5">
                            {item.heading}
                          </h1>
                        </div>
                        <div className="bg-[rgba(245,158,11,0.1)] px-4 py-2 rounded-lg text-[#d18708] text-sm border border-[#a36906]">
                          {idx % 2 === 0 ? <p>Free</p> : <p>-50 pts</p>}
                        </div>
                      </div>
                      <p className="block">{item.explanation}</p>
                      <div className="h-[0.2rem] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)] p-[0.1rem] mt-1 rounded-lg"></div>
                    </div>
                  ))}
                </div>
                <div className="bg-[rgba(10,15,28,0.9)] rounded-xl w-full border-2 h-[10rem] border-[rgba(79,209,199,0.3)]">
                  <h1 className="font-bold text-[#4fd1c7] p-4">
                    Current Sequence:
                  </h1>
                  <div className="grid grid-cols-6 px-4 overflow-y-auto overscroll-contain">
                    {sequenceData?.sequenceArray
                      ?.slice(0, 12)
                      ?.map((value, index) => (
                        <button
                          key={index}
                          className="bg-[#031a19] text-[#4fd1c7] border border-[#39978f] p-1 w-[2rem] mb-1.5 rounded-md gap-x-6"
                        >
                          {value}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RSideBar;
