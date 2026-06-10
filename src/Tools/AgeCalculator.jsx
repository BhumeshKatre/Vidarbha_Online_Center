import React, { useState } from "react";

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(
    new Date().toISOString().split("T")[0] // डिफ़ॉल्ट आज की तारीख
  );
  const [ageResult, setAgeResult] = useState(null);

  // उम्र कैलकुलेट करने का मुख्य लॉजिक
  const calculateAge = (e) => {
    e.preventDefault();
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert("जन्मतिथि (DOB) गणना की तारीख से बड़ी नहीं हो सकती!");
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    // अगर दिन माइनस में आ रहे हैं
    if (days < 0) {
      months--;
      // पिछले महीने के कुल दिन निकालना
      const previousMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += previousMonth.getDate();
    }

    // अगर महीने माइनस में आ रहे हैं
    if (months < 0) {
      years--;
      months += 12;
    }

    // कुल दिनों की संख्या (टोटल डेज लाइव) निकालने के लिए
    const totalDiffTime = Math.abs(target - birth);
    const totalDaysCount = Math.ceil(totalDiffTime / (1000 * 60 * 60 * 24));

    setAgeResult({
      years,
      months,
      days,
      totalDays: totalDaysCount,
    });
  };

  const resetAll = () => {
    setBirthDate("");
    setTargetDate(new Date().toISOString().split("T")[0]);
    setAgeResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-3xl mx-auto px-4">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📅 CSC Smart Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Precise Age Calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              सरकारी योजनाओं और भर्ती फॉर्म्स के लिए किसी भी व्यक्ति की सटीक उम्र (वर्ष, महीने, दिन) तुरंत निकालें।
            </p>
          </div>

          {/* Form Input Section */}
          <form onSubmit={calculateAge} className="grid sm:grid-cols-2 gap-6 mb-8">

            {/* Birth Date Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                👶 Date of Birth (जन्मतिथि)
              </label>
              <input
                type="date"
                value={birthDate}
                required
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] focus:bg-white transition"
              />
            </div>

            {/* Target Date Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                ⏱️ Age at the Date of (इस तारीख तक उम्र)
              </label>
              <input
                type="date"
                value={targetDate}
                required
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] focus:bg-white transition"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                (डिफ़ॉल्ट रूप से आज की तारीख सेट है)
              </p>
            </div>

            {/* Buttons inside form grid */}
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition text-center"
              >
                📊 Calculate Age
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="bg-slate-100 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-200 transition text-sm"
              >
                Reset
              </button>
            </div>

          </form>

          {/* Result Dashboard Section */}
          {ageResult && (
            <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-slate-50/50 p-6 sm:p-8">

              <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
                <span className="w-2 h-4 bg-green-500 rounded-full"></span>
                Calculated Result (उम्र का विवरण)
              </h3>

              {/* Main Numbers Grid */}
              <div className="grid grid-cols-3 gap-4 text-center mb-6">

                {/* Years Block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <span className="block text-3xl sm:text-4xl font-black text-[#0B4AA2]">
                    {ageResult.years}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                    Years (वर्ष)
                  </span>
                </div>

                {/* Months Block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <span className="block text-3xl sm:text-4xl font-black text-green-600">
                    {ageResult.months}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                    Months (महीने)
                  </span>
                </div>

                {/* Days Block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <span className="block text-3xl sm:text-4xl font-black text-orange-500">
                    {ageResult.days}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                    Days (दिन)
                  </span>
                </div>

              </div>

              {/* Extra Stats Summary List */}
              <div className="border border-slate-200 bg-white rounded-xl divide-y divide-slate-100 text-sm">
                <div className="flex justify-between p-3.5 px-4 items-center">
                  <span className="font-semibold text-slate-500">🗓️ Total Days Lived</span>
                  <span className="font-bold text-slate-800">{ageResult.totalDays.toLocaleString()} Days</span>
                </div>
                <div className="flex justify-between p-3.5 px-4 items-center">
                  <span className="font-semibold text-slate-500">💡 Status Check</span>
                  <span className="font-bold text-green-600 bg-green-50 px-3 py-0.5 rounded-full text-xs">
                    {ageResult.years >= 18 ? "Eligible Voter (18+)" : "Minor (<18)"}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;