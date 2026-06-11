import React, { useState, useRef } from "react";
// FIX: Using the package root module export safely to prevent sub-path compilation crashes
import { PDFDocument } from "pdf-lib";

function PdfSplitter() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSelection, setPageSelection] = useState(""); // Dynamic range configuration string e.g., "1, 3, 5-7"
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitSuccess, setSplitSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Parse human-readable memory limits into standard megabytes string
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Initialize uploaded asset variables and extract baseline page metrics safely
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Invalid file format. Please upload standard PDF files only.");
        return;
      }

      try {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);
        fileReader.onload = async (event) => {
          // Pass ignoreBadInjections wrapper safely to handle corrupted files seamlessly
          const pdfDoc = await PDFDocument.load(event.target.result, { ignoreBadInjections: true });

          setFile(selectedFile);
          setTotalPages(pdfDoc.getPageCount());
          setPageSelection(""); // Reset prior input fields
          setSplitSuccess(false);
        };
      } catch (error) {
        console.error("Error reading PDF metadata structures:", error);
        alert("Failed to read PDF structure. Ensure the file is not encrypted.");
      }
    }
  };

  // Helper logic to parse user strings (e.g., "1, 2, 4-6") into an array of absolute page integers
  const parsePageSelection = (selectionStr, maxPages) => {
    const pages = new Set();
    const tokens = selectionStr.split(",");

    for (let token of tokens) {
      token = token.trim();
      if (!token) continue;

      if (token.includes("-")) {
        // Handle dash ranged series operations e.g., "4-7"
        const parts = token.split("-");
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);

        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let p = start; p <= end; p++) {
            if (p >= 1 && p <= maxPages) pages.add(p);
          }
        }
      } else {
        // Handle standalone index integers
        const p = parseInt(token, 10);
        if (!isNaN(p) && p >= 1 && p <= maxPages) pages.add(p);
      }
    }

    // Sort page coordinates logically and convert out to 0-indexed array pointers matching Javascript parameters
    return Array.from(pages).sort((a, b) => a - b).map(p => p - 1);
  };

  // Core background extraction pipeline execution block
  const splitPdfDocument = async () => {
    if (!file || !pageSelection.trim()) {
      alert("Please enter a valid page selection sequence first.");
      return;
    }
    setIsProcessing(true);

    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const srcArrayBuffer = e.target.result;

        const srcPdfDoc = await PDFDocument.load(srcArrayBuffer, { ignoreBadInjections: true });
        const newPdfDoc = await PDFDocument.create();

        // Map textual entries down to standard zero-indexed keys array
        const targetPageIndices = parsePageSelection(pageSelection, totalPages);

        if (targetPageIndices.length === 0) {
          alert("No matching page numbers found within current document limits.");
          setIsProcessing(false);
          return;
        }

        // Isolate page instances and append them cleanly onto the new separate document layer
        const copiedPages = await newPdfDoc.copyPages(srcPdfDoc, targetPageIndices);
        copiedPages.forEach((page) => newPdfDoc.addPage(page));

        // Save generated stream assets and perform local browser download action parameters
        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        const originalName = file.name.substring(0, file.name.lastIndexOf("."));
        link.download = `${originalName}_split_extracted.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setSplitSuccess(true);
        setIsProcessing(false);
      };
    } catch (error) {
      console.error("PDF Splitting Lifecycle Error Block:", error);
      alert("An unexpected error occurred while splitting the PDF document.");
      setIsProcessing(false);
    }
  };

  // Flush operational values back to baseline default parameters
  const resetAll = () => {
    setFile(null);
    setTotalPages(0);
    setPageSelection("");
    setSplitSuccess(false);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4">

        {/* Main Interface Box Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Content Layout Headers */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ✂️ CSC Document Studio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart PDF Splitter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Extract specific single pages or a precise range of pages from any bulk PDF document instantly.
            </p>
          </div>

          {!file ? (
            /* Upload file framework workspace layer components */
            <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-12 text-center transition-all duration-300">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl mb-3 group-hover:rotate-12 transition duration-300">✂️</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  Click here or Drag & Drop PDF to Split
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Supports multi-page PDF document uploads
                </p>
              </div>
            </div>
          ) : (
            /* Active Functional Management Console Panel Dashboard Grid */
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-6">

              {/* Target operational parameters details container banner card */}
              <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl">📕</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      Pages Detected: <span className="text-[#0B4AA2] font-black">{totalPages} Pages</span> ({formatSize(file.size)})
                    </p>
                  </div>
                </div>
                {!isProcessing && (
                  <button onClick={resetAll} className="text-slate-400 hover:text-red-500 font-bold px-2 text-sm transition">
                    ✕
                  </button>
                )}
              </div>

              {/* Input values console interface parameters controls fields */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  🎯 Enter Pages to Extract (e.g. 1, 3, 5-8)
                </label>
                <input
                  type="text"
                  value={pageSelection}
                  onChange={(e) => setPageSelection(e.target.value)}
                  placeholder="e.g. 1, 3, 5-8"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-extrabold px-4 py-3 rounded-xl focus:outline-none focus:border-[#0B4AA2] focus:bg-white text-base transition"
                />

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] font-semibold text-slate-400">
                  <span>💡 <strong>Isolated Elements:</strong> <code className="text-slate-600 bg-slate-100 px-1 rounded">1, 3</code> (Page 1 and 3)</span>
                  <span>💡 <strong>Ranged Sequence:</strong> <code className="text-slate-600 bg-slate-100 px-1 rounded">5-8</code> (Pages 5, 6, 7, and 8)</span>
                </div>
              </div>

              {/* Progress Bar loader visualizations trackers */}
              {isProcessing && (
                <div className="space-y-2 pt-2 animate-pulse">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <span>⚙️ Slicing target asset page frames...</span>
                    <span>Processing</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-[#0B4AA2] h-full w-2/3 rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Trigger operational buttons row footer panel controls layout */}
              <div className="flex flex-wrap gap-3">
                {!splitSuccess ? (
                  <button
                    onClick={splitPdfDocument}
                    disabled={isProcessing || !pageSelection.trim()}
                    className={`w-full font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                      ${isProcessing || !pageSelection.trim() ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"}
                    `}
                  >
                    🚀 Split & Extract Pages
                  </button>
                ) : (
                  <div className="w-full space-y-3">
                    <div className="w-full bg-green-50 border border-green-200 p-4 rounded-xl text-center text-green-800 text-sm font-bold">
                      🎉 Pages extracted and document file downloaded successfully!
                    </div>
                    <button
                      onClick={resetAll}
                      className="w-full bg-slate-200 text-slate-600 font-bold px-5 py-3 rounded-xl hover:bg-slate-300 transition text-sm text-center"
                    >
                      Extract Another Page Range
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Operational privacy layout warning framework block notice info tags */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Splitting operations compute instantly entirely inside local volatile browser system parameters. Confidential client legal documents are protected under local structural isolation rules with zero network logs.
          </div>

        </div>
      </div>
    </div>
  );
}

export default PdfSplitter;