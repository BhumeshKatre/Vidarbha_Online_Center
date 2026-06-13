import React, { useState } from "react";

function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState("simple");

  // State parameters for Mode 1: Simple Percentage
  const [simpleNum, setSimpleNum] = useState("");
  const [simplePct, setSimplePct] = useState("");
  const [simpleResult, setSimpleResult] = useState(null);

  // State parameters for Mode 2: Mark Percentage
  const [marksObtained, setMarksObtained] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [marksResult, setMarksResult] = useState(null);

  // State parameters for Mode 3: Increase / Decrease
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [diffResult, setDiffResult] = useState(null);

  // State parameters for Mode 4: Discount & Tax
  const [baseAmount, setBaseAmount] = useState("");
  const [ratePct, setRatePct] = useState("");
  const [calcType, setCalcType] = useState("discount"); // 'discount' or 'tax'
  const [impactResult, setImpactResult] = useState(null);

  // Core Math Logic Block for Simple Percentage Calculation
  const handleSimpleCalc = (e) => {
    e.preventDefault();
    const num = parseFloat(simpleNum) || 0;
    const pct = parseFloat(simplePct) || 0;
    const res = (num * pct) / 100;
    setSimpleResult(parseFloat(res.toFixed(2)));
  };

  // Core Math Logic Block for Academic Marks Percentage Calculation
  const handleMarksCalc = (e) => {
    e.preventDefault();
    const obtained = parseFloat(marksObtained) || 0;
    const total = parseFloat(totalMarks) || 0;
    if (total <= 0) {
      alert("Total marks must be greater than zero.");
      return;
    }
    const res = (obtained / total) * 100;
    setMarksResult(parseFloat(res.toFixed(2)));
  };

  // Core Math Logic Block for Price Increase or Decrease Percentage
  const handleDiffCalc = (e) => {
    e.preventDefault();
    const initial = parseFloat(initialValue) || 0;
    const final = parseFloat(finalValue) || 0;
    if (initial === 0) {
      alert("Initial value cannot be zero.");
      return;
    }
    const change = final - initial;
    const pctChange = (change / Math.abs(initial)) * 100;
    setDiffResult({
      pct: parseFloat(Math.abs(pctChange).toFixed(2)),
      type: change >= 0 ? "Increase (बढ़ोतरी)" : "Decrease (कमी)",
      color: change >= 0 ? "text-green-600" : "text-red-500"
    });
  };

  // Core Math Logic Block for Discount Deduction or Tax Addition
  const handleImpactCalc = (e) => {
    e.preventDefault();
    const base = parseFloat(baseAmount) || 0;
    const rate = parseFloat(ratePct) || 0;
    const amountImpact = (base * rate) / 100;
    const finalTotal = calcType === "discount" ? base - amountImpact : base + amountImpact;

    setImpactResult({
      impactAmount: parseFloat(amountImpact.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2))
    });
  };

  // Clear tracking references based on the currently selected active tab panel
  const resetTab = () => {
    if (activeTab === "simple") { setSimpleNum(""); setSimplePct(""); setSimpleResult(null); }
    if (activeTab === "marks") { setMarksObtained(""); setTotalMarks(""); setMarksResult(null); }
    if (activeTab === "diff") { setInitialValue(""); setFinalValue(""); setDiffResult(null); }
    if (activeTab === "impact") { setBaseAmount(""); setRatePct(""); setImpactResult(null); }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Component Card Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Module Layout Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📊 CSC Math Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Percentage Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              An all-in-one percentage solution for scholarship forms, marks validation, price changes, and discount evaluations.
            </p>
          </div>

          {/* Interactive Navigation Mode Switcher Row */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200/60">
            {[
              { id: "simple", label: "Simple %" },
              { id: "marks", label: "Marks %" },
              { id: "diff", label: "Growth / Decay %" },
              { id: "impact", label: "Discount / Tax %" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); }}
                className={`flex-1 min-w-[100px] text-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${activeTab === tab.id ? "bg-[#0B4AA2] text-white shadow-md" : "text-slate-600 hover:text-slate-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Core Computational Work Areas Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* LEFT INPUT PANEL: Handles Form Submissions (7 Columns) */}
            <div className="md:col-span-7 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* TAB CONTAINER 1: Simple Percentage Formula */}
              {activeTab === "simple" && (
                <form onSubmit={handleSimpleCalc} className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Find a Percentage Worth</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">What is</label>
                    <div className="relative rounded-xl shadow-sm bg-white border border-slate-200 focus-within:border-[#0B4AA2] overflow-hidden">
                      <input type="number" step="any" value={simplePct} onChange={(e) => { setSimplePct(e.target.value); setSimpleResult(null); }} placeholder="e.g. 15" className="w-full px-4 py-2.5 font-bold text-slate-700 focus:outline-none" required />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Of Base Number</label>
                    <input type="number" step="any" value={simpleNum} onChange={(e) => { setSimpleNum(e.target.value); setSimpleResult(null); }} placeholder="e.g. 5000" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition text-sm">Calculate</button>
                    <button type="button" onClick={resetTab} className="bg-slate-200 text-slate-600 font-bold px-4 py-3 rounded-xl hover:bg-slate-300 text-sm transition">Clear</button>
                  </div>
                </form>
              )}

              {/* TAB CONTAINER 2: Academic Mark Evaluations */}
              {activeTab === "marks" && (
                <form onSubmit={handleMarksCalc} className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Calculate Form Exam Percentages</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Marks Obtained (प्राप्त अंक)</label>
                    <input type="number" step="any" value={marksObtained} onChange={(e) => { setMarksObtained(e.target.value); setMarksResult(null); }} placeholder="e.g. 450" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Total Marks (कुल अंक)</label>
                    <input type="number" step="any" value={totalMarks} onChange={(e) => { setTotalMarks(e.target.value); setMarksResult(null); }} placeholder="e.g. 600" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition text-sm">Calculate Marks %</button>
                    <button type="button" onClick={resetTab} className="bg-slate-200 text-slate-600 font-bold px-4 py-3 rounded-xl hover:bg-slate-300 text-sm transition">Clear</button>
                  </div>
                </form>
              )}

              {/* TAB CONTAINER 3: Price Growth or Decay Deltas */}
              {activeTab === "diff" && (
                <form onSubmit={handleDiffCalc} className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Find Percentage Changes</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Initial Base Value (पुरानी कीमत)</label>
                    <input type="number" step="any" value={initialValue} onChange={(e) => { setInitialValue(e.target.value); setDiffResult(null); }} placeholder="e.g. 1200" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Final Ending Value (नई कीमत)</label>
                    <input type="number" step="any" value={finalValue} onChange={(e) => { setFinalValue(e.target.value); setDiffResult(null); }} placeholder="e.g. 1500" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition text-sm">Calculate Change %</button>
                    <button type="button" onClick={resetTab} className="bg-slate-200 text-slate-600 font-bold px-4 py-3 rounded-xl hover:bg-slate-300 text-sm transition">Clear</button>
                  </div>
                </form>
              )}

              {/* TAB CONTAINER 4: Discount Inclusions and Deductions */}
              {activeTab === "impact" && (
                <form onSubmit={handleImpactCalc} className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Calculate Sales Discount or Taxes</span>
                  <div className="grid grid-cols-2 gap-2 bg-slate-200/50 p-1 rounded-xl">
                    <button type="button" onClick={() => { setCalcType("discount"); setImpactResult(null); }} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${calcType === "discount" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>🏷️ Discount (-)</button>
                    <button type="button" onClick={() => { setCalcType("tax"); setImpactResult(null); }} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${calcType === "tax" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>🏛️ Tax / GST (+)</button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Base Price / Principal Amount</label>
                    <input type="number" step="any" value={baseAmount} onChange={(e) => { setBaseAmount(e.target.value); setImpactResult(null); }} placeholder="e.g. 2500" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Rate Percentage (%)</label>
                    <div className="relative rounded-xl shadow-sm bg-white border border-slate-200 focus-within:border-[#0B4AA2] overflow-hidden">
                      <input type="number" step="any" value={ratePct} onChange={(e) => { setRatePct(e.target.value); setImpactResult(null); }} placeholder="e.g. 18" className="w-full px-4 py-2.5 font-bold text-slate-700 focus:outline-none" required />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 text-sm">%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition text-sm">Compute Final Bill</button>
                    <button type="button" onClick={resetTab} className="bg-slate-200 text-slate-600 font-bold px-4 py-3 rounded-xl hover:bg-slate-300 text-sm transition">Clear</button>
                  </div>
                </form>
              )}

            </div>

            {/* RIGHT DISPLAY PANEL: Outputs Visual Result Breakdown Views (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[280px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Calculation Output Preview</span>

                {/* Response View 1: Simple Mode Result */}
                {activeTab === "simple" && simpleResult !== null && (
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm animate-fadeIn">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Result Value</span>
                    <span className="text-4xl font-black text-[#0B4AA2] block mt-2">{simpleResult}</span>
                    <p className="text-[11px] text-slate-400 font-semibold mt-3">{simplePct}% of {simpleNum} equals {simpleResult}</p>
                  </div>
                )}

                {/* Response View 2: Mark Percentage Result */}
                {activeTab === "marks" && marksResult !== null && (
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm border-b-4 border-b-green-500 animate-fadeIn">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Exam Score Percentage</span>
                    <span className="text-4xl font-black text-green-600 block mt-2">{marksResult}%</span>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
                      <div style={{ width: `${Math.min(marksResult, 100)}%` }} className="bg-green-500 h-full rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Response View 3: Delta Growth Change Result */}
                {activeTab === "diff" && diffResult !== null && (
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm animate-fadeIn">
                    <span className="text-xs font-bold text-slate-400 uppercase block">Variation Deviation Rate</span>
                    <span className={`text-4xl font-black block mt-2 ${diffResult.color}`}>{diffResult.pct}%</span>
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 border ${diffResult.color}`}>{diffResult.type}</span>
                  </div>
                )}

                {/* Response View 4: Discount/Tax Composite Result */}
                {activeTab === "impact" && impactResult !== null && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-400 uppercase">{calcType === "discount" ? "Amount Saved (-)" : "Tax Charge (+)"}</span>
                      <span className={calcType === "discount" ? "text-orange-500" : "text-blue-600"}>₹ {impactResult.impactAmount}</span>
                    </div>
                    <div className="bg-white p-5 border border-slate-200 rounded-xl text-center shadow-sm border-b-4 border-b-green-500">
                      <span className="text-xs font-bold text-slate-400 uppercase block">Final Adjusted Total</span>
                      <span className="text-3xl font-black text-green-600 block mt-1">₹ {impactResult.finalTotal}</span>
                    </div>
                  </div>
                )}

                {/* Fallback empty conditional baseline card container layout */}
                {((activeTab === "simple" && simpleResult === null) ||
                  (activeTab === "marks" && marksResult === null) ||
                  (activeTab === "diff" && diffResult === null) ||
                  (activeTab === "impact" && impactResult === null)) && (
                    <div className="h-[180px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4">
                      <span className="text-xs text-slate-400 italic text-center leading-relaxed">
                        Enter values and click "Calculate" to view the computed values matrix here.
                      </span>
                    </div>
                  )}
              </div>

              {/* Bottom Brand Stamp Footer Anchor */}
              <p className="text-[10px] text-slate-400 font-semibold text-center mt-4">
                🔒 Safe Client-Side Pure Mathematics Module
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default PercentageCalculator;