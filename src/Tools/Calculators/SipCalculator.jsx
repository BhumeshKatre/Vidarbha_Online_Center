import React, { useState } from "react";

function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(2500); // Default: ₹2,500 per month
  const [expectedReturnRate, setExpectedReturnRate] = useState(12); // Default: 12% annual returns
  const [timePeriod, setTimePeriod] = useState(10); // Default: 10 Years

  // Main business logic to calculate compound interest for future values of SIP
  // Formula: M = P x [ ( (1 + i)^n - 1 ) / i ] x (1 + i)
  const calculateSipDetails = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const annualRate = parseFloat(expectedReturnRate) || 0;
    const years = parseInt(timePeriod, 10) || 0;

    const i = annualRate / 12 / 100; // Monthly interest rate
    const n = years * 12; // Total number of months

    if (P === 0 || i === 0 || n === 0) {
      return { totalInvested: 0, wealthGained: 0, futureValue: 0 };
    }

    // SIP Future Value formula execution
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const wealthGained = futureValue - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
      futureValue: Math.round(futureValue),
    };
  };

  const { totalInvested, wealthGained, futureValue } = calculateSipDetails();

  const resetAll = () => {
    setMonthlyInvestment(2500);
    setExpectedReturnRate(12);
    setTimePeriod(10);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Interface Layout Wrapper Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Module Layout Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📈 CSC Wealth Advisory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart SIP Wealth Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Calculate the future value of your Systematic Investment Plan (SIP) investments and explore compounding growth estimates instantly.
            </p>
          </div>

          {/* Configuration Inputs & Highlight Summary Dashboard Split Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* LEFT INPUT PANEL: Parameter entry sliders (7 Columns) */}
            <div className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Monthly Investment Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">💰 Monthly Investment (मासिक निवेश)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">₹ {Number(monthlyInvestment).toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              {/* Expected Return Rate Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">📈 Expected Return Rate (% p.a.)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">{expectedReturnRate}%</span>
                </div>
                <input type="range" min="1" max="30" step="0.5" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" step="0.1" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              {/* Time Period Duration Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">⏱️ Time Period (समय अवधि - वर्ष)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">{timePeriod} Years</span>
                </div>
                <input type="range" min="1" max="40" step="1" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              <button type="button" onClick={resetAll} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs transition">
                Reset Parameters
              </button>

            </div>

            {/* RIGHT PANEL: Repayment summary breakdown tiles (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[360px]">

              <div className="space-y-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Investment Breakdown Result
                </span>

                {/* Total Future Maturity Value Highlight Card Container */}
                <div className="bg-[#0B4AA2] text-white p-5 rounded-2xl text-center shadow-md shadow-blue-900/10">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">
                    Expected Amount (कुल परिपक्वता राशि)
                  </span>
                  <span className="text-3xl sm:text-4xl font-black block mt-2">
                    ₹ {futureValue.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Metric Summary Data Grid Lists */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-400">Invested Amount (कुल जमा राशि)</span>
                    <span className="font-bold text-slate-700">₹ {totalInvested.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-400">Estimated Returns (कुल अनुमानित ब्याज)</span>
                    <span className="font-bold text-green-600">₹ {wealthGained.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm border-b-2 border-b-green-500">
                    <span className="font-bold text-slate-500">Total Market Value</span>
                    <span className="font-black text-green-600">₹ {futureValue.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Visual Compound Interest Advice Note */}
              <p className="text-[10px] text-slate-400 italic text-center mt-4">
                *Calculations assume standard end-of-month compound intervals. Mutual fund investments are subject to market risks.
              </p>

            </div>

          </div>

          {/* Operational Compliance notice disclaimer tag summary */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Real-time computations utilize standard compounding dynamic formulas natively within your browser. No data ever leaves your computer, ensuring absolute speed and financial secrecy.
          </div>

        </div>
      </div>
    </div>
  );
}

export default SipCalculator;