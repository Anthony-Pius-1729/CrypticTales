import React, { useState, useEffect } from "react";

const Keys = ({ dataSet, handleData, heading, getSeq }) => {
  ///STATES
  const [written, setWritten] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);

  ///DEFINE PRIORITY CONSTANTS
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

  // PRE-COMPUTED SEQUENCES (26 values each for A-Z)
  const sequences = {
    squares: [
      1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289,
      324, 361, 400, 441, 484, 529, 576, 625, 676,
    ],

    triangular: [
      1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171,
      190, 210, 231, 253, 276, 300, 325, 351,
    ],

    lucas: [
      1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199, 322, 521, 843, 1364, 2207, 3571,
      5778, 9349, 15127, 24476, 39603, 64079, 103682, 167761, 271443,
    ],

    pentagonal: [
      1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 210, 247, 287, 330, 376, 425,
      477, 532, 590, 651, 715, 782, 852, 925, 1001,
    ],

    primes: [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 101,
    ],

    powers_of_2: [
      2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
      65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608,
      16777216, 33554432, 67108864,
    ],

    cubes: [
      1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375,
      4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576,
    ],

    tetrahedral: [
      1, 4, 10, 20, 35, 56, 84, 120, 165, 220, 286, 364, 455, 560, 680, 816,
      969, 1140, 1330, 1540, 1771, 2024, 2300, 2600, 2925, 3276,
    ],

    fibonacci: [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
      4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393,
    ],

    hexagonal: [
      1, 6, 15, 28, 45, 66, 91, 120, 153, 190, 231, 276, 325, 378, 435, 496,
      561, 630, 703, 780, 861, 946, 1035, 1128, 1225, 1326,
    ],
  };

  // AUTO-SELECT SEQUENCE BASED ON LEVEL
  const levelSequences = {
    1: "squares",
    2: "triangular",
    3: "lucas",
    4: "pentagonal",
    5: "primes",
    6: "fibonacci",
    7: "hexagonal",
    8: "powers_of_2",
    9: "cubes",
    10: "tetrahedral",
  };

  // Get current sequence (cycle through if level > 10)
  const maxLevel = Object.keys(levelSequences).length;
  const sequenceKey = levelSequences[((currentLevel - 1) % maxLevel) + 1];

  const sequenceNames = {
    lucas: "Lucas Numbers",
    primes: "Prime Numbers",
    triangular: "Triangular Numbers",
    pentagonal: "Pentagonal Numbers",
    fibonacci: "Fibonacci Numbers",
    powers_of_2: "Powers of 2",
    squares: "Perfect Squares",
    cubes: "Perfect Cubes",
    tetrahedral: "Tetrahedral Numbers",
    hexagonal: "Hexagonal Numbers",
  };

  React.useEffect(() => {
    if (handleData) {
      // console.log("in keys");
      handleData({
        level: currentLevel,
        sequenceKey,
        sequenceName: sequenceNames[sequenceKey],
        sequenceArray,
        sequencePreview: sequenceArray.slice(0, 10),
      });
      heading(sequenceNames[sequenceKey]);
      getSeq(sequenceKey);
    }
  }, [currentLevel, sequenceKey, handleData]);

  const sequenceArray = sequences[sequenceKey];

  const Maps = {};
  for (let i = 0; i < 26; i++) {
    Maps[alphabet[i]] = sequenceArray[i];
  }

  let wordVerif = written.replaceAll(" ", "").toLocaleUpperCase();
  let wordVerifLen = wordVerif.length;

  const handleChange = (e) => {
    setWritten(e.currentTarget.value);
  };

  const handleSequenceChange = (e) => {
    setCurrentLevel(parseInt(e.target.value));
  };

  const handleClick = () => {
    if (
      written.toLocaleUpperCase().replaceAll(" ", "") ==
      base.slice(0, 36).toLocaleUpperCase()
    ) {
      setCurrentLevel((prev) => prev + 1);
      setWritten("");
      return;
    }
  };

  return (
    <>
      <div>
        <div className="mx-6 mb-4  my-8 flex justify-between items-center">
          <div className="text-[#4fd1c7] font-semibold">
            Level {currentLevel}
          </div>
          <div>
            <label className="text-[#4fd1c7] font-semibold mr-2">
              Practice Level:
            </label>
            <select
              value={currentLevel}
              onChange={handleSequenceChange}
              className="p-1 border border-[#4fd1c7] rounded bg-[rgba(19,35,63,0.9)] text-[#4fd1c7] text-sm outline-none"
            >
              {Object.entries(levelSequences).map(([level, seqKey]) => (
                <option
                  key={level}
                  value={level}
                  className="bg-[rgba(19,35,63,0.9)]"
                >
                  Level {level}: {sequenceNames[seqKey]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display current sequence preview */}
        <div className="mx-6 mb-4 p-4 border border-[#4fd1c7] rounded-lg bg-[rgba(10,18,33,0.5)]">
          <h3 className="text-[#4fd1c7] font-semibold mb-2">
            Current Sequence: {sequenceNames[sequenceKey]}
          </h3>
          <div className="text-[#4fd1c7] text-sm">
            {alphabet.slice(0, 4).map((letter, idx) => (
              <span key={letter} className="mr-4">
                {letter}={sequenceArray[idx]}
              </span>
            ))}
            <span className="text-gray-400">...</span>
          </div>
        </div>

        <div className="m-6 border-2 rounded-3xl border-[rgba(79,209,199,0.3)] bg-[rgba(10,18,33,0.9)] h-[25rem]">
          <div className="grid grid-cols-7 grid-rows-9 gap-x-0.5 p-8 ">
            {textArray?.map((letter, idx) => {
              if (idx < len - 488) {
                const newChar = letter.toUpperCase();
                let checker = special_chars.includes(letter);

                const writtenNoSpaces = written
                  .replaceAll(" ", "")
                  .toLocaleUpperCase();
                const isCorrectChar =
                  writtenNoSpaces.length > idx &&
                  writtenNoSpaces[idx] === letter.toLocaleUpperCase();
                let textDisplayed = isCorrectChar ? newChar : Maps[newChar];
                if (checker) specialInStory.push(idx);
                return (
                  <button
                    key={idx}
                    id={idx}
                    style={{
                      backgroundColor: isCorrectChar
                        ? "#FFD586"
                        : "rgba(10,18,33,0.9)",
                      color: isCorrectChar ? "#1e293b" : "#4fd1c7",
                    }}
                    className="p-2 w-16 text-sm border border-[#39978f] font-semibold rounded-xl m-2"
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
            className="p-6 drop-shadow-md drop-shadow-[#4fd1c7] border-2 border-[#4fd1c7] outline-none w-full h-[2rem] rounded-md text-gray-400 bg-[rgba(19,35,63,0.9)]"
          />
          <button
            onClick={handleClick}
            className="p-2 outline-none rounded-lg text-gray-50 border-[rgba(79,209,199,0.3)] font-semibold border-none w-[30%] bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]"
          >
            Decode
          </button>
        </div>
      </div>
    </>
  );
};

export default Keys;
