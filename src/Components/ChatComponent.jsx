import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Speech from "react-text-to-speech";
import { useSpeech } from "react-text-to-speech";
import { GoogleGenAI } from "@google/genai";

const ChatComponent = ({ text }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [speak, setSpeek] = useState(false);
  debugger;
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Indicates whether the speech is currently playing or waiting in the queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: aiResponse });
  debugger;
  const handleAI = () => {
    setSpeek(true);
  };
  // console.log("TEXT IN CHATCOOMP", text);
  useEffect(() => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not set in environment variables.");
      console.error(
        "Please make sure VITE_GEMINI_API_KEY is in your .env file and your vite.config.js is set up correctly."
      );
      return;
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    async function generateContent() {
      if (!text) return;
      console.log("GEMINI API STARTED");
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents:
            text +
            ". Mark down your response and Limit explanatory and other  responses to 40 words ",
        });

        setAiResponse(response.text);
        console.log("GEMINI API FINISHED");

        console.log("Gemini API Response:", response.text);
      } catch (error) {
        console.error("Error calling Gemini API:", error);

        if (error.response && error.response.status) {
          console.error("HTTP Status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      }
    }

    generateContent();
  }, [text]);
  //
  debugger;
  return (
    <div className="text-white">
      {/* <Markdown> {aiResponse}</Markdown> */}
      {text && <Text />}

      {text && (
        <div className="space-x-4 mt-4">
          {speechStatus !== "started" ? (
            <button
              className="px-4 py-2 rounded-lg text-black bg-blue-200 hover:bg-blue-200/70"
              onClick={start}
            >
              Start
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg text-black bg-blue-200 hover:bg-blue-200/70"
              onClick={pause}
            >
              Pause
            </button>
          )}
          <button
            className="px-4 py-2 rounded-lg text-black bg-red-300 hover:bg-red-300/70"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
