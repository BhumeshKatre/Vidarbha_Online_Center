import React from "react";
import { Link } from "react-router-dom";
import { toolsData } from "../Data/toolsData";

function ToolsSection() {
  // केवल सक्रिय और फ़ीचर्ड टूल्स को फ़िल्टर करना
  const featuredTools = toolsData.filter(
    (tool) => tool.featured && tool.status === "active"
  );

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading Dashboard */}
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0B4AA2] tracking-tight">
              Popular Utilities & Tools
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              सरकारी फॉर्म्स और एडिटिंग कार्यों को आसान बनाने वाले टूल्स
            </p>
          </div>

          <Link
            to="/tools"
            className="text-[#0B4AA2] font-bold text-sm bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl shadow-sm hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
          >
            View All Tools →
          </Link>
        </div>

        {/* Dynamic Premium Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.slice(0, 4).map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image की जगह नया आइकॉन बॉक्स कंटेनर */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:from-blue-600 group-hover:to-[#0B4AA2] group-hover:text-white transition-all duration-300 mb-5">
                  {tool.icon || "🛠️"}
                </div>

                {/* Category Small Tag */}
                <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {tool.category}
                </span>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-slate-800 mt-2 group-hover:text-[#0B4AA2] transition duration-200 line-clamp-1">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Dynamic Action Button Wrapper */}
              <Link
                to={tool.toolPath}
                className="block w-full mt-6 bg-[#0B4AA2] text-white py-2.5 rounded-xl font-bold text-sm text-center hover:bg-green-600 shadow-md shadow-blue-950/5 active:scale-[0.98] transition-all duration-200"
              >
                Open Tool
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ToolsSection;