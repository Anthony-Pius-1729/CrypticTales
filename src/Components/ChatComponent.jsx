import React, { useEffect, useState } from "react";
// import Markdown from "react-markdown";
import Speech from "react-text-to-speech";
import { useSpeech } from "react-text-to-speech";
import { GoogleGenAI } from "@google/genai";

const ChatComponent = ({ text }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [highlightText, setHighlightText] = useState(true);
  debugger;
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: aiResponse,
    highlightText,
    showOnlyHighlightedText: false,
    highlightMode: "word",
    highlightProps: {
      style: {
        color: "white",
        backgroundColor: "#799EFF",
        padding: "0.3rem",
        border: "none",
        borderRadius: "0.2rem",
      },
    },
  });

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
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents:
            text +
            ". Mark down up your response and Limit explanatory and other  responses to 40 words MAX ",
        });

        setAiResponse(response.text);
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
          <button onClick={() => setHighlightText(!highlightText)}>
            {highlightText ? (
              <i class="fa-solid fa-eye"></i>
            ) : (
              <i class="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
