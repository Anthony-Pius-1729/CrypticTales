import React, { useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const ChatComponent = () => {
  useEffect(() => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    console.log("GEMINI_API_KEY (from import.meta.env):", GEMINI_API_KEY);

    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not set in environment variables.");
      console.error(
        "Please make sure VITE_GEMINI_API_KEY is in your .env file and your vite.config.js is set up correctly."
      );
      return;
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    async function generateContent() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: "Explain how AI works in a few words",
        });

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
  }, []);

  return (
    <div className="text-white">ChatComponent - Checking Gemini API...</div>
  );
};

export default ChatComponent;
