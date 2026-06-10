import React from "react";
import { useParams, Link } from "react-router-dom";
import { toolsData } from "../Data/toolsData";

const ToolDetailsPage = () => {
  const { slug } = useParams();

  const tool = toolsData.find(
    (item) => item.slug === slug
  );

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Tool Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="bg-[#0B4AA2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">

          <Link
            to="/tools"
            className="text-white/80 hover:text-white"
          >
            ← Back to Tools
          </Link>

          <h1 className="text-5xl font-bold mt-4">
            {tool.title}
          </h1>

          <p className="mt-4 text-xl text-white/90">
            {tool.description}
          </p>
        </div>
      </section>

      {/* Tool Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Image */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-md p-8">

              <h2 className="text-3xl font-bold text-[#0B4AA2]">
                About This Tool
              </h2>

              <p className="mt-4 text-gray-600">
                {tool.description}
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  ✅ Free to Use
                </div>

                <div className="flex items-center gap-3">
                  ⚡ Fast Processing
                </div>

                <div className="flex items-center gap-3">
                  🔒 Secure & Safe
                </div>

                <div className="flex items-center gap-3">
                  📱 Mobile Friendly
                </div>

              </div>

              <button
                className="mt-8 bg-[#0B4AA2] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Launch Tool
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Related Tools */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-8">
            Related Tools
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {toolsData
              .filter((item) => item.id !== tool.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/tools/${item.slug}`}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  <h3 className="font-semibold mt-3">
                    {item.title}
                  </h3>
                </Link>
              ))}

          </div>

        </div>
      </section>

    </div>
  );
};

export default ToolDetailsPage;