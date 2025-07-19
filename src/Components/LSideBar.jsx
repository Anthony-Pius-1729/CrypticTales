import React, { useState, useEffect } from "react";

const LivingChronicleSidebar = () => {
  const [chronicleEntries, setChronicleEntries] = useState([]);
  const [currentWriting, setCurrentWriting] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [sideView, setSideView] = useState(true);

  const possibleEntries = [
    "Beneath the moon's watchful eye, the seeker treads the forgotten path...",
    "Arcane sigils flicker and writhe in the shadowed chamber's gloom...",
    "Whispers of Al-Khwarizmi echo through corridors lost to time...",
    "Veils of illusion descend, spun by Ibn-Sina's cunning hand...",
    "Hypatia's enigmatic glyphs murmur riddles only the brave dare heed...",
    "A triad of secrets weaves itself into the fabric of fate...",
    "Where the language of numbers melds with eldritch lore...",
    "The cipher's heart pulses, revealing truths to those who endure the trial...",
    "Fractured reflections shimmer, teasing glimpses of forbidden knowledge...",
  ];

  const writeEntry = (text) => {
    setIsWriting(true);
    let index = 0;
    const writeInterval = setInterval(() => {
      setCurrentWriting(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(writeInterval);
        setTimeout(() => {
          setChronicleEntries((prev) => [...prev, text]);
          setCurrentWriting("");
          setIsWriting(false);
        }, 1000);
      }
    }, 50);
  };

  useEffect(() => {
    if (chronicleEntries.length < possibleEntries.length) {
      const timer = setTimeout(() => {
        const nextEntry = possibleEntries[chronicleEntries.length];
        writeEntry(nextEntry);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [chronicleEntries.length, possibleEntries.length]);

  const handleSide = () => {
    setSideView(!sideView);
  };

  return (
    <div className="relative">
      <span
        onClick={handleSide}
        className="absolute top-[45%] left-0 z-50 cursor-pointer"
      >
        {sideView ? (
          <i className="fa-solid fa-circle-left text-3xl text-amber-300 hover:text-amber-200 transition-colors"></i>
        ) : (
          <i className="fa-solid fa-circle-right text-3xl text-amber-300 hover:text-amber-200 transition-colors"></i>
        )}
      </span>

      {sideView && (
        <div className=" w-[25rem] h-[85%] z-10 rounded-2xl bg-[rgba(26,26,46,0.9)] backdrop-blur-sm flex flex-col text-white border p-4 border-[rgba(79,209,199,0.3)] relative ml-6">
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>

          <div
            className="absolute bottom-8 left-6 w-4 h-4 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-sm animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <h1 className="text-xl text-center font-semibold p-4 bg-clip-text text-transparent bg-[linear-gradient(315deg,#20bf55_0%,#01baef_74%)]">
            The Living Chronicle
          </h1>

          <div className="flex justify-center mb-4 space-x-2">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
            <div className="text-amber-400/80 text-sm">⚬</div>
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-orange-800/10 rounded-lg border border-amber-700/30 shadow-inner"></div>

            <div className="relative z-10 p-4 h-full overflow-y-auto">
              {chronicleEntries.map((entry, index) => (
                <div key={index} className="mb-4 animate-fade-in">
                  <p className="text-amber-100/90 font-serif text-sm leading-relaxed">
                    {entry}
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mt-2"></div>
                </div>
              ))}

              {isWriting && (
                <div className="mb-4">
                  <p className="text-amber-100/90 font-serif text-sm leading-relaxed">
                    {currentWriting}
                    <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse"></span>
                  </p>
                </div>
              )}

              {isWriting && (
                <div className="absolute bottom-4 right-4">
                  <div className="text-amber-400/70 text-2xl animate-bounce">
                    🖋️
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center text-xs text-amber-400/60 italic mt-2">
            "Time records all seekers of truth..."
          </div>
        </div>
      )}
    </div>
  );
};

export default LivingChronicleSidebar;
