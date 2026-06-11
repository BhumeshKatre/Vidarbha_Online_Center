import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeSuccess, setMergeSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Helper utility to convert raw file sizes into readable formatting strings
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Process incoming file arrays from the device file system pick trigger
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Filter to ensure incoming payloads match strict system type requirements
    const validPdfFiles = selectedFiles.filter(file => file.type === "application/pdf");

    if (validPdfFiles.length !== selectedFiles.length) {
      alert("Some selected files were skipped. Please upload standard PDF documents only.");
    }

    // Append newly selected assets safely to the existing array stack
    setFiles((prevFiles) => [...prevFiles, ...validPdfFiles]);
    setMergeSuccess(false);
  };

  // Remove a specific individual file object container from the active stack array
  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    setMergeSuccess(false);
  };

  // Rearrange positioning layout configurations manually up the array chain
  const moveFileUp = (index) => {
    if (index === 0) return; // Already at the top boundaries
    setFiles((prevFiles) => {
      const updated = [...prevFiles];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return updated;
    });
  };

  // Rearrange positioning layout configurations manually down the array chain
  const moveFileDown = (index) => {
    if (index === files.length - 1) return; // Already at the baseline boundaries
    setFiles((prevFiles) => {
      const updated = [...prevFiles];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated;
    });
  };

  // Main background core computational compilation compilation layout architecture rules loop
  const mergePdfDocuments = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files to initiate the merge pipeline.");
      return;
    }
    setIsMerging(true);

    try {
      // Create a brand new completely empty master document container framework 
      const mergedPdfDoc = await PDFDocument.create();

      // Sequentially map each dynamic upload buffer through independent processing arrays
      for (const file of files) {
        const fileArrayBuffer = await file.arrayBuffer();
        const sourcePdfDoc = await PDFDocument.load(fileArrayBuffer, { 
          ignoreBadInjections: true 
        });

        // Pull active layout pages integers sequentially out from the loop document instance
        const pageIndices = sourcePdfDoc.getPageIndices();
        const copiedPages = await mergedPdfDoc.copyPages(sourcePdfDoc, pageIndices);
        
        // Append processed page boundaries cleanly onto the final structural collection layer
        copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
      }

      // Export array buffers data metrics out onto a concrete local system automatic trigger save script
      const mergedPdfBytes = await mergedPdfDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `csc_merged_document_${Date.now()}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMergeSuccess(true);
      setIsMerging(false);
    } catch (error) {
      console.error("PDF Merging Pipeline Runtime Error Configuration:", error);
      alert("An unexpected layout mapping error occurred while compiling the PDF files.");
      setIsMerging(false);
    }
  };

  // Flush systemic internal memory hooks clean back to target zero states
  const resetAll = () => {
    setFiles([]);
    setMergeSuccess(false);
    setIsMerging(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Main Application Container Card Layout */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Main Display Headers section */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🔗 CSC Document Studio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart PDF Merger
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Combine multiple separate PDF files sequentially into a single organized document instantly.
            </p>
          </div>

          {/* Interactive operational upload entry points wrapper */}
          <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center transition-all duration-300 mb-8">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl mb-2 group-hover:scale-110 transition duration-300">🔗</span>
              <p className="text-slate-700 font-bold text-sm sm:text-base">
                Click here or Select Multiple PDFs to Join
              </p>
              <p className="text-slate-400 text-xs mt-1">
                You can add more files continuously at any time
              </p>
            </div>
          </div>

          {/* Render Active processing Document stack workspace lists */}
          {files.length > 0 && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Selected PDF Sequence Order ({files.length} Files)
              </span>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border border-slate-200 p-3 px-4 rounded-xl shadow-sm transition hover:border-slate-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl">📄</span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{formatSize(file.size)}</p>
                      </div>
                    </div>

                    {/* Sequential control and action button array panels */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveFileUp(index)}
                        disabled={index === 0}
                        className={`p-1.5 rounded-lg text-xs font-bold transition border ${index === 0 ? 'text-slate-200 border-slate-100 cursor-not-allowed' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFileDown(index)}
                        disabled={index === files.length - 1}
                        className={`p-1.5 rounded-lg text-xs font-bold transition border ${index === files.length - 1 ? 'text-slate-200 border-slate-100 cursor-not-allowed' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-red-500 border border-transparent hover:border-red-100 hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress animation component block loaders views */}
              {isMerging && (
                <div className="space-y-2 pt-2 animate-pulse">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <span>⚙️ Compiling and re-linking document pages data tables...</span>
                    <span>Processing</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-[#0B4AA2] h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Action operational execution footer rows panels */}
              <div className="flex flex-wrap gap-3 pt-3">
                {!mergeSuccess ? (
                  <button
                    onClick={mergePdfDocuments}
                    disabled={isMerging || files.length < 2}
                    className={`flex-1 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                      ${isMerging || files.length < 2 ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"}
                    `}
                  >
                    🚀 Combine & Merge PDFs
                  </button>
                ) : (
                  <div className="w-full bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between text-green-800">
                    <span className="text-xs sm:text-sm font-bold">🎉 Files compiled and unified document downloaded successfully!</span>
                    <button
                      onClick={resetAll}
                      className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-green-700 transition"
                    >
                      Clear Stack / Start New
                    </button>
                  </div>
                )}
                
                {!isMerging && (
                  <button
                    onClick={resetAll}
                    className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm"
                  >
                    Reset List
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Operational privacy layout context warning guidelines banner */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> Combining data layouts executes natively inside sandboxed client browser structures. Your document elements are safe, isolated, and processed completely offline with zero server logs.
          </div>

        </div>
      </div>
    </div>
  );
}

export default PdfMerger;