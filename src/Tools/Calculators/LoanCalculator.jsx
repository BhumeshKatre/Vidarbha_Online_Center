import React, { useState } from "react";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000); // Default: 5 Lakhs
  const [interestRate, setInterestRate] = useState(9.5); // Default: 9.5%
  const [loanTenure, setLoanTenure] = useState(5); // Default: 5 Years

  // Main business logic to calculate financial metrics and the structural amortization table schedule
  const calculateLoanDetails = () => {
    const principal = parseFloat(loanAmount) || 0;
    const yearlyRate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTenure, 10) || 0;

    const monthlyRate = yearlyRate / 12 / 100;
    const totalMonths = years * 12;

    if (principal === 0 || monthlyRate === 0 || totalMonths === 0) {
      return { monthlyEmi: 0, totalPayment: 0, totalInterest: 0, schedule: [] };
    }

    // Standard reducing balance installment calculation formula
    const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyEmi = (principal * monthlyRate * emiFactor) / (emiFactor - 1);

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Generate yearly breakdown amortization matrix tracking elements
    const schedule = [];
    let remainingBalance = principal;

    for (let year = 1; year <= years; year++) {
      let yearlyInterestPaid = 0;
      let yearlyPrincipalPaid = 0;

      // Loop through the 12 months belonging to the specific current year block
      for (let month = 1; month <= 12; month++) {
        const currentMonthInterest = remainingBalance * monthlyRate;
        const currentMonthPrincipal = monthlyEmi - currentMonthInterest;

        yearlyInterestPaid += currentMonthInterest;
        yearlyPrincipalPaid += currentMonthPrincipal;
        remainingBalance -= currentMonthPrincipal;
      }

      // Safeguard check to avoid trailing negative decimals at the end of tenure limits
      if (year === years || remainingBalance < 0) {
        remainingBalance = 0;
      }

      schedule.push({
        year: year,
        principalPaid: Math.round(yearlyPrincipalPaid),
        interestPaid: Math.round(yearlyInterestPaid),
        totalYearPaid: Math.round(yearlyPrincipalPaid + yearlyInterestPaid),
        balanceLeft: Math.round(remainingBalance),
      });
    }

    return {
      monthlyEmi: Math.round(monthlyEmi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      schedule: schedule,
    };
  };

  const { monthlyEmi, totalPayment, totalInterest, schedule } = calculateLoanDetails();

  const resetAll = () => {
    setLoanAmount(500000);
    setInterestRate(9.5);
    setLoanTenure(5);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Interface Layout Wrapper Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Module Layout Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📈 CSC Commercial Finance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Advanced Loan Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Analyze complete loan breakdown profiles, evaluate full amortization matrices, and check dynamic yearly timelines.
            </p>
          </div>

          {/* Configuration Inputs & Highlight Summary Dashboard Split Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-8">

            {/* LEFT INPUT PANEL: Parameter entry sliders (7 Columns) */}
            <div className="lg:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Loan Amount Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">💰 Principal Amount (लोन राशि)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">₹ {Number(loanAmount).toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min="50000" max="20000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              {/* Interest Rate Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">📈 Interest Rate (% per annum)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">{interestRate}%</span>
                </div>
                <input type="range" min="3" max="25" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              {/* Loan Tenure Duration Range Input Controller */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">⏱️ Tenure Duration (अवधि - वर्ष)</label>
                  <span className="text-sm font-black text-[#0B4AA2]">{loanTenure} Years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4AA2]" />
                <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full mt-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
              </div>

              <button type="button" onClick={resetAll} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs transition">
                Reset Sizing Frameworks
              </button>

            </div>

            {/* RIGHT PANEL: repyament summary breakdown tiles (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">

              {/* Monthly EMI Core Highlight Card Container */}
              <div className="bg-[#0B4AA2] text-white p-5 rounded-2xl text-center shadow-md">
                <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Estimated Monthly Installment</span>
                <span className="text-3xl sm:text-4xl font-black block mt-1.5">₹ {monthlyEmi.toLocaleString("en-IN")}</span>
              </div>

              {/* Text metric balance tracking grids */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center bg-white p-3 px-4 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold">
                  <span className="text-slate-400 font-medium">Principal Amount</span>
                  <span className="text-slate-700">₹ {Number(loanAmount).toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center bg-white p-3 px-4 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold">
                  <span className="text-slate-400 font-medium">Total Interest Charges</span>
                  <span className="text-orange-500">₹ {totalInterest.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center bg-white p-3 px-4 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold border-b-2 border-b-green-500">
                  <span className="text-slate-600">Total Cumulative Repayment</span>
                  <span className="text-green-600 font-black">₹ {totalPayment.toLocaleString("en-IN")}</span>
                </div>
              </div>

            </div>

          </div>

          {/* LOWER SECTION: Advanced Amortization Breakdown Table Timeline */}
          {schedule.length > 0 && (
            <div className="mt-6 border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white animate-fadeIn">
              <div className="bg-slate-100 p-4 px-5 border-b border-slate-200">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
                  📅 Yearly Repayment Amortization Timeline (सालाना विवरण तालिका)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-200 select-none">
                      <th className="p-3.5 px-5">Year</th>
                      <th className="p-3.5">Principal Paid</th>
                      <th className="p-3.5">Interest Paid</th>
                      <th className="p-3.5">Total Yearly Paid</th>
                      <th className="p-3.5 text-right px-5">Outstanding Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                    {schedule.map((row) => (
                      <tr key={row.year} className="hover:bg-blue-50/10 transition">
                        <td className="p-3.5 px-5 font-bold text-slate-800">Year {row.year}</td>
                        <td className="p-3.5">₹ {row.principalPaid.toLocaleString("en-IN")}</td>
                        <td className="p-3.5 text-orange-500">₹ {row.interestPaid.toLocaleString("en-IN")}</td>
                        <td className="p-3.5 text-[#0B4AA2]">₹ {row.totalYearPaid.toLocaleString("en-IN")}</td>
                        <td className="p-3.5 text-right px-5 text-green-600 font-bold">₹ {row.balanceLeft.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Compliance notice disclaimer tag summary */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Amortization schedules run reducing balance mathematical computations dynamically inside local script blocks. Final details line up perfectly with standard banking loan structures.
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;