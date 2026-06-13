import React, { useState } from "react";

function BmiCalculator() {
  const [weight, setWeight] = useState(65); // Default weight in KG
  const [heightCm, setHeightCm] = useState(170); // Default height in Centimeters
  const [heightFeet, setHeightFeet] = useState(5); // Default feet for imperial view
  const [heightInches, setHeightInches] = useState(7); // Default inches for imperial view
  const [heightMode, setHeightMode] = useState("cm"); // 'cm' or 'ft'
  const [bmiResult, setBmiResult] = useState(null);

  // Core business logic to parse variables and calculate Body Mass Index score
  // Formula: BMI = weight (kg) / [height (m)]^2
  const calculateBmi = (e) => {
    e.preventDefault();

    let heightInMeters = 0;
    const weightKg = parseFloat(weight) || 0;

    if (heightMode === "cm") {
      heightInMeters = (parseFloat(heightCm) || 0) / 100;
    } else {
      // Convert feet and inches into total inches, then convert to meters safely
      const totalInches = (parseInt(heightFeet, 10) * 12) + (parseInt(heightInches, 10) || 0);
      heightInMeters = (totalInches * 2.54) / 100;
    }

    if (weightKg <= 0 || heightInMeters <= 0) {
      alert("Please enter valid weight and height metrics.");
      return;
    }

    const bmiScore = weightKg / (heightInMeters * heightInMeters);
    const parsedBmi = parseFloat(bmiScore.toFixed(1));

    // Determine weight category status and contextual color code based on global WHO guidelines
    let status = "";
    let statusColor = "";

    if (parsedBmi < 18.5) {
      status = "Underweight (कम वजन)";
      statusColor = "text-amber-500 bg-amber-50 border-amber-200";
    } else if (parsedBmi >= 18.5 && parsedBmi <= 24.9) {
      status = "Normal Weight (स्वस्थ वजन)";
      statusColor = "text-green-600 bg-green-50 border-green-200";
    } else if (parsedBmi >= 25 && parsedBmi <= 29.9) {
      status = "Overweight (अधिक वजन)";
      statusColor = "text-orange-500 bg-orange-50 border-orange-200";
    } else {
      status = "Obese (मोटापा)";
      statusColor = "text-red-600 bg-red-50 border-red-200";
    }

    setBmiResult({
      score: parsedBmi,
      status: status,
      colorClass: statusColor,
    });
  };

  const resetAll = () => {
    setWeight(65);
    setHeightCm(170);
    setHeightFeet(5);
    setHeightInches(7);
    setHeightMode("cm");
    setBmiResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header Layout */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ⚖️ CSC Health Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart BMI Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Calculate Body Mass Index (BMI) instantly for physical fitness entry exams and standard medical checkups.
            </p>
          </div>

          {/* Configuration Layout Split Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* Left Side: Entry Form & Sliders (7 Columns) */}
            <form onSubmit={calculateBmi} className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Weight Input Group */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    🏋️ Weight (वजन - KG)
                  </label>
                  <span className="text-sm font-black text-[#0B4AA2]">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="1"
                  value={weight}
                  onChange={(e) => { setWeight(Number(e.target.value)); setBmiResult(null); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(Number(e.target.value)); setBmiResult(null); }}
                  className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                  required
                />
              </div>

              {/* Height Configuration Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    📏 Height (ऊंचाई)
                  </label>

                  {/* Height Unit Toggle Row */}
                  <div className="flex gap-1 bg-slate-200/60 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => { setHeightMode("cm"); setBmiResult(null); }}
                      className={`px-2 py-1 rounded ${heightMode === "cm" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Centimeters
                    </button>
                    <button
                      type="button"
                      onClick={() => { setHeightMode("ft"); setBmiResult(null); }}
                      className={`px-2 py-1 rounded ${heightMode === "ft" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Feet/Inches
                    </button>
                  </div>
                </div>

                {/* Conditional Metric Inputs based on Height Mode Selection */}
                {heightMode === "cm" ? (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="50"
                      max="250"
                      step="1"
                      value={heightCm}
                      onChange={(e) => { setHeightCm(Number(e.target.value)); setBmiResult(null); }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                    />
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => { setHeightCm(Number(e.target.value)); setBmiResult(null); }}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                      placeholder="Height in cm"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Feet</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={heightFeet}
                        onChange={(e) => { setHeightFeet(Number(e.target.value)); setBmiResult(null); }}
                        className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Inches</label>
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={heightInches}
                        onChange={(e) => { setHeightInches(Number(e.target.value)); setBmiResult(null); }}
                        className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Form Trigger Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition text-center"
                >
                  📊 Calculate BMI
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm"
                >
                  Reset
                </button>
              </div>

            </form>

            {/* Right Side: Execution Summary Dashboard Result (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[340px]">

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Health Analysis Board
                </span>

                {bmiResult ? (
                  <div className="space-y-5 animate-fadeIn">

                    {/* Score Highlighting Box Container */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your BMI Score</span>
                      <span className="text-4xl font-black text-[#0B4AA2] block mt-2">{bmiResult.score}</span>
                    </div>

                    {/* Weight Status Category Display Box */}
                    <div className={`p-4 rounded-xl border text-center font-bold text-sm ${bmiResult.colorClass}`}>
                      Health Status: {bmiResult.status}
                    </div>

                    {/* WHO Metric Table Reference Row Elements */}
                    <div className="border border-slate-200 bg-white rounded-xl divide-y divide-slate-100 text-[11px] font-semibold text-slate-500 overflow-hidden shadow-sm">
                      <div className="flex justify-between p-2.5 px-3 bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                        <span>BMI Range</span>
                        <span>Classification</span>
                      </div>
                      <div className="flex justify-between p-2.5 px-3"><span>Less than 18.5</span><span className="text-amber-500 font-bold">Underweight</span></div>
                      <div className="flex justify-between p-2.5 px-3 bg-green-50/20"><span>18.5 – 24.9</span><span className="text-green-600 font-bold">Normal Weight</span></div>
                      <div className="flex justify-between p-2.5 px-3"><span>25.0 – 29.9</span><span className="text-orange-500 font-bold">Overweight</span></div>
                      <div className="flex justify-between p-2.5 px-3"><span>30.0 or More</span><span className="text-red-500 font-bold">Obese</span></div>
                    </div>

                  </div>
                ) : (
                  <div className="h-[220px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4">
                    <span className="text-xs text-slate-400 italic text-center leading-relaxed">
                      Enter height/weight metrics and click "Calculate BMI" to load the status matrix.
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Health Target Advice Line */}
              {bmiResult && (
                <p className="text-[10px] text-slate-400 italic text-center mt-4">
                  *Calculations match standard World Health Organization (WHO) biological guidelines.
                </p>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default BmiCalculator;