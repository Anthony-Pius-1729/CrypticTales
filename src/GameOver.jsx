import React from "react";

const GameOver = ({
  correctText = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
  letterMapping = { A: "1234", B: "9023", C: "56", D: "78", E: "90", F: "89" },
  score = 1000,
  timeElapsed = "5:32",
  accuracy = 85,
  wordsPerMinute = 0,
  ç,
}) => {
  return (
    <>
      <div className="mx-auto mb-4 my-8 w-full border-amber-200 border-2 flex flex-col items-center justify-center p-6">
        <h1 className="bg-red-700 text-white px-4 py-2 text-3xl font-semibold mb-6">
          GAME OVER
        </h1>
        {/* Correct text and Mapping*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Correct Text</h2>
            <p className="text-sm font-mono bg-white p-3 border rounded">
              {correctText}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Letter Mapping</h2>
            <div className="text-sm font-mono bg-white p-3 border rounded max-h-32  w-full overflow-auto">
              {Object.entries(letterMapping).map(([original, mapped]) => (
                <div
                  key={original}
                  className="flex justify-between border-b py-1"
                >
                  <span>{original}</span>
                  <span>→</span>
                  <span className="font-bold">{mapped}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-blue-50 p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Game Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-blue-600">
                {score.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-green-600">
                {timeElapsed}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-purple-600">
                {accuracy}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-orange-600">
                {wordsPerMinute}
              </div>
              <div className="text-sm text-gray-600">WPM</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors">
            Play Again
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-semibold transition-colors">
            Main Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default GameOver;
