import React, { useState, useEffect } from "react";
import { supabase } from "../supabase-client";

const Header = ({ header, leaderboard, seq, CURR_AUTH_STATES, AUTH_STATE }) => {
  const [disp, setDisp] = useState(false);

  const handleClick = () => {
    setDisp(!disp);
    leaderboard(disp);
  };
  const sequencePatterns = {
    lucas: "L_n = L_{n-1} + L_{n-2} ",
    primes: "Sieve of Eratosthenes",
    triangular: "T_n = n * (n + 1) / 2",
    pentagonal: "P_n = n * (3 * n - 1) / 2",
    fibonacci: "F_n = F_{n-1} + F_{n-2} ",
    powers_of_2: "2^n (for n >= 0)",
    squares: "n^2 (for n >= 0)",
    cubes: "n^3 (for n >= 0)",
    tetrahedral: "Te_n = n * (n + 1) * (n + 2) / 6",
    hexagonal: "H_n = n * (2 * n - 1)",
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("User signed out");
  };
  const handleSignUp = () => {
    console.log("Sign up button is clicked");
    AUTH_STATE({ login: false, signup: true });

    console.log("Sign up button is clicked");
  };
  const handleLogin = () => {
    AUTH_STATE({ login: true, signup: false });

    console.log("Setting current auth state");
    console.log("login btn clicked");
  };

  return (
    <>
      <div className="flex justify-between sticky top-0.5 items-center bg-[rgba(15,15,35,0.8)] backdrop-blur-3xl h-full m-5 p-4 rounded-lg text-white border-[1px] border-[rgba(79,209,199,0.3)]">
        <h1
          className="text-transparent 
        bg-[linear-gradient(45deg,#4fd1c7,#7c3aed)]
         bg-clip-text font-bold font-[VT323]
           text-5xl animate-pulse"
        >
          Cryptic Tales
        </h1>
        <div className="flex justify-start gap-x-5 items-center">
          <p className="">Chapter 1: {header}</p>
          <div className="bg-purple-950 rounded-2xl p-2 flex justify-center transition-transform ease-in-out hover:border-2 hover:border-purple-50 hover:scale-105">
            <p className="text-sm px-2.5 text-purple-300 ">
              Pattern: {sequencePatterns[seq]}
            </p>
          </div>
        </div>
        <div className="h-full">
          <button
            onClick={handleClick}
            className="px-4 py-2 cursor-pointer border-2 hover:border-2 hover:border-purple-50 hover:scale-105 font-semibold h-full w-full bg-amber-900 text-white border-none rounded-lg "
          >
            LeaderBoard
          </button>
        </div>
        <div className="flex justify-between gap-x-7">
          <button
            onClick={handleLogin}
            className="px-4 py-2 cursor-pointer  bg-amber-400 hover:bg-amber-400/80 border-none rounded-lg font-semibold"
          >
            Login
          </button>
          {CURR_AUTH_STATES.loggedIn ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 cursor-pointer  bg-amber-600 hover:bg-amber-600/80 border-none rounded-lg font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="px-4 py-2 cursor-pointer  bg-amber-600 hover:bg-amber-600/80 border-none rounded-lg font-semibold"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
