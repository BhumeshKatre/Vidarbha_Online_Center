import React, { useState, useEffect } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Array list of globally dominant and locally requested standard currency profiles
  const currencyList = [
    { code: "INR", name: "Indian Rupee (₹)" },
    { code: "USD", name: "US Dollar ($)" },
    { code: "AED", name: "UAE Dirham (د.إ)" },
    { code: "SAR", name: "Saudi Riyal (ر.س)" },
    { code: "OMR", name: "Omani Rial (ر.ع.)" },
    { code: "KWD", name: "Kuwaiti Dinar (د.ك)" },
    { code: "EUR", name: "Euro (€)" },
    { code: "GBP", name: "British Pound (£)" },
    { code: "CAD", name: "Canadian Dollar ($)" },
    { code: "AUD", name: "Australian Dollar ($)" },
    { code: "SGD", name: "Singapore Dollar ($)" },
    { code: "MYR", name: "Malaysian Ringgit (RM)" }
  ];

  // Fetch real-time currency conversion rates dynamically via public API streams
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (!fromCurrency || !toCurrency) return;
      setIsLoading(true);
      try {
        // Utilizing a stable public open access endpoint without requiring private registration tokens
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${fromCurrency}`
        );
        const data = await response.json();
        
        if (data && data.rates) {
          const rate = data.rates[toCurrency];
          setExchangeRate(rate);
        }
      } catch (error) {
        console.error("Currency Exchange API Network Connection Crash:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Compute final aggregates instantly when conversion rate or user input fluctuates
  useEffect(() => {
    if (exchangeRate !== null && amount !== "") {
      const result = parseFloat(amount) * exchangeRate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, exchangeRate]);

  // Handle immediate physical swapping of the primary target parameters
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const resetAll = () => {
    setAmount("1");
    setFromCurrency("USD");
    setToCurrency("INR");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Main Card Element */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Main Layout Header Module */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              💱 CSC Global Forex
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Live Currency Converter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Convert international currency values instantly using live global market feed exchange benchmarks.
            </p>
          </div>

          {/* Configuration Grid Panel Modules */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COMPONENT MODULE: Selection Forms Dashboard (7 Columns) */}
            <div className="md:col-span-7 space-y-5 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">
              
              {/* Base Amount Entry Input */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  💵 Enter Amount (धनराशि दर्ज करें)
                </label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2] text-base transition"
                  required
                />
              </div>

              {/* Currency Selector Grid Split Framework */}
              <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 items-center">
                
                {/* From Dropdown Select box */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">From (यहाँ से)</label>
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 focus:outline-none focus:border-[#0B4AA2]">
                    {currencyList.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Swap Axis Operational Interaction Handle */}
                <div className="sm:col-span-1 text-center pt-3 sm:pt-4">
                  <button type="button" onClick={swapCurrencies} title="Swap Currencies" className="w-9 h-9 mx-auto bg-white border border-slate-200 text-[#0B4AA2] hover:bg-[#0B4AA2] hover:text-white rounded-xl flex items-center justify-center text-sm shadow-sm transition active:scale-95">
                    🔃
                  </button>
                </div>

                {/* To Dropdown Select box */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">To (यहाँ तक)</label>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 focus:outline-none focus:border-[#0B4AA2]">
                    {currencyList.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Reset Controller Hooks Button */}
              <button type="button" onClick={resetAll} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-4 py-2 rounded-xl text-xs transition">
                Reset to Base Settings
              </button>

            </div>

            {/* RIGHT PANEL: Live Feed Visual Output Monitor (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[320px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Live Market Remittance Output
                </span>

                {isLoading ? (
                  <div className="h-[180px] bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm animate-pulse">
                    <span className="text-2xl animate-spin">⏳</span>
                    <span className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-wider">Syncing Live Forex Rates...</span>
                  </div>
                ) : convertedAmount !== null ? (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Main Target Display Amount Box */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm border-b-4 border-b-green-500">
                      <span className="text-xs font-bold text-slate-400 uppercase block">Converted Equivalent Value</span>
                      <span className="text-3xl font-black text-green-600 block mt-2">
                        {toCurrency} {Number(convertedAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Operational conversion matrix statement references info tag row grids */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 px-4 text-xs font-bold text-slate-500 flex justify-between shadow-sm">
                      <span className="text-slate-400">Current Market Rate:</span>
                      <span className="text-slate-700">1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}</span>
                    </div>

                  </div>
                ) : (
                  <div className="h-[180px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4">
                    <span className="text-xs text-slate-400 italic text-center leading-relaxedselect-none">
                      Input structural pricing integers to capture real-time currency conversion matrices.
                    </span>
                  </div>
                )}
              </div>

              {/* External Cloud Syncing Indicator Stamp */}
              <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-wider">
                🌍 Live Global Feed Update Active
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;