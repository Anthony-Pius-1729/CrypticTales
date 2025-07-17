import React from "react";

const Keys = ({ dataSet }) => {
  ///DEFINE PRORITY CONSTANTS
  debugger;
  const base = dataSet?.[`story_text`]?.replaceAll(" ", "");
  const textArray = base?.split("");
  const len = textArray?.length;
  const special_chars = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;

  ///STORE ALL SPECIAL CHARACTERS HERE
  let specialInStory = Array.from(
    new Set(
      textArray
        ?.slice(0, 37)
        .map((letter, index) =>
          special_chars.includes(letter) ? index : undefined
        )
        .filter((item) => item !== undefined)
    )
  );

  console.log("Special in Story: ", specialInStory);

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  /// RECURSIVE DEFINITION FOR THE LUCAS SEQUENCE
  const Lucas = (x) => {
    if (x == 0) return 2;
    if (x == 1) return 1;
    return Lucas(x - 1) + Lucas(x - 2);
  };
  let lucasArray = [];

  for (let i = 1; i <= 26; i++) {
    lucasArray.push(Lucas(i));
  }

  const Maps = {};

  for (let i = 0; i < 26; i++) {
    Maps[alphabet[i]] = lucasArray[i];
  }

  // console.log("Maps created: ", Maps);
  {
    /* 
      TRASH
    [  --> Create a random array of substrings of the string from A-to-Z( such that no letter repeats in any given array ???????? )
      --> Given the current letter check if its in a randomly selected substring array :
        ---> if it is: display the character
        ---> if it is not: display the numerical encode
      --> there should be at least 5 displayed letters for each run: a "run" is a [game state]]

    Create a new array
    Use TextArray randomly replace 20-25 positions with the encoded value
    

      */
  }
  return (
    <>
      <div>
        <div className="m-6 border-2 rounded-3xl border-[rgba(79,209,199,0.3)] bg-[rgba(10,18,33,0.9)] h-[60%]">
          <div className="grid grid-cols-7 grid-rows-9 gap-x-0.5 p-8 ">
            {textArray?.map((letter, idx) => {
              if (idx < len - 488) {
                const newChar = letter.toUpperCase();
                let checker = special_chars.includes(letter);
                if (checker) specialInStory.push(idx);
                return (
                  <button
                    className={`p-2 w-[4rem]
               bg-${checker ? "[rgba(245,158,11,0.1)]" : "[#FFC61]"}
                text-${checker ? `gray-50` : `[#4fd1c7]`}
                 border-[1px] border-[#39978f] rounded-xl m-2`}
                  >
                    {checker ? newChar : Maps[newChar]}
                  </button>
                );
              } else return <></>;
            })}
          </div>
        </div>
        <div className="flex justify-between mx-6 gap-x-4">
          <input
            type="text"
            placeholder="Enter decoded text..."
            className="p-6 drop-shadow-md drop-shadow-[#4fd1c7]  border-2 border-[#4fd1c7] outline-none w-full h-[2rem] rounded-md text-gray-400 bg-[rgba(19,35,63,0.9)]"
          />
          <button className="p-2 outline-none rounded-lg text-gray-50 border-[rgba(79,209,199,0.3)] font-semibold border-none w-[30%] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]">
            Decode
          </button>
        </div>
      </div>
    </>
  );
};

export default Keys;
