import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toolsData } from "../Data/toolsData";

const ToolsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // डेटा में से सभी यूनीक कैटेगरीज निकालना (फिल्टर टैब्स बनाने के लिए)
  const categories = ["All", ...new Set(toolsData.map((tool) => tool.category))];

  // सर्च (Title, Category, और Tags) और कैटेगरी टैब के आधार पर फिल्टर करना
  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory && tool.status === "active";
  });

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-blue-200">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0B4AA2] to-blue-700 text-white py-20 relative overflow-hidden">
        {/* बैकग्राउंड डिज़ाइन एलिमेंट्स */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50/10 rounded-full blur-xl"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="bg-white/20 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
            🚀 SmartBox Tools Collection
          </span>

          <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight">
            Free Online CSC Tools
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-sm md:text-lg text-blue-100 font-medium">
            कंप्यूटर फाइल्स कन्वर्ट करें, इमेज कंप्रेस और क्रॉप करें, उम्र निकालें और अपने सेंटर के काम की स्पीड को 10 गुना बढ़ाएं।
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-10 px-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <span className="pl-5 text-xl text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="टूल का नाम या कीवर्ड सर्च करें... (जैसे: pdf, photo, crop)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-4 text-gray-800 outline-none font-medium text-base placeholder-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="pr-5 text-sm font-bold text-slate-400 hover:text-slate-600 transition"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="-mt-10 relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0B4AA2]">
                {toolsData.length}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Total Tools
              </p>
            </div>
            <div className="border-x border-slate-100">
              <h3 className="text-2xl sm:text-4xl font-black text-green-600">
                100%
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Free & Safe
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-orange-500">
                ⚡ Fast
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Browser Based
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs Filter Section (नया फीचर) */}
      <section className="pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition border ${selectedCategory === cat
                    ? "bg-[#0B4AA2] text-white border-[#0B4AA2] shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
              >
                {cat === "All" ? "📁 All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Sub-Header */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {selectedCategory === "All" ? "Explore All Tools" : `${selectedCategory} Tools`}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Showing {filteredTools.length} functional utilities
            </p>
          </div>
        </div>
      </section>

      {/* Premium Dynamic Tools Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">

          {filteredTools.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-md mx-auto mt-10">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-700 mt-3">कोई टूल नहीं मिला</h3>
              <p className="text-slate-400 text-sm mt-1">कृपया स्पेलिंग जांचें या दूसरा कीवर्ड सर्च करें।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* इमेज की जगह नया मॉडर्न आइकॉन कंटेनर बॉक्स */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:from-blue-600 group-hover:to-[#0B4AA2] group-hover:text-white transition-all duration-300 mb-4">
                      {tool.icon || "🛠️"}
                    </div>

                    {/* Category Label */}
                    <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {tool.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-2 group-hover:text-[#0B4AA2] transition duration-200 line-clamp-1">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 mt-2 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <Link
                    to={tool.toolPath}
                    className="block w-full mt-6 bg-slate-50 group-hover:bg-[#0B4AA2] text-slate-700 group-hover:text-white py-3 rounded-xl font-bold text-xs sm:text-sm text-center border border-slate-100 group-hover:border-[#0B4AA2] shadow-sm active:scale-[0.98] transition-all duration-200"
                  >
                    Open Tool →
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default ToolsPage;