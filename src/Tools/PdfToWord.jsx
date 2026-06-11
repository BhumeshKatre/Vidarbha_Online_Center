import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// FIX: Initialize the worker securely using a modern Web Worker Constructor URL from local cache
const workerUrl = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

function PdfToWord() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertSuccess, setConvertSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Helper utility function to parse bytes into readable megabyte metrics
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Process incoming file stream configurations via file picker inputs
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Invalid file format. Please upload standard PDF documents only.");
        return;
      }
      setFile(selectedFile);
      setConvertSuccess(false);
      setProgress(0);
    }
  };

  // Main operational lifecycle to convert document nodes into text streams
  const convertPdfToWord = async () => {
    if (!file) return;
    setIsConverting(true);
    setProgress(10); // Set baseline initiation progress value

    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);

        // FIX: Wrap typedarray inside an object configuration under 'data' key for modern pdfjs-dist matching
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const totalPages = pdf.numPages;
        let fullText = "";

        // Iterate sequentially through each document layout frame mapping strings
        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          // Map standalone coordinate text arrays back into grouped unified lines
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n";

          // Calculate incremental progress metrics sequentially 
          const currentProgress = Math.floor((i / totalPages) * 80) + 10;
          setProgress(currentProgress);
        }

        setProgress(95);
        generateWordDocument(fullText);
      };
    } catch (error) {
      console.error("PDF Parsing Lifecycle Error:", error);
      alert("Failed to parse the PDF document. Verify that the file is not corrupted or password protected.");
      setIsConverting(false);
    }
  };

  // Render text blocks into formal HTML structured MS-Word document wrappers (.doc)
  const generateWordDocument = (textContent) => {
    // Generate fallback baseline payload if selectable text parameters are absent
    if (!textContent.trim()) {
      textContent = "This PDF contains no selectable structural text layers (It might be a scanned graphic image).";
    }

    // Embed content properties inside legal Office namespace schemas to safely preserve spacing breaks
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Converted Document</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        p { margin-bottom: 15px; white-space: pre-wrap; }
      </style>
      </head>
      <body>
        ${textContent.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '<br/>').join('')}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + htmlContent], {
      type: "application/msword;charset=utf-8",
    });

    // Create virtual target download endpoints and trigger auto-click execution blocks
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const originalName = file.name.substring(0, file.name.lastIndexOf("."));
    link.download = `${originalName}_csc_converted.doc`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setProgress(100);
    setIsConverting(false);
    setConvertSuccess(true);
  };

  // Reset module states back to target zero baselines
  const resetAll = () => {
    setFile(null);
    setConvertSuccess(false);
    setProgress(0);
    setIsConverting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4">

        {/* Main Application Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header Description */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🗂️ CSC Document Converter
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              PDF to Word Converter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Upload any PDF file and convert it into an editable Microsoft Word (.doc) document seamlessly.
            </p>
          </div>

          {/* Conditional Layout Board View wrapper */}
          {!file ? (
            <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-12 text-center transition-all duration-300">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition duration-300">📝</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  Click here or Drag & Drop PDF File
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Supports Standard digital PDF formats
                </p>
              </div>
            </div>
          ) : (
            /* File Action & Processing Monitor Panel */
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl">📕</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{formatSize(file.size)}</p>
                  </div>
                </div>
                {!isConverting && (
                  <button
                    onClick={resetAll}
                    className="text-slate-400 hover:text-red-500 font-bold px-2 text-sm transition"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Progress Tracker Status Bar Elements */}
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <span>⚙️ Processing Layout Lines...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${progress}%` }}
                      className="bg-gradient-to-r from-blue-500 to-[#0B4AA2] h-full transition-all duration-300 rounded-full"
                    ></div>
                  </div>
                </div>
              )}

              {/* Execution Operation Trigger Panels */}
              <div className="flex flex-wrap gap-3">
                {!convertSuccess ? (
                  <button
                    onClick={convertPdfToWord}
                    disabled={isConverting}
                    className={`flex-1 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                      ${isConverting ? "bg-blue-400 cursor-wait shadow-none" : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"}
                    `}
                  >
                    🚀 Convert PDF to Word
                  </button>
                ) : (
                  <div className="w-full bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between text-green-800">
                    <span className="text-sm font-bold">🎉 File converted and downloaded successfully!</span>
                    <button
                      onClick={resetAll}
                      className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-green-700 transition"
                    >
                      Convert New File
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Practical Informational Workspace Guidelines */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            💡 <strong>Pro CSC Operating Notice:</strong> This converter operates on selectable text layouts (digitally typed PDFs). If your source PDF is an un-scanned photo capture from a smartphone camera, use our **Image to Text (OCR)** utility to parse the text values cleanly.
          </div>

        </div>
      </div>
    </div>
  );
}

export default PdfToWord;