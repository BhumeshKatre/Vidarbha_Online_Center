import React, { useState } from "react";

function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeType, setTimeType] = useState("years"); // 'years' or 'months'
  const [result, setResult] = useState(null);

  // Core math operational logic to compute standard Simple Interest
  // Formula: SI = (P x R x T) / 100
  const calculateInterest = (e) => {
    e.preventDefault();

    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(time) || 0;

    if (p <= 0 || r <= 0 || t <= 0) {
      alert("Please enter valid parameters greater than zero.");
      return;
    }

    // Convert time to years if entered in months configuration scale
    const calculatedTime = timeType === "months" ? t / 12 : t;

    const interestAmount = (p * r * calculatedTime) / 100;
    const totalAmount = p + interestAmount;

    setResult({
      interest: parseFloat(interestAmount.toFixed(2)),
      total: parseFloat(totalAmount.toFixed(2)),
    });
  };

  const resetAll = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTimeType("years");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Application Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header Layout Component */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              💰 CSC Math Studio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Simple Interest Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Calculate standard simple interest yields and overall principal growth over custom yearly or monthly timelines instantly.
            </p>
          </div>

          {/* Configuration Inputs Split Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* LEFT INPUT PANEL: Parameter Entries (7 Columns) */}
            <form onSubmit={calculateInterest} className="md:col-span-7 space-y-5 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Principal Amount Input Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  💵 Principal Amount (मूलधन राशि - ₹)
                </label>
                <input
                  type="number"
                  step="any"
                  value={principal}
                  onChange={(e) => { setPrincipal(e.target.value); setResult(null); }}
                  placeholder="e.g. 20000"
                  className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2] text-base transition"
                  required
                />
              </div>

              {/* Interest Rate Input Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  📈 Interest Rate (% प्रति वर्ष)
                </label>
                <div className="relative rounded-xl shadow-sm bg-white border border-slate-200 focus-within:border-[#0B4AA2] overflow-hidden">
                  <input
                    type="number"
                    step="any"
                    value={rate}
                    onChange={(e) => { setRate(e.target.value); setResult(null); }}
                    placeholder="e.g. 12"
                    className="w-full px-4 py-2.5 font-extrabold text-slate-700 focus:outline-none text-base"
                    required
                  />
                  <span className="absolute right-4 top-2.5 font-black text-slate-400 text-base">%</span>
                </div>
              </div>

              {/* Duration Time Input with Multi-type Switcher Mode */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ⏱️ Time Period (समय अवधि)
                  </label>

                  {/* Tenure Mode Unit Toggle Switch */}
                  <div className="flex gap-1 bg-slate-200/60 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => { setTimeType("years"); setResult(null); }}
                      className={`px-2.5 py-1 rounded ${timeType === "years" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTimeType("months"); setResult(null); }}
                      className={`px-2.5 py-1 rounded ${timeType === "months" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Months
                    </button>
                  </div>
                </div>

                <input
                  type="number"
                  step="any"
                  value={time}
                  onChange={(e) => { setTime(e.target.value); setResult(null); }}
                  placeholder={timeType === "years" ? "e.g. 3 (Years)" : "e.g. 18 (Months)"}
                  className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2] text-base transition"
                  required
                />
              </div>

              {/* Action Trigger Options Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 transition text-center text-sm"
                >
                  ⚙️ Calculate Return
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

            {/* RIGHT PANEL: Outputs Summary Visualization Panels (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[340px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Interest Yield Board
                </span>

                {result ? (
                  <div className="space-y-4 animate-fadeIn">

                    {/* Total Maturity Highlight Output Container */}
                    <div className="bg-[#0B4AA2] text-white p-5 rounded-2xl text-center shadow-md shadow-blue-900/10">
                      <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">
                        Total Amount (कुल देय राशि)
                      </span>
                      <span className="text-3xl sm:text-4xl font-black block mt-2">
                        ₹ {result.total.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Data Rows Parameters List Block */}
                    <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs font-bold text-slate-600 overflow-hidden shadow-sm">
                      <div className="flex justify-between p-3.5 px-4">
                        <span className="text-slate-400 font-medium">Principal Amount</span>
                        <span>₹ {parseFloat(principal).toLocaleString("en-IN")}</span>
                      </div>

                      <div className="flex justify-between p-3.5 px-4 bg-orange-50/20">
                        <span className="text-orange-600 font-bold">Simple Interest (कुल ब्याज)</span>
                        <span className="text-orange-600 font-black">₹ {result.interest.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="flex justify-between p-3.5 px-4 border-b-2 border-b-green-500">
                        <span className="text-slate-700 font-bold">Maturity Total Sum</span>
                        <span className="text-green-600 font-black">₹ {result.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="h-[200px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4">
                    <span className="text-xs text-slate-400 italic text-center leading-relaxed">
                      Enter borrowing principal limits and click "Calculate Return" to evaluate final balance aggregates here.
                    </span>
                  </div>
                )}
              </div>

              {/* Pure Mathematics Security Label Stamp */}
              <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-wider">
                🛡️ Safe Sandbox • Math Engine Activated
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default SimpleInterestCalculator;