import React, { useEffect, useState } from "react";
import Keys from "./Components/Keys";
import GameOver from "./GameOver";

const Board = ({ dataSet, handleData, heading, getSeq, getScore }) => {
  const TIME = 400;
  const [time, setTime] = useState(TIME);

  useEffect(() => {
    debugger;
    // CHECK HERE SHOULD BE >
    if (time < 300) {
      return;
    }
    const timerId = setTimeout(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [time]);

  const title = dataSet?.[0]?.[`title`];
  const author = dataSet?.[0]?.[`author`];
  // console.log(title);
  // console.log(author);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div
        className=" backdrop-blur-xl text-center bg-[rgba(22,33,62,0.9)]
    flex flex-col 
     rounded-xl w-[100%] 
     h-[85%] border-[rgba(79,209,199,0.3)]  border-2 px-4 py-8"
      >
        <div className="flex justify-start items-center">
          <div className=" ">
            <h1 className="mb-4 px-4 font-bold text-4xl font-[poppins] text-[#d18708]">
              {formatTime(time)}
            </h1>
          </div>
          <div className="mx-auto">
            <h1 className="text-[#4fd1c7] font-bold text-2xl text-center">
              Decode the Message
            </h1>
            <h3 className="text-xl  text-[#14a297] opacity-45 italic">
              {title} <span className="text-lg">by {author}</span>{" "}
            </h3>
          </div>
        </div>
        {time < 300 ? (
          <GameOver />
        ) : (
          <Keys
            dataSet={dataSet}
            handleData={handleData}
            heading={heading}
            getSeq={getSeq}
            getMark={getScore}
          />
        )}
      </div>
    </>
  );
};

export default Board;
