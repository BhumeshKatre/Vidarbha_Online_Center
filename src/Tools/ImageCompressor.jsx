import React, { useState, useRef } from "react";

function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState("");
  const [compressedPreview, setCompressedPreview] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [targetSizeKB, setTargetSizeKB] = useState(100); // डिफॉल्ट 100KB
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  // फाइल साइज को सही फॉर्मेट (KB/MB) में दिखाने के लिए हेल्पर
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // इमेज सिलेक्ट होने पर हैंडलर
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("कृपया केवल इमेज फाइल (JPG, JPEG, PNG) ही अपलोड करें।");
        return;
      }
      setOriginalFile(file);
      setOriginalSize(file.size);
      setOriginalPreview(URL.createObjectURL(file));
      // पुराना कंप्रेस्ड डेटा क्लियर करें
      setCompressedPreview("");
      setCompressedSize(0);
    }
  };

  // मुख्य कंप्रेशन लॉजिक (Canvas का उपयोग करके)
  const compressImage = () => {
    if (!originalFile) return;
    setIsCompressing(true);

    const reader = new FileReader();
    reader.readAsDataURL(originalFile);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // ऑरिजनल डाइमेंशन्स रखना
        let width = img.width;
        let height = img.height;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // सही क्वालिटी ढूंढने के लिए लूप (Binary Search Mechanism)
        let minQuality = 0.01;
        let maxQuality = 0.99;
        let bestDataUrl = "";
        let bestSize = 0;
        const maxTargetBytes = targetSizeKB * 1024;

        // ५ बार इटरेशन करके बेस्ट क्वालिटी मैच ढूँढना जो टारगेट साइज से छोटी हो
        for (let i = 0; i < 5; i++) {
          const midQuality = (minQuality + maxQuality) / 2;
          // हमेशा JPEG फॉर्मेट में बदलेंगे ताकि कंप्रेशन सही से काम करे
          const dataUrl = canvas.toDataURL("image/jpeg", midQuality);

          // बेस64 स्ट्रिंग से लगभग बाइट साइज कैलकुलेट करना
          const stringLength = dataUrl.length - "data:image/jpeg;base64,".length;
          const currentSizeBytes = Math.floor(stringLength * (3 / 4));

          if (currentSizeBytes <= maxTargetBytes) {
            bestDataUrl = dataUrl;
            bestSize = currentSizeBytes;
            minQuality = midQuality; // साइज छोटा है, क्वालिटी थोड़ी और बढ़ा सकते हैं
          } else {
            maxQuality = midQuality; // साइज बड़ा हो गया, क्वालिटी कम करनी पड़ेगी
          }
        }

        // अगर लूप में कोई परफेक्ट मैच नहीं मिला, तो सबसे कम क्वालिटी वाला सेट कर देंगे
        if (!bestDataUrl) {
          bestDataUrl = canvas.toDataURL("image/jpeg", 0.1);
          const stringLength = bestDataUrl.length - "data:image/jpeg;base64,".length;
          bestSize = Math.floor(stringLength * (3 / 4));
        }

        setCompressedPreview(bestDataUrl);
        setCompressedSize(bestSize);
        setIsCompressing(false);
      };
    };
  };

  // कंप्रेस्ड फाइल डाउनलोड करने के लिए
  const downloadCompressedImage = () => {
    if (!compressedPreview) return;
    const link = document.createElement("a");
    link.href = compressedPreview;
    // ओरिजिनल नाम के साथ '_compressed' जोड़ना
    const originalName = originalFile.name.substring(0, originalFile.name.lastIndexOf("."));
    link.download = `${originalName}_csc_compressed.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setOriginalFile(null);
    setOriginalPreview("");
    setCompressedPreview("");
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Vidarbha Online Center 
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Image Compressor
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              सरकारी फॉर्म्स के लिए मनचाहे साइज (KB) में इमेज कंप्रेस करें। बिना क्वालिटी खराब किए तुरंत डाउनलोड करें।
            </p>
          </div>

          {/* Size Configuration Input */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8 max-w-md">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              🎯 Required Max Size (आवश्यक साइज KB में)
            </label>
            <div className="relative rounded-xl shadow-sm flex items-center bg-white border border-slate-200 overflow-hidden focus-within:border-[#0B4AA2] transition">
              <input
                type="number"
                value={targetSizeKB}
                onChange={(e) => setTargetSizeKB(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 font-bold text-slate-700 focus:outline-none text-base"
                placeholder="उदा. 50, 100, 200"
                min="1"
              />
              <span className="bg-slate-100 text-slate-500 font-bold px-4 py-3 text-sm border-l border-slate-200">
                KB
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1.5">
              आपकी कंप्रेस्ड इमेज इस साइज के अंदर ही तैयार होगी।
            </p>
          </div>

          {/* Upload Box */}
          {!originalFile ? (
            <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-10 text-center transition-all duration-300">
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition duration-300">🖼️</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  Click here or Drag & Drop Image
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Supports JPG, JPEG, PNG formats
                </p>
              </div>
            </div>
          ) : (
            /* Comparison Dashboard */
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">

                {/* Original Preview Card */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Original Image</span>
                  <div className="h-[200px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner">
                    <img src={originalPreview} alt="Original" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="mt-3 flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Size:</span>
                    <span className="font-bold text-slate-700">{formatSize(originalSize)}</span>
                  </div>
                </div>

                {/* Compressed Preview Card */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#0B4AA2] uppercase tracking-wider block">Compressed Image</span>
                    {compressedSize > 0 && (
                      <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Success
                      </span>
                    )}
                  </div>
                  <div className="h-[200px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner relative">
                    {compressedPreview ? (
                      <img src={compressedPreview} alt="Compressed" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-xs text-slate-400 italic">क्लिक करें कंप्रेस बटन पर...</span>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Size:</span>
                    <span className={`font-black ${compressedSize <= targetSizeKB * 1024 ? 'text-green-600' : 'text-red-500'}`}>
                      {compressedSize > 0 ? formatSize(compressedSize) : "---"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons inside Dashboard */}
              <div className="flex flex-wrap gap-3 pt-2">
                {!compressedPreview ? (
                  <button
                    onClick={compressImage}
                    disabled={isCompressing}
                    className="flex-1 min-w-[150px] bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                  >
                    {isCompressing ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Compressing...
                      </>
                    ) : (
                      "📉 Compress Image"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={downloadCompressedImage}
                    className="flex-1 min-w-[150px] bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    💾 Download Compressed Image
                  </button>
                )}

                <button
                  onClick={clearAll}
                  className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm"
                >
                  Reset / Change File
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ImageCompressor;