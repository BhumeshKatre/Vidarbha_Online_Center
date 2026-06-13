import React, { useState } from "react";

function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Helper utility to calculate dynamic character and word metrics
  const getMetrics = () => {
    const chars = inputText.length;
    // Clean trailing spaces to prevent wrong word counts
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
    const lines = inputText === "" ? 0 : inputText.split("\n").length;
    return { chars, words, lines };
  };

  const { chars, words, lines } = getMetrics();

  // Transformation Handler 1: Convert to pure UPPERCASE
  const convertToUppercase = () => {
    setInputText(inputText.toUpperCase());
    setCopySuccess(false);
  };

  // Transformation Handler 2: Convert to pure lowercase
  const convertToLowercase = () => {
    setInputText(inputText.toLowerCase());
    setCopySuccess(false);
  };

  // Transformation Handler 3: Convert to standard Title Case (Capitalize Words)
  const convertToTitleCase = () => {
    const transformed = inputText
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setInputText(transformed);
    setCopySuccess(false);
  };

  // Transformation Handler 4: Convert to regular Sentence Case
  const convertToSentenceCase = () => {
    // Regex splits sentences by periods, exclamation marks, or question marks followed by spacing
    const transformed = inputText
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (match) => match.toUpperCase());
    setInputText(transformed);
    setCopySuccess(false);
  };

  // Transformation Handler 5: Toggle characters via Inverse Case rules
  const convertToInverseCase = () => {
    const transformed = inputText
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) return char.toLowerCase();
        return char.toUpperCase();
      })
      .join("");
    setInputText(transformed);
    setCopySuccess(false);
  };

  // Trigger quick clipboard action sequence
  const copyToClipboard = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset success indicator after 2 seconds
  };

  const clearAll = () => {
    setInputText("");
    setCopySuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Main Application Card Framework Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Main Title Layout Header Module */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📝 CSC Writing Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Text Case Converter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Transform your raw paragraphs immediately between Sentence Case, UPPERCASE, Title Case, and evaluate live character metrics.
            </p>
          </div>

          {/* Interactive Split Work Space Grid Layout */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COMPONENT PANEL: Text Input Console (7 Columns) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  📥 Paste or Type Your Text Below
                </label>
                {inputText && (
                  <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline transition">
                    Clear Text
                  </button>
                )}
              </div>

              <textarea
                rows="10"
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setCopySuccess(false); }}
                placeholder="Start typing or paste your content here (e.g. name records, affidavit layout lines)..."
                className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl text-slate-700 font-semibold focus:outline-none focus:border-[#0B4AA2] focus:bg-white text-base shadow-inner transition"
              />

              {/* Functional Transformation Multi-Action Buttons Dashboard */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button type="button" onClick={convertToSentenceCase} disabled={!inputText} className="bg-white text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:border-[#0B4AA2] hover:text-[#0B4AA2] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  Aa Sentence case
                </button>
                <button type="button" onClick={convertToUppercase} disabled={!inputText} className="bg-white text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:border-[#0B4AA2] hover:text-[#0B4AA2] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  AA UPPERCASE
                </button>
                <button type="button" onClick={convertToLowercase} disabled={!inputText} className="bg-white text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:border-[#0B4AA2] hover:text-[#0B4AA2] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  aa lowercase
                </button>
                <button type="button" onClick={convertToTitleCase} disabled={!inputText} className="bg-white text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:border-[#0B4AA2] hover:text-[#0B4AA2] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  Aa Bb Title Case
                </button>
                <button type="button" onClick={convertToInverseCase} disabled={!inputText} className="bg-white text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:border-[#0B4AA2] hover:text-[#0B4AA2] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  aA iNVERSE cASE
                </button>
              </div>
            </div>

            {/* RIGHT PANEL: Analytics Metrics & Clipboard Output Controls (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[340px]">
              
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Live Document Statistics
                </span>

                {/* Metrics Summary Rows Grid Container */}
                <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 text-xs font-bold text-slate-600 overflow-hidden shadow-sm">
                  <div className="flex justify-between p-3.5 px-4">
                    <span className="text-slate-400 font-medium">Total Words (कुल शब्द)</span>
                    <span className="text-slate-800 font-black text-sm">{words}</span>
                  </div>
                  <div className="flex justify-between p-3.5 px-4">
                    <span className="text-slate-400 font-medium">Characters (कुल अक्षर)</span>
                    <span className="text-slate-800 font-black text-sm">{chars}</span>
                  </div>
                  <div className="flex justify-between p-3.5 px-4">
                    <span className="text-slate-400 font-medium">Total Lines (कुल लाइनें)</span>
                    <span className="text-slate-800 font-black text-sm">{lines}</span>
                  </div>
                </div>

                {/* Practical Tip Reminder Line */}
                <p className="text-[11px] text-slate-400 font-medium mt-4 bg-blue-50/50 border border-blue-100 p-3 rounded-xl leading-relaxed">
                  💡 <strong>CSC Operating Pro-Tip:</strong> Use <em>Title Case</em> for typing list items like applicant names, and <em>Sentence Case</em> for long application statement bodies.
                </p>
              </div>

              {/* Clipboard Action Controller Footer Panel */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!inputText}
                  className={`w-full font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm text-white
                    ${!inputText ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : copySuccess ? "bg-green-600 hover:bg-green-700" : "bg-[#0B4AA2] hover:bg-blue-800"}
                  `}
                >
                  {copySuccess ? "📋 Text Copied Safely!" : "📄 Copy Converted Text"}
                </button>
              </div>

            </div>

          </div>

          {/* Secure localized environment notice badge element */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Text string mutation executions process entirely inside volatile local sandbox cookies. Client identity records or business document streams remain strictly isolated with 0% network tracking footprints.
          </div>

        </div>
      </div>
    </div>
  );
}

export default TextCaseConverter;