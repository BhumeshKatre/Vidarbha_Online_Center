import React, { useState, useEffect } from "react";

// ✅ FIX: Move the static object OUTSIDE the component function.
// This prevents it from being recreated on every render cycle.
const unitData = {
  length: {
    label: "📏 Length / Distance",
    units: [
      { code: "m", name: "Meter (मी)" },
      { code: "cm", name: "Centimeter (सेमी)" },
      { code: "km", name: "Kilometer (किमी)" },
      { code: "ft", name: "Feet (फीट)" },
      { code: "in", name: "Inch (इंच)" },
      { code: "mi", name: "Mile (मील)" }
    ],
    factors: { m: 1, cm: 100, km: 0.001, ft: 3.28084, in: 39.3701, mi: 0.000621371 }
  },
  weight: {
    label: "🏋️ Weight / Mass",
    units: [
      { code: "kg", name: "Kilogram (किग्रा)" },
      { code: "g", name: "Gram (ग्राम)" },
      { code: "lb", name: "Pound (पौंड)" },
      { code: "oz", name: "Ounce (औंस)" },
      { code: "q", name: "Quintal (क्विंटल)" }
    ],
    factors: { kg: 1, g: 1000, lb: 2.20462, oz: 35.274, q: 0.01 }
  },
  area: {
    label: "📐 Area / Land Space",
    units: [
      { code: "sqm", name: "Square Meter (वर्ग मी)" },
      { code: "sqft", name: "Square Feet (वर्ग फीट)" },
      { code: "acre", name: "Acre (एकड़)" },
      { code: "hectare", name: "Hectare (हेक्टेयर)" }
    ],
    factors: { sqm: 1, sqft: 10.7639, acre: 0.000247105, hectare: 0.0001 }
  },
  temperature: {
    label: "🌡️ Temperature",
    units: [
      { code: "C", name: "Celsius (°C)" },
      { code: "F", name: "Fahrenheit (°F)" },
      { code: "K", name: "Kelvin (K)" }
    ]
  }
};

function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState(null);

  // Effect 1: Reset drop menus when core operational categories change
  useEffect(() => {
    const defaultUnits = unitData[category].units;
    setFromUnit(defaultUnits[0].code);
    setToUnit(defaultUnits[1].code);
    setResult(null);
  }, [category]); // ✅ Warning Fixed! (unitData is now global and static)

  // Effect 2: Core conversion math runtime block logic
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      setResult(val);
      return;
    }

    if (category === "temperature") {
      let tempInCelsius = 0;
      if (fromUnit === "C") tempInCelsius = val;
      else if (fromUnit === "F") tempInCelsius = (val - 32) * (5 / 9);
      else if (fromUnit === "K") tempInCelsius = val - 273.15;

      let finalTemp = 0;
      if (toUnit === "C") finalTemp = tempInCelsius;
      else if (toUnit === "F") finalTemp = tempInCelsius * (9 / 5) + 32;
      else if (toUnit === "K") finalTemp = tempInCelsius + 273.15;

      setResult(parseFloat(finalTemp.toFixed(2)));
    } else {
      const categoryConfig = unitData[category];
      const baseValue = val / categoryConfig.factors[fromUnit];
      const targetValue = baseValue * categoryConfig.factors[toUnit];

      setResult(parseFloat(targetValue.toPrecision(6)));
    }
  }, [inputValue, fromUnit, toUnit, category]); // ✅ Warning Fixed!

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Interface Wrapper Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Layout Headings Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📐 CSC Engineering Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Universal Unit Converter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Convert between multi-standard units for length metrics, agricultural land measurements, weights, and temperature scales instantly.
            </p>
          </div>

          {/* Interactive Core Category Filter Selection Tabs Row */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200/60">
            {Object.keys(unitData).map((catKey) => (
              <button
                key={catKey}
                onClick={() => setCategory(catKey)}
                className={`flex-1 min-w-[110px] text-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${category === catKey ? "bg-[#0B4AA2] text-white shadow-md" : "text-slate-600 hover:text-slate-900"}`}
              >
                {unitData[catKey].label.split(" ")[0]} {catKey.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Core Calculation Controls Workspace Grid Splitting View */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* LEFT INPUT BLOCK: Handles Sizing Entry Forms Controls (7 Columns) */}
            <div className="md:col-span-7 space-y-5 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Dynamic Magnitude Metric Entry field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  📥 Enter Value (संख्या दर्ज करें)
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full bg-white border border-slate-200 text-slate-700 font-extrabold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2] text-base transition"
                  required
                />
              </div>

              {/* Unit Dropdown Menu Grids Mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 items-center">

                {/* Source Selection Parameter element drop block */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Convert From (यहाँ से)</label>
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 focus:outline-none focus:border-[#0B4AA2]">
                    {unitData[category].units.map((u) => (
                      <option key={u.code} value={u.code}>{u.name}</option>
                    ))}
                  </select>
                </div>

                {/* Instant Swap Axis Functional Module Interaction Button */}
                <div className="sm:col-span-1 text-center pt-3 sm:pt-4">
                  <button type="button" onClick={swapUnits} title="Swap Axis Units" className="w-9 h-9 mx-auto bg-white border border-slate-200 text-[#0B4AA2] hover:bg-[#0B4AA2] hover:text-white rounded-xl flex items-center justify-center text-sm shadow-sm transition active:scale-95">
                    🔃
                  </button>
                </div>

                {/* Target Destination Selection element drop block */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Convert To (यहाँ तक)</label>
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 focus:outline-none focus:border-[#0B4AA2]">
                    {unitData[category].units.map((u) => (
                      <option key={u.code} value={u.code}>{u.name}</option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* RIGHT PANEL: Outputs Computed Conversion Scales Visualization Monitor (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Conversion Balance Outcome
                </span>

                {result !== null && inputValue !== "" ? (
                  <div className="space-y-4 animate-fadeIn">

                    {/* Main highlight visual aggregate container box */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm border-b-4 border-b-green-500">
                      <span className="text-xs font-bold text-slate-400 uppercase block">Equivalent Generated Metric</span>
                      <span className="text-2xl sm:text-3xl font-black text-green-600 block mt-2 truncate px-1">
                        {result} <span className="text-xs font-bold text-slate-400 uppercase font-sans ml-0.5">{toUnit}</span>
                      </span>
                    </div>

                    {/* Math statement textual verification identifier label rows */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 px-4 text-xs font-bold text-slate-500 text-center shadow-sm">
                      <span className="text-slate-700">
                        {inputValue} {fromUnit} = {result} {toUnit}
                      </span>
                    </div>

                  </div>
                ) : (
                  <div className="h-[150px] rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center p-4 select-none">
                    <span className="text-xs text-slate-400 italic text-center leading-relaxed">
                      Enter measurement sizing details to evaluate relational conversion matrices automatically.
                    </span>
                  </div>
                )}
              </div>

              {/* Sandboxed pure client math validation label stamp */}
              <p className="text-[10px] text-slate-400 font-bold text-center mt-6 uppercase tracking-wider">
                🛡️ Pure Client-Side Safe Calculation Core
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UnitConverter;