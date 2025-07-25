import React, { useState, useEffect } from "react";
import { supabase } from "../supabase-client";

const LeaderBoard = ({ data }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllScores = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: usersData, error: fetchError } = await supabase
        .from("users")
        .select("id, email, score, created_at")
        .order("score", { ascending: false });

      if (fetchError) {
        console.error("Error fetching leaderboard data:", fetchError);
        setError("Failed to load leaderboard data");
        return;
      }

      if (usersData && usersData.length > 0) {
        const processedPlayers = usersData.map((user, index) => ({
          id: user.id,
          name: user.email.split("@")[0] || `Player_${user.id}`,
          email: user.email,
          score: user.score || 0,
          rank: index + 1,
        }));

        setPlayers(processedPlayers);
      } else {
        setPlayers([]);
      }
    } catch (err) {
      console.error("Unexpected error fetching leaderboard:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllScores();
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllScores();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto p-6 bg-[rgba(47,122,115,0.8)] rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-[rgb(43,245,211)]">
          🏆 Leaderboard
        </h1>
        <div className="bg-[rgba(10,18,33,0.9)] rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center items-center py-8">
            <div className="text-[rgb(43,245,211)] text-lg">
              Loading leaderboard...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto p-6 bg-[rgba(47,122,115,0.8)] rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-[rgb(43,245,211)]">
          🏆 Leaderboard
        </h1>
        <div className="bg-[rgba(10,18,33,0.9)] rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center items-center py-8">
            <div className="text-red-400 text-lg">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-[rgba(47,122,115,0.8)] rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center text-[rgb(43,245,211)]">
          🏆 Leaderboard
        </h1>
        <button
          onClick={fetchAllScores}
          className="px-4 py-2 bg-[rgba(79,209,199,0.3)] hover:bg-[rgba(79,209,199,0.5)] text-[rgb(43,245,211)] rounded-lg font-semibold transition-colors"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="bg-[rgba(10,18,33,0.9)] rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex justify-between items-center font-semibold text-gray-700">
            <span>Rank</span>
            <span>Player</span>
            <span>Score</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {players.length === 0 ? (
            <div className="px-6 py-8 text-center text-[rgb(43,245,211)]">
              No players found. Be the first to play!
            </div>
          ) : (
            players.map((player, index) => (
              <div
                key={player.id}
                className="px-6 py-4 cursor-pointer text-[rgb(43,245,211)] hover:bg-gray-800 hover:scale-z-110 transition-colors"
              >
                <div className="flex justify-between items-center">
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
                  <div className="font-medium text-gray-100 flex-1 text-center">
                    {player.name}
                  </div>
                  <div className="font-semibold text-gray-100">
                    {player.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {players.length > 0 && (
        <div className="mt-4 text-center text-sm text-[rgb(43,245,211)] opacity-70">
          Showing top {players.length} players • Auto-refreshes every 30 seconds
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
