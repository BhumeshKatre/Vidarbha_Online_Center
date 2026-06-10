import React, { useState, useRef } from "react";

function AadhaarPhotoMaker() {
  const [imageSrc, setImageSrc] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [preset, setPreset] = useState("passport"); // passport, aadhaar, custom

  // कस्टम डाइमेंशन्स (Pixels में)
  const [width, setWidth] = useState(350); // डिफ़ॉल्ट पासपोर्ट विड्थ (~3.5cm)
  const [height, setHeight] = useState(450); // डिफ़ॉल्ट पासपोर्ट हाइट (~4.5cm)

  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // प्रीसेट बदलने पर विड्थ और हाइट सेट करना
  const handlePresetChange = (selectedPreset) => {
    setPreset(selectedPreset);
    setPreviewSrc(""); // पुराना प्रीव्यू क्लियर करें

    if (selectedPreset === "passport") {
      setWidth(350); // 3.5cm x 4.5cm Ratio
      setHeight(450);
    } else if (selectedPreset === "aadhaar") {
      setWidth(413); // Official UIDAI Facially Cropped Ratio (~3.5cm x 3.5cm or similar aspect)
      setHeight(531);
    }
  };

  // फाइल अपलोड हैंडलर
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setPreviewSrc("");
      };
      reader.readAsDataURL(file);
    }
  };

  // HTML5 Canvas का उपयोग करके फोटो रीसाइज और जेनरेट करना
  const generatePhoto = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // कैनवास का साइज यूजर के सिलेक्टेड डाइमेंशन्स के बराबर सेट करना
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);

      // इमेज को बिना स्ट्रेच (खराब) किए सेंटर-क्रॉप करके कैनवास में फिट करना (Object-fit Cover Logic)
      const imgRatio = image.width / image.height;
      const canvasRatio = canvas.width / canvas.height;

      let sourceX = 0, sourceY = 0, sourceWidth = image.width, sourceHeight = image.height;

      if (imgRatio > canvasRatio) {
        // इमेज ज्यादा चौड़ी है
        sourceWidth = image.height * canvasRatio;
        sourceX = (image.width - sourceWidth) / 2;
      } else {
        // इमेज ज्यादा लंबी है
        sourceHeight = image.width / canvasRatio;
        sourceY = (image.height - sourceHeight) / 2;
      }

      // कैनवास पर ड्रा करना
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // बेस64 इमेज यूआरएल जेनरेट करना
      setPreviewSrc(canvas.toDataURL("image/jpeg", 0.95));
      setIsProcessing(false);
    };
  };

  // फोटो डाउनलोड करना
  const downloadPhoto = () => {
    if (!previewSrc) return;
    const link = document.createElement("a");
    link.href = previewSrc;
    link.download = `csc_${preset}_photo_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc("");
    setPreviewSrc("");
    setPreset("passport");
    setWidth(350);
    setHeight(450);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📸 CSC Studio Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Aadhaar & Passport Photo Maker
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              किसी भी साधारण फोटो को आधिकारिक पासपोर्ट साइज या आधार कार्ड के परफेक्ट साइज में बदलें।
            </p>
          </div>

          {/* Preset Selector Grid */}
          <div className="grid sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
            <button
              onClick={() => handlePresetChange("passport")}
              className={`p-4 rounded-xl font-bold text-sm transition text-center border ${preset === "passport"
                  ? "bg-[#0B4AA2] text-white border-[#0B4AA2] shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
            >
              💼 Passport Size <span className="block text-xs font-normal opacity-80 mt-0.5">(3.5 x 4.5 cm)</span>
            </button>

            <button
              onClick={() => handlePresetChange("aadhaar")}
              className={`p-4 rounded-xl font-bold text-sm transition text-center border ${preset === "aadhaar"
                  ? "bg-[#0B4AA2] text-white border-[#0B4AA2] shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
            >
              🆔 Aadhaar Card Size <span className="block text-xs font-normal opacity-80 mt-0.5">(Official UIDAI Formats)</span>
            </button>

            <button
              onClick={() => handlePresetChange("custom")}
              className={`p-4 rounded-xl font-bold text-sm transition text-center border ${preset === "custom"
                  ? "bg-[#0B4AA2] text-white border-[#0B4AA2] shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
            >
              ⚙️ Custom Dimensions <span className="block text-xs font-normal opacity-80 mt-0.5">(मनचाहा पिक्सल साइज)</span>
            </button>
          </div>

          {/* Custom Size Controls (Visible only when 'custom' is selected) */}
          {preset === "custom" && (
            <div className="grid grid-cols-2 gap-4 max-w-md bg-blue-50/50 p-4 border border-blue-100 rounded-xl mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Width (चौड़ाई px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => { setWidth(e.target.value); setPreviewSrc(""); }}
                  className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Height (ऊंचाई px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); setPreviewSrc(""); }}
                  className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]"
                />
              </div>
            </div>
          )}

          {/* Upload Input Area */}
          {!imageSrc ? (
            <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-12 text-center transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition duration-300">📸</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  Click or Drag Customer Photo
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Supports JPEG, JPG, PNG formats
                </p>
              </div>
            </div>
          ) : (
            /* Layout Grid for Source & Final Output */
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">

                {/* Left Side: Uploaded Image View */}
                <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Original Upload</span>
                    <div className="h-[300px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner">
                      <img ref={imgRef} src={imageSrc} alt="Uploaded" className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                  <button
                    onClick={generatePhoto}
                    disabled={isProcessing}
                    className="w-full mt-5 bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? "Processing..." : "⚡ Resize & Process Photo"}
                  </button>
                </div>

                {/* Right Side: Processed Output & Download */}
                <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Studio Ready Output</span>
                    <div className="h-[300px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner bg-checkered">
                      {previewSrc ? (
                        <div className="p-2 bg-white shadow-md rounded-sm border border-slate-300">
                          <img
                            src={previewSrc}
                            alt="Final Result"
                            style={{ width: `${width / 2}px`, height: `${height / 2}px`, maxWidth: "200px", maxHeight: "260px" }}
                            className="object-cover block"
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic text-center px-6">
                          बाईं तरफ दिए गए "Process Photo" बटन पर क्लिक करें।
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={downloadPhoto}
                      disabled={!previewSrc}
                      className={`flex-1 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                        ${!previewSrc ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-green-600 hover:bg-green-700 shadow-green-900/10"}
                      `}
                    >
                      💾 Download Photo
                    </button>
                    <button
                      onClick={resetAll}
                      className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm"
                    >
                      Reset
                    </button>
                  </div>
                </div>

              </div>

              {/* Tips Section */}
              <div className="bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
                💡 <strong>स्मार्ट कस्टमाइज लॉजिक (Smart Crop):</strong> यह टूल इमेज को खींचे (Stretch) बिना ऑटोमैटिकली केंद्र (Center) से क्रॉप करता है, जिससे ग्राहक का चेहरा बिल्कुल सीधा और सही अनुपात में रहेगा।
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AadhaarPhotoMaker;