import React from "react";

const LeaderBoard = ({ data }) => {
  console.log("Data in Leaderbord", data);
  const players = [
    { id: 1, name: "DragonSlayer_99", score: 245780 },
    { id: 2, name: "ShadowMaster", score: 238540 },
    { id: 3, name: "PhoenixRising", score: 235190 },
    { id: 4, name: "CyberNinja", score: 228400 },
    { id: 5, name: "StarCommander", score: 224850 },
    { id: 6, name: "IceQueen_42", score: 218700 },
    { id: 7, name: "ThunderBolt", score: 212340 },
    { id: 8, name: "MysticWarrior", score: 205800 },
    { id: 9, name: "NeonBlade", score: 198450 },
    { id: 10, name: "CosmicRider", score: 191200 },
  ];

  return (
    <div className="w-full mx-auto  p-6 bg-[rgba(47,122,115,0.8)] rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-[rgb(43,245,211)]">
        🏆 Leaderboard
      </h1>

      <div className="bg-[rgba(10,18,33,0.9)] rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex justify-between items-center font-semibold text-gray-700">
            <span>Rank</span>
            <span>Player</span>
            <span>Score</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 ">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="px-6 py-4 cursor-pointer text-[rgb(43,245,211)] hover:bg-gray-800 hover:scale-z-110 transition-colors "
            >
              <div className="flex justify-between items-center ">
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                        ? "bg-gray-100 text-gray-800"
                        : index === 2
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className="font-medium  text-gray-100">{player.name}</div>

                <div className="font-semibold text-gray-100 ">
                  {player.score.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
