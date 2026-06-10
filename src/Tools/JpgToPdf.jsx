import React, { useState } from "react";
import { jsPDF } from "jspdf";

function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [pageSize, setPageSize] = useState("a4"); // a4, or original
  const [orientation, setOrientation] = useState("p"); // p = portrait, l = landscape
  const [isConverting, setIsConverting] = useState(false);

  // फाइल्स सिलेक्ट करने पर स्टेट अपडेट करना
  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  // किसी सिंगल फाइल को लिस्ट से हटाने के लिए
  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // पूरी लिस्ट क्लियर करने के लिए
  const clearAll = () => {
    setFiles([]);
  };

  // इमेज को बेस64 फॉर्मेट में बदलने का हेल्पर फंक्शन
  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // मुख्य कन्वर्शन फंक्शन
  const convertToPdf = async () => {
    if (files.length === 0) return;
    setIsConverting(true);

    try {
      // jsPDF का नया इंस्टेंस बनाना
      // 'pt' (points) कैलकुलेशन के लिए सबसे सटीक यूनिट है
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "pt",
        format: pageSize,
      });

      for (let i = 0; i < files.length; i++) {
        const fileDataUrl = await fileToDataURL(files[i]);
        
        // इमेज के ऑरिजनल डाइमेंशन्स पता करना
        const img = new Image();
        img.src = fileDataUrl;
        
        await new Promise((resolve) => {
          img.onload = () => resolve();
        });

        // PDF पेज की चौड़ाई और लम्बाई निकालना
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        let imgWidth = img.width;
        let imgHeight = img.height;

        // इमेज को PDF पेज के साइज के अनुसार स्केल (अनुपात में सेट) करना
        const widthRatio = pdfWidth / imgWidth;
        const heightRatio = pdfHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);

        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;

        // इमेज को पेज के सेंटर में अलाइन करने के लिए मार्जिन कैलकुलेट करना
        const xMargin = (pdfWidth - finalWidth) / 2;
        const yMargin = (pdfHeight - finalHeight) / 2;

        // अगर पहला पेज नहीं है, तो नया पेज जोड़ें
        if (i > 0) {
          pdf.addPage(pageSize, orientation);
        }

        // PDF में इमेज इन्सर्ट करना
        pdf.addImage(fileDataUrl, "JPEG", xMargin, yMargin, finalWidth, finalHeight);
      }

      // डिजिटल सेवा / सेंटर के नाम से फाइल सेव करना
      pdf.save(`CSC_Document_${Date.now()}.pdf`);
    } catch (error) {
      console.error("PDF Conversion Error:", error);
      alert("फाइल कन्वर्ट करने में कुछ दिक्कत आई, कृपया दोबारा प्रयास करें।");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🛠️ CSC Utility Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              JPG to PDF Converter
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              अपनी JPG या PNG इमेजेस को अपलोड करें और उन्हें एक सिंगल हाई-क्वालिटी PDF फाइल में सुरक्षित कन्वर्ट करें।
            </p>
          </div>

          {/* Settings / Format Selection Grid */}
          <div className="grid sm:grid-cols-2 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
            
            {/* Page Size Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                📄 Page Format (पेज साइज)
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] transition"
              >
                <option value="a4">Standard A4 Size</option>
                <option value="letter">Letter Size</option>
                <option value="legal">Legal Size (बॉन्ड पेपर)</option>
              </select>
            </div>

            {/* Page Orientation Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                🔄 Orientation (दिशा)
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] transition"
              >
                <option value="p">Portrait (खड़ा पेज)</option>
                <option value="l">Landscape (आड़ा पेज)</option>
              </select>
            </div>

          </div>

          {/* Upload Dropzone / Input Area */}
          <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center transition-all duration-300">
            <input
              type="file"
              multiple
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl mb-3 group-hover:scale-110 transition duration-300">📸</span>
              <p className="text-slate-700 font-bold text-sm sm:text-base">
                Click here or Drag & Drop Images
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Supports JPG, JPEG, PNG formats only
              </p>
            </div>
          </div>

          {/* Selected Files Preview List */}
          {files.length > 0 && (
            <div className="mt-8 border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-4">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-4 bg-green-500 rounded-full"></span>
                  Selected Files ({files.length})
                </h3>
                <button
                  onClick={clearAll}
                  className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline transition"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50/80 hover:bg-slate-50 p-3 rounded-xl border border-slate-100 group transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-bold bg-slate-200 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-500 font-bold px-2 py-1 text-sm transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={convertToPdf}
              disabled={files.length === 0 || isConverting}
              className={`w-full font-bold px-6 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                ${
                  files.length === 0
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : isConverting
                    ? "bg-blue-400 cursor-wait shadow-none"
                    : "bg-[#0B4AA2] hover:bg-blue-800 shadow-blue-900/10"
                }
              `}
            >
              {isConverting ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Converting Files...
                </>
              ) : (
                <>🔒 Convert & Download PDF</>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default JpgToPdf;