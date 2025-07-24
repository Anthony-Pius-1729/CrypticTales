import React, { useState, useEffect } from "react";
import Board from "./Board";
import RSideBar from "./Components/RSideBar";
import LSideBar from "./Components/LSideBar";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import dbData from "./data.json";
import { supabase } from "./supabase-client";

const App = () => {
  const [data, setData] = useState([]);
  const [displayR, setDisplayR] = useState(false);
  const [seqData, setSeqData] = useState(null);
  const [head, setHead] = useState("");
  const [seq, setSeq] = useState("");
  const [mark, setMark] = useState(0);
  const [authDisplayState, setAuthDisplayState] = useState({
    login: false,
    signup: false,
    loggedIn: false,
    user: null,
  });

  const handleAuthDisplayState = (newState) => {
    setAuthDisplayState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Supabase Auth Event:", event, session);
      if (event === "SIGNED_IN") {
        setAuthDisplayState({
          login: false,
          signup: false,
          loggedIn: true,
          user: session.user,
        });
      } else if (event === "SIGNED_OUT") {
        setAuthDisplayState({
          login: false,
          signup: false,
          loggedIn: false,
          user: null,
        });
      } else if (event === "INITIAL_SESSION" && session) {
        setAuthDisplayState((prevState) => ({
          ...prevState,
          loggedIn: true,
          user: session.user,
        }));
      } else if (event === "INITIAL_SESSION" && !session) {
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthDisplayState((prevState) => ({
          ...prevState,
          loggedIn: true,
          user: session.user,
        }));
      }
    });
  }, []);

  const handleDatas = (x) => {
    setSeqData(x);
  };

  const handleHead = (x) => {
    setHead(x);
  };
  const handleMark = (x) => {
    setMark(x);
  };

  const handleShow = () => {
    setDisplayR(false);
  };

  const handleClick = () => {
    setDisplayR(!displayR);
  };

  useEffect(() => {
    const result = dbData;
    const stories = result.data.stories;
    setData(stories);
  }, []);

  const finalData = data.map((e) => e);

  return (
    <>
      <div className="relative overflow-x-hidden scroll-smooth justify-center font-[raleway] bg-[linear-gradient(135deg,#0f0f23_0%,#1a1a2e_50%,#16213e_100%)] px-4 w-full h-full flex flex-col">
        <Header
          header={head}
          seq={seq}
          CURR_AUTH_STATES={authDisplayState}
          AUTH_STATE={handleAuthDisplayState}
          currentAuthStatus={authDisplayState.loggedIn}
          userEmail={authDisplayState.user?.email}
        />
        <div className="w-full h-[100vh] px-6 pt-6 gap-x-4 flex justify-center">
          <LSideBar />
          {authDisplayState.login && !authDisplayState.loggedIn ? (
            <Login AUTH_STATE={handleAuthDisplayState} />
          ) : authDisplayState.signup && !authDisplayState.loggedIn ? (
            <Signup AUTH_STATE={handleAuthDisplayState} />
          ) : (
            <Board
              AUTH_STATES={authDisplayState}
              dataSet={finalData}
              handleData={handleDatas}
              heading={handleHead}
              getSeq={setSeq}
              getScore={handleMark}
            />
          )}
          {displayR && <RSideBar ondisp={handleShow} sequenceData={seqData} />}
        </div>
        <div className="fixed bottom-4 backdrop-blur-xs left-0 right-0 px-4 flex justify-center z-50">
          <div className="flex justify-between items-center gap-8 p-6 max-w-screen-xl w-full border border-[rgba(79,209,199,0.3)] rounded-3xl bg-gradient-to-br from-[#4fd1c7] to-[#7c3aed]">
            <div className="flex items-center gap-2 text-white font-semibold whitespace-nowrap">
              <span>
                Score:{" "}
                {authDisplayState.loggedIn ? mark : `Log In to View Score`}
              </span>
              <span>|</span>
              <span>❤️❤️❤️❤️❤️</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                className="px-4 py-2 hover:border-1 backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors"
              >
                <i className="fa-solid text-xl mr-0.5">🤔</i> Hint
              </button>
              <button className="px-4 py-2 hover:border-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                <i className="fa-solid fa-repeat mr-0.5"></i> Reset
              </button>
              <button className="px-4 py-2 hover:border-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors">
                <i className="fa-solid fa-forward mr-0.5"></i> Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
