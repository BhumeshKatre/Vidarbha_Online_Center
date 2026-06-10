import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";

function BarcodeGenerator() {
  const [text, setText] = useState("CSC123456"); // डिफ़ॉल्ट टेक्स्ट
  const [format, setFormat] = useState("CODE128"); // बारकोड फॉर्मेट प्रकार
  const [displayValue, setDisplayValue] = useState(true); // नीचे टेक्स्ट दिखाना या नहीं
  const [lineColor, setLineColor] = useState("#000000"); // बारकोड की लाइनों का रंग
  const [background, setBackground] = useState("#ffffff"); // बैकग्राउंड का रंग

  const barcodeRef = useRef(null);

  // जब भी कोई सेटिंग या टेक्स्ट बदले, बारकोड को तुरंत फिर से ड्रा (Render) करना
  useEffect(() => {
    if (barcodeRef.current && text.trim() !== "") {
      try {
        JsBarcode(barcodeRef.current, text, {
          format: format,
          displayValue: displayValue,
          lineColor: lineColor,
          background: background,
          width: 2, // लाइन की चौड़ाई
          height: 100, // बारकोड की ऊंचाई
          margin: 10
        });
      } catch (error) {
        console.error("Barcode Generation Error:", error);
      }
    }
  }, [text, format, displayValue, lineColor, background]);

  // बारकोड को SVG / PNG इमेज के रूप में डाउनलोड करने का फंक्शन
  const downloadBarcode = () => {
    if (!barcodeRef.current) return;

    const svgElement = barcodeRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    // इमेज ऑब्जेक्ट बनाकर उसे कैनवास पर ड्रा करना ताकि PNG डाउनलोड हो सके
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      // बारकोड के साइज के अनुसार कैनवास सेट करना
      canvas.width = svgElement.getBoundingClientRect().width * 2; // डबल साइज फॉर हाई क्वालिटी
      canvas.height = svgElement.getBoundingClientRect().height * 2;

      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2); // स्केल फॉर क्रिस्प क्वालिटी
      ctx.drawImage(image, 0, 0);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `csc_barcode_${text || "code"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    image.src = blobURL;
  };

  const resetAll = () => {
    setText("CSC123456");
    setFormat("CODE128");
    setDisplayValue(true);
    setLineColor("#000000");
    setBackground("#ffffff");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🏷️ CSC Utility Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Custom Barcode Generator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              कोई भी नंबर या टेक्स्ट टाइप करें और तुरंत उसका प्रोफेशनल बारकोड जनरेट करके हाई-क्वालिटी PNG फॉर्मेट में डाउनलोड करें।
            </p>
          </div>

          {/* Configuration Layout Split */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* Left Side: Controls & Inputs (7 Columns) */}
            <div className="md:col-span-7 space-y-6 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">

              {/* Text Input */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  📝 Enter Barcode Text / Number (डेटा दर्ज करें)
                </label>
                <input
                  type="text"
                  value={text}
                  maxLength={30}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="उदा. Receipt No, ID Number, CSC Code"
                  className="w-full bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold shadow-sm focus:outline-none focus:border-[#0B4AA2] transition text-base"
                />
              </div>

              {/* Advanced Settings Grid */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Format Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    📊 Barcode Format (प्रकार)
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-600 px-3 py-2.5 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] transition text-sm"
                  >
                    <option value="CODE128">CODE128 (Standard - Recommended)</option>
                    <option value="EAN13">EAN-13 (Product Codes)</option>
                    <option value="UPC">UPC (Retail Universal)</option>
                    <option value="CODE39">CODE39 (Alphanumeric)</option>
                    <option value="ITF14">ITF-14 (Shipping)</option>
                  </select>
                </div>

                {/* Display Value Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    👁️ Text Visibility (नीचे नंबर दिखाएं?)
                  </label>
                  <select
                    value={displayValue ? "yes" : "no"}
                    onChange={(e) => setDisplayValue(e.target.value === "yes")}
                    className="w-full bg-white border border-slate-200 text-slate-600 px-3 py-2.5 rounded-xl font-semibold shadow-sm focus:outline-none focus:border-[#0B4AA2] transition text-sm"
                  >
                    <option value="yes">Yes, Show Text Below</option>
                    <option value="no">No, Hide Text</option>
                  </select>
                </div>

                {/* Line Color Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    🎨 Bar Line Color (लाइनों का रंग)
                  </label>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-xl shadow-sm">
                    <input
                      type="color"
                      value={lineColor}
                      onChange={(e) => setLineColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0"
                    />
                    <span className="text-xs font-bold text-slate-600 uppercase">{lineColor}</span>
                  </div>
                </div>

                {/* Background Color Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    🖼️ Background Color (बैकग्राउंड रंग)
                  </label>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-xl shadow-sm">
                    <input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0"
                    />
                    <span className="text-xs font-bold text-slate-600 uppercase">{background}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Side: Live Studio Output Preview (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[320px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Live Barcode Preview</span>

                {/* Canvas Display Wrapper */}
                <div className="min-h-[160px] rounded-xl p-4 bg-white flex items-center justify-center border border-slate-200 shadow-inner overflow-x-auto">
                  {text.trim() !== "" ? (
                    <svg ref={barcodeRef} className="max-w-full block"></svg>
                  ) : (
                    <span className="text-xs text-slate-400 italic text-center px-4">
                      कृपया बारकोड जनरेट करने के लिए डेटा बॉक्स में कुछ टाइप करें।
                    </span>
                  )}
                </div>
              </div>

              {/* Trigger Options */}
              <div className="space-y-2 mt-6">
                <button
                  onClick={downloadBarcode}
                  disabled={text.trim() === ""}
                  className={`w-full font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                    ${text.trim() === ""
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-green-600 hover:bg-green-700 shadow-green-900/10"
                    }
                  `}
                >
                  💾 Download Barcode Image (PNG)
                </button>

                <button
                  onClick={resetAll}
                  className="w-full bg-slate-200 text-slate-600 font-bold px-5 py-3 transition text-sm rounded-xl hover:bg-slate-300"
                >
                  Reset Settings
                </button>
              </div>

            </div>

          </div>

          {/* Educational Notice Banner */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            💡 <strong>महत्वपूर्ण जानकारी (CSC Usage):</strong> `CODE128` सबसे आधुनिक और सुरक्षित बारकोड प्रकार है जो अक्षरों (Alphabets) और नंबरों (Digits) दोनों को सपोर्ट करता है। यदि आप केवल 13 अंकों का विशुद्ध नंबर इस्तेमाल कर रहे हैं, तो आप `EAN13` फॉर्मेट भी चुन सकते हैं।
          </div>

        </div>
      </div>
    </div>
  );
}

export default BarcodeGenerator;