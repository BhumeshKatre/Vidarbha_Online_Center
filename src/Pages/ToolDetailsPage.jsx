import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toolsData } from "../Data/toolsData";

// Active operational tool component imports from your Tools directory
import ImageCompressor from "../Tools/ImageCompressor";
import ImageResizer from "../Tools/ImageResizer";
import BarcodeGenerator from "../Tools/BarcodeGenerator";
import PdfToWord from "../Tools/PdfToWord";
import PdfCompressor from "../Tools/PdfCompressor";
import PdfSplitter from "../Tools/PdfSplitter";
import PdfMerger from "../Tools/PdfMerger";
import AgeCalculator from "../Tools/AgeCalculator";
import AadhaarPhotoMaker from "../Tools/AadhaarPhotoMaker";
import JpgToPdf from "../Tools/JpgToPdf";
import ImageCropper from "../Tools/ImageCropper";

// Object map matching tool slugs directly to their active functional component views
const TOOL_COMPONENTS = {
  "image-compressor": <ImageCompressor />,
  "image-resizer": <ImageResizer />,
  "barcode-generator": <BarcodeGenerator />,
  "pdf-to-word": <PdfToWord />,
  "pdf-compressor": <PdfCompressor />,
  "pdf-splitter": <PdfSplitter />,
  "pdf-merger": <PdfMerger />,
  "age-calculator": <AgeCalculator />,
  "aadhaar-photo-maker": <AadhaarPhotoMaker />,
  "jpg-to-pdf": <JpgToPdf />,
  "crop-image": <ImageCropper />
};

const ToolDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find target matching record from data arrays configuration using the URL slug
  const tool = toolsData.find((item) => item.slug === slug);

  // Fallback view state if the requested tool slug is not found in the collection index
  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <span className="text-5xl">🔍</span>
        <h1 className="text-3xl font-black text-slate-800 mt-4">Tool Configuration Missing</h1>
        <p className="text-slate-400 text-sm mt-1">The requested link module path does not exist inside our system index records.</p>
        <Link to="/tools" className="mt-6 bg-[#0B4AA2] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md">
          ← Return to Dashboard
        </Link>
      </div>
    );
  }

  // Filter out relevant utilities matching identical structural categories to map on sidebar rows
  const relatedTools = toolsData
    .filter((item) => item.category === tool.category && item.id !== tool.id && item.status === "active")
    .slice(0, 6);

  // Fallback structural list extraction if primary category matching returns empty frames
  const fallbackTools = toolsData
    .filter((item) => item.id !== tool.id && item.status === "active")
    .slice(0, 6);

  const sidebarItems = relatedTools.length > 0 ? relatedTools : fallbackTools;

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-blue-200">

      {/* Top Breadcrumb Navigation Dashboard Module Bar */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400">
            <Link to="/tools" className="hover:text-[#0B4AA2] transition">Tools</Link>
            <span>/</span>
            <span className="text-slate-500 uppercase text-[11px] bg-slate-100 px-2 py-0.5 rounded-md tracking-wider">{tool.category}</span>
            <span>/</span>
            <span className="text-slate-700 font-extrabold truncate max-w-[180px]">{tool.title}</span>
          </div>

          <Link to="/tools" className="text-xs sm:text-sm font-black text-[#0B4AA2] hover:text-green-600 transition flex items-center gap-1">
            ← Main Menu
          </Link>
        </div>
      </div>

      {/* Main Structural Layout Splitter Workspace Grid Framework */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT PANEL COLUMN WRAPPER: Renders Active Live Tool Components Dynamic Canvas Frame (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-2 bg-gradient-to-b from-slate-50 to-white">

              {/* Dynamic instantiation selector processing check layout mapping */}
              {TOOL_COMPONENTS[tool.slug] ? (
                <div className="animate-fadeIn">
                  {TOOL_COMPONENTS[tool.slug]}
                </div>
              ) : (
                /* Fallback development placeholder card notice block info tags */
                <div className="bg-white rounded-2xl p-12 border border-slate-200 border-dashed text-center">
                  <div className="w-16 h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-4 border border-blue-100">
                    {tool.icon || "🛠️"}
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">{tool.title} Component Ready</h2>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                    This interface core code layout architecture file block is connected and tracking cleanly under routing frameworks.
                  </p>
                  <div className="mt-6 inline-flex gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-500">
                    <div>
                      <p><strong>Slug Entry:</strong> {tool.slug}</p>
                      <p className="mt-0.5"><strong>Target Path Location:</strong> {tool.toolPath}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT PANEL COLUMN WRAPPER: Sticky Interactive Control Sidebar Shortcut Links Navigation Lists (4 Columns) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">

            {/* Context meta properties details reference display block card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] bg-blue-50 border border-blue-100 text-[#0B4AA2] px-2.5 py-0.5 rounded-md font-black uppercase tracking-wider">
                System Active
              </span>
              <h2 className="text-lg font-black text-slate-800 mt-2 flex items-center gap-2">
                <span>{tool.icon || "⚙️"}</span> {tool.title}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-2 leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-500">
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">🛡️ Browser Sandbox</div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">🚀 0% Cloud Logs</div>
              </div>
            </div>

            {/* Sidebar shortcut link navigation list map block row containers */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Related Quick Links</span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{tool.category}</span>
              </h3>

              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.toolPath}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/20 shadow-sm transition-all duration-200 group"
                  >
                    {/* Compact dynamic icon badge mapping layouts */}
                    <div className="w-9 h-9 bg-slate-50 border border-slate-200 group-hover:bg-[#0B4AA2] group-hover:text-white rounded-lg flex items-center justify-center text-lg transition duration-200 shrink-0 shadow-sm">
                      {item.icon || "🛠️"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#0B4AA2] transition truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <span className="text-slate-300 group-hover:text-[#0B4AA2] transition pl-1 text-xs shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support notification micro-card panel element widgets */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 text-7xl opacity-10 font-bold select-none">CSC</div>
              <h4 className="text-sm font-extrabold tracking-wide">Need complete reset?</h4>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                If inputs freeze during rapid operations, click the back layout navigation links row parameters to reload clean instances.
              </p>
              <button
                onClick={() => navigate("/tools")}
                className="mt-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                View Complete Catalog
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ToolDetailsPage;