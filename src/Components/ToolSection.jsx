import React from "react";
import { Link } from "react-router-dom";
import { toolsData } from "../Data/toolsData";

function ToolsSection() {
  const featuredTools = toolsData.filter(
    (tool) => tool.featured
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#0B4AA2]">
            Popular Tools
          </h2>

          <Link
            to="/tools"
            className="text-[#0B4AA2] font-semibold hover:text-green-600"
          >
            View All →
          </Link>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={tool.image}
                alt={tool.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {tool.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {tool.description}
                </p>

                <Link
                  to={`/tools/${tool.slug}`}
                  className="block w-full mt-4 bg-[#0B4AA2] text-white py-2 rounded-lg text-center hover:bg-green-600 transition"
                >
                  Open Tool
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ToolsSection;