import React, { useState } from "react";

const Keys = ({ dataSet }) => {
  ///STATES
  const [written, setWritten] = useState("");

  ///DEFINE PRORITY CONSTANTS
  // debugger;
  const base = dataSet?.[0]?.[`story_text`]?.replaceAll(" ", "");
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

  // console.log("Special in Story: ", specialInStory);

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

  ///Random Indices
  let randomIndex = [];
  for (let i = 0; i < 26; i++) {
    randomIndex[i] = Math.floor(Math.random() * 26);
  }
  let even = Math.random() < 0.7;

  let wordVerif = written.replaceAll(" ", "").toLocaleUpperCase();
  let wordVerifLen = wordVerif.length;

  const handleChange = (e) => {
    setWritten(e.currentTarget.value);
    // if (
    //   wordVerifLen > 0 &&
    //   textArray?.slice(0, 36)[wordVerifLen - 1].toLocaleUpperCase() ==
    //     wordVerif[wordVerifLen - 1]
    // ) {
    //   setCorrect(true);
    //   alert("correct letter");
    // } else {
    //   setCorrect(false);
    // }
  };

  debugger;
  ///SOMETHING SMARTER: AS YOU TAKE IN INPUT, FIND THE LENGTH AND USE THAT TO SLICE THE TEXTARRAY AND THEN ALWAYS CHECK THE LAST INDEX TO SEE IF IT MATCHES THE
  const handleClick = () => {
    if (
      written.toLocaleUpperCase().replaceAll(" ", "") ==
      base.slice(0, 36).toLocaleUpperCase()
    ) {
      // alert("Correct");
      return;
    }
  };

  return (
    <>
      <div>
        <div className="m-6 border-2 rounded-3xl border-[rgba(79,209,199,0.3)] bg-[rgba(10,18,33,0.9)] h-[25rem]">
          <div className="grid grid-cols-7 grid-rows-9 gap-x-0.5 p-8 ">
            {textArray?.map((letter, idx) => {
              if (idx < len - 488) {
                ///[rgba(245,158,11,0.1)]
                const newChar = letter.toUpperCase();
                let checker = special_chars.includes(letter);
                // let valid = written == letter;

                const writtenNoSpaces = written
                  .replaceAll(" ", "")
                  .toLocaleUpperCase();
                const isCorrectChar =
                  writtenNoSpaces.length > idx &&
                  writtenNoSpaces[idx] === letter.toLocaleUpperCase();

                let textDisplayed = isCorrectChar ? newChar : Maps[newChar];

                // console.log("TEXTDISPLAY: ", textDisplayed);

                if (checker) specialInStory.push(idx);
                return (
                  <button
                    id={idx}
                    style={{
                      backgroundColor: isCorrectChar
                        ? "#FFD586"
                        : "rgba(10,18,33,0.9)",
                      color: isCorrectChar ? "#1e293b" : "#4fd1c7",
                    }}
                    className="p-2 w-16 text-sm border bg-[gba(10,18,33,0.9)] border-[#39978f] font-semibold rounded-xl m-2"
                  >
                    {checker ? newChar : textDisplayed}
                  </button>
                );
              } else return <></>;
            })}
          </div>
        </div>
        <div className="flex justify-between mx-6 gap-x-4">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter decoded text..."
            className="p-6 drop-shadow-md drop-shadow-[#4fd1c7]  border-2 border-[#4fd1c7] outline-none w-full h-[2rem] rounded-md text-gray-400 bg-[rgba(19,35,63,0.9)]"
          />
          <button
            onClick={handleClick}
            className="p-2 outline-none rounded-lg text-gray-50 border-[rgba(79,209,199,0.3)] font-semibold border-none w-[30%] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]"
          >
            Decode
          </button>
        </div>

        {/* <div className="flex justify-between items-center mt-12 mx-0 p-4 border-[0.2px] rounded-3xl border-[rgba(79,209,199,0.3)] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)] w-full">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Score: 2,330</span>
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
        </div> */}
      </div>
    </>
  );
};

export default Keys;
