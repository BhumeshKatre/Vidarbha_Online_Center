import React, { useState } from "react";

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000); // Default: 5 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // Default: 8.5%
  const [loanTenure, setLoanTenure] = useState(5); // Default: 5 Years
  const [tenureType, setTenureType] = useState("years"); // 'years' or 'months'

  // Calculate monthly installment parameters using standard financial formula
  // Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEmi = () => {
    const principal = parseFloat(loanAmount) || 0;
    const monthlyRate = (parseFloat(interestRate) || 0) / 12 / 100;

    // Normalize absolute number of months based on tenure selection type
    const totalMonths = tenureType === "years" ? loanTenure * 12 : loanTenure;

    if (principal === 0 || monthlyRate === 0 || totalMonths === 0) {
      return { monthlyEmi: 0, totalPayment: 0, totalInterest: 0 };
    }

    const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyEmi = (principal * monthlyRate * emiFactor) / (emiFactor - 1);

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyEmi: Math.round(monthlyEmi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  };

  const { monthlyEmi, totalPayment, totalInterest } = calculateEmi();

  const resetAll = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTenure(5);
    setTenureType("years");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header Layout Module */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              💰 CSC Finance Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Loan EMI Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Calculate monthly loan installments, total payable interest, and overall repayment layout structures instantly.
            </p>
          </div>

          {/* Interactive Split Work Area Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* Left Side: Sliders & Form Controls (7 Columns) */}
            <div className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Loan Amount Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    💵 Loan Amount (लोन राशि)
                  </label>
                  <span className="text-sm font-black text-[#0B4AA2]">
                    ₹ {Number(loanAmount).toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                />
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                />
              </div>

              {/* Interest Rate Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    📈 Interest Rate (% प्रति वर्ष)
                  </label>
                  <span className="text-sm font-black text-[#0B4AA2]">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                />
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                />
              </div>

              {/* Loan Tenure Duration Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ⏱️ Loan Tenure (लोन अवधि)
                  </label>
                  <div className="flex gap-1 bg-slate-200/60 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => { setTenureType("years"); setLoanTenure(Math.round(loanTenure / 12) || 1); }}
                      className={`px-2 py-1 rounded ${tenureType === "years" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTenureType("months"); setLoanTenure(loanTenure * 12); }}
                      className={`px-2 py-1 rounded ${tenureType === "months" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max={tenureType === "years" ? 30 : 360}
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]"
                />
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                />
              </div>

            </div>

            {/* Right Side: Calculation Studio Results Dashboard Display (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[360px]">

              <div className="space-y-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Repayment Breakdown Details
                </span>

                {/* Monthly Installment Highlight Block */}
                <div className="bg-[#0B4AA2] text-white p-5 rounded-2xl text-center shadow-md shadow-blue-900/10">
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">
                    Monthly EMI (हर महीने की किस्त)
                  </span>
                  <span className="text-3xl sm:text-4xl font-black block mt-2">
                    ₹ {monthlyEmi.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Metric Summary Data Grid Lists */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-400">Principal Amount</span>
                    <span className="font-bold text-slate-700">₹ {Number(loanAmount).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-400">Total Interest (कुल ब्याज)</span>
                    <span className="font-bold text-orange-500">₹ {totalInterest.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 px-4 rounded-xl flex justify-between items-center text-sm border-b-2 border-b-green-500">
                    <span className="font-bold text-slate-500">Total Amount Payable</span>
                    <span className="font-black text-green-600">₹ {totalPayment.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Reset Operational trigger button */}
              <button
                onClick={resetAll}
                className="w-full mt-6 bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-5 py-3 transition text-sm rounded-xl"
              >
                Reset Parameters
              </button>

            </div>

          </div>

          {/* Educational Guideline Notice Banner */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Sizing formulas follow the standard reducing balance tracking metric algorithm structure. Results serve as highly accurate commercial financial estimations.
          </div>

        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;