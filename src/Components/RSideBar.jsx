import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const RSideBar = ({ ondisp }) => {
  const TIME_CONST = 1.67;
  /// 1.67
  const [time, setTime] = useState(59);
  const [updateWidth, setUpdateWidth] = useState(100);
  const [disp, setDisp] = useState(true);

  useEffect(() => {
    if (time <= 0) {
      setDisp(false);
      setUpdateWidth(0);
      return;
    }
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setUpdateWidth((width) => width - TIME_CONST);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);
  console.log(time);
  const hints = [
    {
      id: 1,
      icon: <i class=" mr-2.5 text-xl ">🔢</i>,
      heading: "Mathematical clue:",
      explanation: "Each number follows the golden ratio sequence...",
    },
    {
      id: 2,
      icon: (
        <i class="fa-solid fa-arrow-down-a-z mr-2.5 text-xl text-amber-200"></i>
      ),
      heading: "Letter Mapping:",
      explanation: "A=1, B=2, C=3... but transformed by the sequence!",
    },
    {
      id: 3,
      icon: (
        <i class="fa-solid fa-bullseye mr-2.5 text-xl text-[rgb(252,83,61)]"></i>
      ),
      heading: "Pattern Recognition:",
      explanation: "Look for the sum of consecutive terms...",
    },
  ];
  const partialSequence = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 1,
    },
    {
      id: 3,
      value: 2,
    },
    {
      id: 4,
      value: 3,
    },
    {
      id: 5,
      value: 5,
    },
  ];
  const dynamicWidth = `${updateWidth}%`;
  return (
    <>
      {disp && (
        <div className="w-[50%] h-[85%] rounded-2xl  flex flex-col text-white border-1 p-4 border-[rgba(79,209,199,0.3)]">
          <h1 className="font-[montserrat] text-xl font-semibold p-4 bg-clip-text text-transparent bg-[linear-gradient(315deg,#20bf55_0%,#01baef_74%)] text-center">
            Cryptic Hints
          </h1>
          <div className="relative z-0 p-4 flex h-[20%] flex-col justify-center text-center  bg-[rgba(245,158,11,0.1)] border-1 border-[#d18708] rounded-md ">
            <h1 className="mb-4 font-bold font-[poppins] text-[#d18708]">
              {"00" + ":" + time}
            </h1>
            <div
              style={{
                width: dynamicWidth,
                height: "0.25rem",
                zIndex: "90",
                backgroundColor: "linear-gradient(90deg,#f59e0b,#ef4444)",
              }}
              className="relative  bg-[linear-gradient(90deg,#f59e0b,#ef4444)] rounded-xs z-50 "
            ></div>

            <div className=" absolute rounded-xs z-0 bottom-[2.65rem] mb-4 border-1 border-[#d18708] h-[0.25rem] bg-[rgba(245,158,11,0.1)] w-[90%]"></div>
            <div className="text-md font-semibold text-[#d18708] rounded-lg  mx-auto border-amber-100 border-1 px-4 py-2 ">
              Speed Run Active
            </div>
          </div>
          <div className="overflow-y-scroll no-scrollbar">
            <div className="mt-2 ">
              {hints.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-4 mb-2 bg-[rgba(63,22,65,0.3)] rounded-xl border-[1px] border-[rgba(226,82,234,0.3)]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex justify-between">
                        {item.icon}
                        <h1 className="font-semibold mb-0.5">{item.heading}</h1>
                      </div>
                      <div className="bg-[rgba(245,158,11,0.1)] px-4 py-2 rounded-lg text-[#d18708] text-sm border-1 border-[#a36906]">
                        <p>Free</p>
                      </div>
                    </div>
                    <p className="block">{item.explanation}</p>
                    <div className="h-[0.2rem] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)] p-[0.1rem] mt-1 rounded-lg"></div>
                  </div>
                );
              })}
            </div>
            <div className="bg-[rgba(10,15,28,0.9)] rounded-xl w-full border-2 h-full border-[rgba(79,209,199,0.3)] ">
              <h1 className="font-bold text-[#4fd1c7] p-4">
                Current Sequence:
              </h1>
              <div className="grid grid-cols-6 px-4 overflow-y-auto overscroll-contain">
                {partialSequence.map((btn) => {
                  return (
                    <button className="bg-[#031a19] text-[#4fd1c7]  border-[1px] border-[#39978f] p-1 w-[2rem] mb-1.5 rounded-md gap-x-6">
                      {btn.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RSideBar;
