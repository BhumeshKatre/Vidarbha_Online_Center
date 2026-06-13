import React, { useState } from "react";

function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18); // Default standard rate is 18%
  const [calcType, setCalcType] = useState("add"); // 'add' or 'remove'
  const [result, setResult] = useState(null);

  // Pre-defined standard Indian GST tax rate slabs
  const gstSlabs = [5, 12, 18, 28];

  // Core business logic to compute GST splittings and final aggregates
  const calculateGst = (e) => {
    e.preventDefault();

    const baseAmount = parseFloat(amount) || 0;
    const rate = parseFloat(gstRate) || 0;

    if (baseAmount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    let gstAmount = 0;
    let netAmount = 0;
    let totalAmount = 0;

    if (calcType === "add") {
      // Direct Tax addition math rules
      gstAmount = (baseAmount * rate) / 100;
      netAmount = baseAmount;
      totalAmount = baseAmount + gstAmount;
    } else {
      // Reverse calculation rules for Tax Inclusive payloads
      netAmount = baseAmount / (1 + rate / 100);
      gstAmount = baseAmount - netAmount;
      totalAmount = baseAmount;
    }

    // Split total GST equally into central (CGST) and state (SGST) parameters
    const halfGst = gstAmount / 2;

    setResult({
      netPrice: parseFloat(netAmount.toFixed(2)),
      cgst: parseFloat(halfGst.toFixed(2)),
      sgst: parseFloat(halfGst.toFixed(2)),
      totalGst: parseFloat(gstAmount.toFixed(2)),
      finalTotal: parseFloat(totalAmount.toFixed(2)),
    });
  };

  const resetAll = () => {
    setAmount("");
    setGstRate(18);
    setCalcType("add");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Interface Box Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Module Header Titles */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ⚖️ CSC Commercial Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart GST Tax Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Compute CGST, SGST, and absolute net values instantly for both GST-Exclusive and GST-Inclusive pricing models.
            </p>
          </div>

          {/* Core Interactive Layout Split Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* LEFT ENTRY PANEL: Handles Form Actions (7 Columns) */}
            <form onSubmit={calculateGst} className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Calculation Mode Toggle Switch */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Tax Mode (जीएसटी मोड चुनें)</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-200/50 p-1 rounded-xl">
                  <button type="button" onClick={() => { setCalcType("add"); setResult(null); }} className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${calcType === "add" ? "bg-[#0B4AA2] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>➕ Add GST (टैक्स जोड़ें)</button>
                  <button type="button" onClick={() => { setCalcType("remove"); setResult(null); }} className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${calcType === "remove" ? "bg-[#0B4AA2] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>➖ Remove GST (टैक्स घटाएं)</button>
                </div>
              </div>

              {/* Principal Base Amount Input Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  💰 Enter Amount (राशि दर्ज करें - ₹)
                </label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setResult(null); }}
                  placeholder="e.g. 5000"
                  className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold px-4 py-3 rounded-xl focus:outline-none focus:border-[#0B4AA2] text-base transition"
                  required
                />
              </div>

              {/* GST Slab Rates Selection Area */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  📊 Select GST Rate Slabs
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {gstSlabs.map((slab) => (
                    <button
                      key={slab}
                      type="button"
                      onClick={() => { setGstRate(slab); setResult(null); }}
                      className={`py-2 rounded-xl font-extrabold text-xs sm:text-sm border transition ${gstRate === slab ? "bg-[#0B4AA2] text-white border-[#0B4AA2]" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      {slab}%
                    </button>
                  ))}
                </div>

                {/* Custom Tax Rate Entry Field */}
                <div className="relative rounded-xl shadow-sm bg-white border border-slate-200 focus-within:border-[#0B4AA2] overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={gstRate}
                    onChange={(e) => { setGstRate(e.target.value); setResult(null); }}
                    placeholder="Or enter custom rate"
                    className="w-full px-4 py-2.5 font-bold text-slate-700 text-sm focus:outline-none"
                    required
                  />
                  <span className="absolute right-4 top-2.5 font-black text-slate-400 text-sm">%</span>
                </div>
              </div>

              {/* Execution Trigger Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#0B4AA2] hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 transition text-center">
                  ⚙️ Calculate GST Invoice
                </button>
                <button type="button" onClick={resetAll} className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm">
                  Reset
                </button>
              </div>

            </form>

            {/* RIGHT DISPLAY PANEL: Renders Computed Financial Metrics Breakdown (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Tax Invoice Summary Breakdown
                </span>

                {result ? (
                  <div className="space-y-3.5 animate-fadeIn">

                    {/* Final Net Amount Payable Block Box */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm border-b-4 border-b-green-500">
                      <span className="text-xs font-bold text-slate-400 uppercase block">Final Adjusted Value</span>
                      <span className="text-3xl font-black text-green-600 block mt-1">₹ {result.finalTotal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Sequential Data Items List Row Grids */}
                    <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs font-bold text-slate-600 overflow-hidden shadow-sm">
                      <div className="flex justify-between p-3 px-4">
                        <span className="text-slate-400">Net Base Price (मूल कीमत)</span>
                        <span>₹ {result.netPrice.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="flex justify-between p-3 px-4 bg-blue-50/10">
                        <span className="text-slate-400">CGST (Central Tax - {gstRate / 2}%)</span>
                        <span className="text-blue-600">₹ {result.cgst.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="flex justify-between p-3 px-4 bg-blue-50/10">
                        <span className="text-slate-400">SGST (State Tax - {gstRate / 2}%)</span>
                        <span className="text-blue-600">₹ {result.sgst.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="flex justify-between p-3 px-4 bg-orange-50/10 text-sm">
                        <span className="text-orange-600 font-extrabold">Total Tax Amount</span>
                        <span className="text-orange-600 font-black">₹ {result.totalGst.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="h-[240px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4">
                    <span className="text-xs text-slate-400 italic text-center leading-relaxed">
                      Enter invoice amount parameters and click "Calculate GST Invoice" to load the complete tax splitting structures.
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Security Compliance Tag Footer */}
              <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-wider">
                🛡️ Local Client Math Engine • Indian GST Formats
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default GstCalculator;