import React, { useState } from "react";

function WordCounter() {
  const [text, setText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Computational engine to parse text and return extensive document metrics
  const getMetrics = () => {
    const cleanText = text.trim();

    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, "").length;

    // Split by white spaces to get words list accurately
    const wordsArray = cleanText === "" ? [] : cleanText.split(/\s+/);
    const wordCount = wordsArray.length;

    const lineCount = text === "" ? 0 : text.split("\n").length;

    // Split by double line breaks to isolate continuous paragraphs structures
    const paragraphCount = cleanText === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== "").length;

    // Estimation: Standard average human reads ~200 words per minute
    const readingTimeSeconds = Math.ceil((wordCount / 200) * 60);
    // Estimation: Standard average human speaks ~130 words per minute
    const speakingTimeSeconds = Math.ceil((wordCount / 130) * 60);

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      wordCount,
      lineCount,
      paragraphCount,
      readingTime: formatTime(readingTimeSeconds),
      speakingTime: formatTime(speakingTimeSeconds),
      topKeywords: getTopKeywords(wordsArray)
    };
  };

  // Helper function to format raw seconds integers neatly into min/sec strings
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds} sec`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs === 0 ? `${mins} min` : `${mins} m ${secs} s`;
  };

  // Algorithmic parser to analyze word arrays and filter high frequency keywords density mapping
  const getTopKeywords = (wordsArray) => {
    if (wordsArray.length === 0) return [];

    // Filter out common english structural stop-words to reveal actual contextual keywords
    const stopWords = new Set(["the", "a", "an", "and", "or", "but", "is", "are", "am", "was", "were", "to", "in", "of", "for", "on", "with", "as", "at", "by", "it", "this", "that", "i", "you", "he", "she", "they", "we", "my", "your"]);
    const frequencyMap = {};

    wordsArray.forEach((w) => {
      const cleanWord = w.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""); // Purge trailing punctuation marks
      if (cleanWord && !stopWords.has(cleanWord) && cleanWord.length > 1) {
        frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
      }
    });

    // Sort key-value density structures based on absolute occurrence counts
    return Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Limit response mapping to the top 5 densest keywords entries
  };

  const {
    charsWithSpaces,
    charsWithoutSpaces,
    wordCount,
    lineCount,
    paragraphCount,
    readingTime,
    speakingTime,
    topKeywords
  } = getMetrics();

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const clearAll = () => {
    setText("");
    setCopySuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Component Workspace Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Layout Header Modules */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📊 CSC Document Analysis
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Word Counter & Text Analyzer
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Evaluate real-time text density matrices, isolate exact character dimensions, and calculate reading speed velocities instantly.
            </p>
          </div>

          {/* Core Functional Workspace Layout Grid Splitter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT SECTION: Main Text Area Console Input Panel (7 Columns) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  📥 Paste Document Content Below
                </label>
                {text && (
                  <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline transition">
                    Clear Workspace
                  </button>
                )}
              </div>

              <textarea
                rows="11"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text logs here to activate structural metrics parameters..."
                className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl text-slate-700 font-semibold focus:outline-none focus:border-[#0B4AA2] focus:bg-white text-base shadow-inner transition"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  className={`flex-1 font-bold px-5 py-3.5 rounded-xl shadow-lg transition text-sm text-white flex items-center justify-center gap-2
                    ${!text ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : copySuccess ? "bg-green-600 hover:bg-green-700 shadow-green-900/10" : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"}
                  `}
                >
                  {copySuccess ? "📋 Content Copied!" : "📄 Copy Active Content"}
                </button>
              </div>
            </div>

            {/* RIGHT SECTION: Multi-Dimensional Metrics Dashboard Panel (5 Columns) */}
            <div className="lg:col-span-5 space-y-5">

              {/* Primary Density Highlight Score Grid Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0B4AA2] text-white p-4 rounded-2xl text-center shadow-md">
                  <span className="text-[10px] font-bold text-blue-100 uppercase block tracking-wider">Total Words</span>
                  <span className="text-3xl font-black block mt-1">{wordCount}</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm border-b-4 border-b-green-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Characters</span>
                  <span className="text-3xl font-black text-green-600 block mt-1">{charsWithSpaces}</span>
                </div>
              </div>

              {/* Auxiliary Structural Text Metric Lists Block */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-2">Detailed Matrix</span>

                <div className="bg-white px-4 py-2.5 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-bold text-slate-600">
                  <span className="text-slate-400 font-medium">Chars (No Spaces)</span>
                  <span>{charsWithoutSpaces}</span>
                </div>
                <div className="bg-white px-4 py-2.5 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-bold text-slate-600">
                  <span className="text-slate-400 font-medium">Total Paragraphs</span>
                  <span>{paragraphCount}</span>
                </div>
                <div className="bg-white px-4 py-2.5 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-bold text-slate-600">
                  <span className="text-slate-400 font-medium">Total Document Lines</span>
                  <span>{lineCount}</span>
                </div>
              </div>

              {/* Human Performance Speech Speeds Velocity Box */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="bg-white p-3 border border-slate-200 rounded-xl text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">⏱️ Reading Time</span>
                  <span className="text-sm font-black text-slate-700 block mt-0.5">{readingTime}</span>
                </div>
                <div className="bg-white p-3 border border-slate-200 rounded-xl text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">📢 Speaking Time</span>
                  <span className="text-sm font-black text-slate-700 block mt-0.5">{speakingTime}</span>
                </div>
              </div>

              {/* Dynamic Top Keywords Density Occurrence Mapping Module */}
              {topKeywords.length > 0 && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 animate-fadeIn">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-1">🔑 Keyword Density (टॉप शब्द)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {topKeywords.map(([word, freq]) => (
                      <span key={word} className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-600 shadow-sm flex items-center gap-1.5">
                        <code className="text-slate-800 font-mono font-bold">{word}</code>
                        <span className="bg-blue-50 text-[#0B4AA2] text-[10px] px-1.5 py-0.5 rounded-md font-black">{freq}x</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Secure client runtime computing regulatory block warning banner info tags */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> String structural evaluation routines parse documents entirely inside sandboxed client browser script arrays. Data packets are completely isolated, ensuring zero data retention records or networking logs.
          </div>

        </div>
      </div>
    </div>
  );
}

export default WordCounter;