import React from "react";

const Players = () => {
  const Entities = [
    {
      name: "Aliggy",
      score: 200,
    },
    {
      name: "Lion",
      score: 200,
    },
    {
      name: "Graspy",
      score: 200,
    },
    {
      name: "Anandy",
      score: 200,
    },
  ];
  return (
    <>
      <div className="flex flex-start items-center px-12 my-4 h-[1rem]">
        <h1 className="text-[#4fd1c7] font-semibold text-2xl">Players :</h1>
        <div className="p-4 flex justify-start gap-x-12">
          {Entities.map((item, idx) => {
            return (
              <>
                <div className="flex flex-col">
                  <div className="w-[2rem] h-[2rem] rounded-full bg-amber-400 border-4 border-[#4fd1c7] animate-pulse"></div>
                  <span className="text-white ">{item.name}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Players;
