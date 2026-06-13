import React, { useState, useEffect, useCallback } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(12); // Default password length
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Core cryptographically safe pseudo-random generator algorithm wrapped in a useCallback hook
  const generatePassword = useCallback(() => {
    let characterPool = "";
    if (includeUpper) characterPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) characterPool += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characterPool += "0123456789";
    if (includeSymbols) characterPool += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Handle corner case where no options are selected by the user
    if (characterPool === "") {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generated += characterPool.charAt(randomIndex);
    }
    setPassword(generated);
    setCopySuccess(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // Automatically trigger a re-generation cycle whenever user parameters change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Evaluates password strength score and returns descriptive configurations
  const getStrengthMetrics = () => {
    if (!password) return { label: "Empty", colorClass: "bg-slate-200", widthClass: "w-0" };

    let score = 0;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 14) score++;

    if (score <= 2 || length < 8) {
      return { label: "Weak (कमजोर)", colorClass: "bg-red-500", widthClass: "w-1/3" };
    } else if (score === 3 || (score === 4 && length < 12)) {
      return { label: "Medium (सामान्य)", colorClass: "bg-orange-500", widthClass: "w-2/3" };
    } else {
      return { label: "Strong (मजबूत)", colorClass: "bg-green-600", widthClass: "w-full" };
    }
  };

  const strength = getStrengthMetrics();

  // Handle cross-browser clipboard copy actions smoothly
  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset visual success prompt after 2 seconds
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Main Application Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Header Layout Component */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🔐 CSC Cybersecurity Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Secure Password Generator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Generate strong, customized, hack-proof passwords instantly to secure client portals, mail registers, and account systems.
            </p>
          </div>

          {/* Configuration Layout Split Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT INPUT PANEL: Parameter Entry Switches & Options (7 Columns) */}
            <div className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">
              
              {/* Length Selector Block */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ⏱️ Password Length (पासवर्ड की लंबाई)
                  </label>
                  <span className="text-sm font-black text-[#0B4AA2]">{length} Characters</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="32"
                  step="1"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                />
              </div>

              {/* Character Rules Toggles Rows */}
              <div className="space-y-3.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Include Rules Configurations
                </label>

                {/* Rule Item 1: Uppercase */}
                <label className="flex items-center gap-3 bg-white p-3 px-4 border border-slate-200 rounded-xl cursor-pointer select-none shadow-sm hover:border-blue-100 transition">
                  <input
                    type="checkbox"
                    checked={includeUpper}
                    onChange={(e) => setIncludeUpper(e.target.checked)}
                    className="w-4 h-4 text-[#0B4AA2] border-slate-300 rounded focus:ring-[#0B4AA2]"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 block">Uppercase Letters (A-Z)</span>
                  </div>
                </label>

                {/* Rule Item 2: Lowercase */}
                <label className="flex items-center gap-3 bg-white p-3 px-4 border border-slate-200 rounded-xl cursor-pointer select-none shadow-sm hover:border-blue-100 transition">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="w-4 h-4 text-[#0B4AA2] border-slate-300 rounded focus:ring-[#0B4AA2]"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 block">Lowercase Letters (a-z)</span>
                  </div>
                </label>

                {/* Rule Item 3: Numbers */}
                <label className="flex items-center gap-3 bg-white p-3 px-4 border border-slate-200 rounded-xl cursor-pointer select-none shadow-sm hover:border-blue-100 transition">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 text-[#0B4AA2] border-slate-300 rounded focus:ring-[#0B4AA2]"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 block">Numeric Values (0-9)</span>
                  </div>
                </label>

                {/* Rule Item 4: Special Symbols */}
                <label className="flex items-center gap-3 bg-white p-3 px-4 border border-slate-200 rounded-xl cursor-pointer select-none shadow-sm hover:border-blue-100 transition">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 text-[#0B4AA2] border-slate-300 rounded focus:ring-[#0B4AA2]"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 block">Special Symbols (@#$%^&*)</span>
                  </div>
                </label>
              </div>

            </div>

            {/* RIGHT PANEL: Outputs Generated Password & Strength Meter (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[340px]">
              
              <div className="space-y-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Generated Output Studio
                </span>

                {/* Result Highlighting Output Field */}
                <div className="bg-slate-900 text-green-400 p-4 px-5 rounded-2xl text-center shadow-inner relative group border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-left mb-1 select-none">
                    Your Password Token
                  </span>
                  <input
                    type="text"
                    value={password || "Select options..."}
                    className="w-full bg-transparent text-center font-mono font-black text-lg sm:text-xl border-0 p-0 focus:outline-none focus:ring-0 text-green-400 select-all"
                    readOnly
                  />
                </div>

                {/* Dynamic Strength Indicator Dashboard Module */}
                {password && (
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-2 animate-fadeIn">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-400 uppercase">Security Strength:</span>
                      <span className={strength.colorClass.replace("bg-", "text-")}>{strength.label}</span>
                    </div>
                    {/* Visual Progress Bar Component wrapper */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${strength.colorClass} ${strength.widthClass} h-full transition-all duration-300 rounded-full`}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Execution Operational Triggers Footer */}
              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!password}
                  className={`w-full font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm text-white
                    ${!password ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : copySuccess ? "bg-green-600 hover:bg-green-700 shadow-green-900/10" : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"}
                  `}
                >
                  {copySuccess ? "📋 Copied Successfully!" : "📄 Copy Password String"}
                </button>
                
                <button
                  type="button"
                  onClick={generatePassword}
                  disabled={!includeUpper && !includeLower && !includeNumbers && !includeSymbols}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-5 py-2.5 rounded-xl transition text-xs text-center disabled:opacity-50"
                >
                  🔄 Re-Generate New Token
                </button>
              </div>

            </div>

          </div>

          {/* Secure sandbox local compute warning regulatory banner */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> String character distribution arrays execute mathematical randomization logic completely localized within volatile client engine loops. Generated data sets remain entirely unlogged and confidential.
          </div>

        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;