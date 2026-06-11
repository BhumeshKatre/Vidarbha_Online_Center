import React, { useState, useRef } from "react";

function ImageResizer() {
  const [imageSrc, setImageSrc] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  // Operational states for handling dimensions
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  // Custom unit tracking setup: 'px', 'cm', or '%'
  const [unit, setUnit] = useState("px");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  // Standard DPI definition for precise Centimeter to Pixel conversions (300 DPI is the government form standard)
  const DPI = 300;
  const CM_TO_PX_FACTOR = DPI / 2.54; // ~118.11 pixels per cm

  // Helper utility to convert dimensions out to pure absolute pixels for canvas mapping
  const getAbsolutePixels = (value, currentUnit, isWidth) => {
    const numValue = parseFloat(value) || 0;
    if (currentUnit === "px") {
      return numValue;
    } else if (currentUnit === "cm") {
      return Math.round(numValue * CM_TO_PX_FACTOR);
    } else if (currentUnit === "%") {
      const baseDimension = isWidth ? originalWidth : originalHeight;
      return Math.round((numValue / 100) * baseDimension);
    }
    return numValue;
  };

  // Automatically compute proportional height values based on active lock structures
  const handleWidthChange = (e) => {
    const val = e.target.value;
    setWidth(val);

    if (lockAspectRatio && originalWidth > 0 && val !== "") {
      const parseFloatVal = parseFloat(val) || 0;
      if (unit === "%") {
        setHeight(val); // Proportional scale maps identical percentage limits to both sides
      } else {
        const aspectRatio = originalHeight / originalWidth;
        const computedHeight = (parseFloatVal * aspectRatio).toFixed(unit === "cm" ? 2 : 0);
        setHeight(computedHeight);
      }
    }
  };

  // Automatically compute proportional width values based on active lock structures
  const handleHeightChange = (e) => {
    const val = e.target.value;
    setHeight(val);

    if (lockAspectRatio && originalHeight > 0 && val !== "") {
      const parseFloatVal = parseFloat(val) || 0;
      if (unit === "%") {
        setWidth(val); // Proportional scale maps identical percentage limits to both sides
      } else {
        const aspectRatio = originalWidth / originalHeight;
        const computedWidth = (parseFloatVal * aspectRatio).toFixed(unit === "cm" ? 2 : 0);
        setWidth(computedWidth);
      }
    }
  };

  // Reset sizing fields dynamically when user changes measurement unit modes
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    setPreviewSrc("");

    if (imageSrc) {
      if (newUnit === "px") {
        setWidth(originalWidth);
        setHeight(originalHeight);
      } else if (newUnit === "cm") {
        setWidth((originalWidth / CM_TO_PX_FACTOR).toFixed(2));
        setHeight((originalHeight / CM_TO_PX_FACTOR).toFixed(2));
      } else if (newUnit === "%") {
        setWidth(100);
        setHeight(100);
      }
    }
  };

  // Load selected local file asset and extract native image boundaries
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setImageSrc(event.target.result);
          setPreviewSrc("");
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);

          // Initialize values based on active target unit selections
          if (unit === "px") {
            setWidth(img.width);
            setHeight(img.height);
          } else if (unit === "cm") {
            setWidth((img.width / CM_TO_PX_FACTOR).toFixed(2));
            setHeight((img.height / CM_TO_PX_FACTOR).toFixed(2));
          } else if (unit === "%") {
            setWidth(100);
            setHeight(100);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Execute native scale re-rendering onto canvas layouts
  const resizeImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Extract absolute target bounds converted to native pixel metrics
      const targetWidthPx = getAbsolutePixels(width, unit, true);
      const targetHeightPx = getAbsolutePixels(height, unit, false);

      // Prevent canvas crash from running zero sizing profiles
      canvas.width = targetWidthPx > 0 ? targetWidthPx : 1;
      canvas.height = targetHeightPx > 0 ? targetHeightPx : 1;

      // Draw down scaled assets securely
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      setPreviewSrc(canvas.toDataURL("image/jpeg", 0.95));
      setIsProcessing(false);
    };
  };

  // Download converted static images to client environments
  const downloadImage = () => {
    if (!previewSrc) return;
    const finalWidthPx = getAbsolutePixels(width, unit, true);
    const finalHeightPx = getAbsolutePixels(height, unit, false);

    const link = document.createElement("a");
    link.href = previewSrc;
    link.download = `csc_resized_${finalWidthPx}x${finalHeightPx}_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Purge application hooks back to clean zeroes
  const resetAll = () => {
    setImageSrc("");
    setPreviewSrc("");
    setWidth("");
    setHeight("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setUnit("px");
    setLockAspectRatio(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Interface Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Main Title Headers */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              📐 CSC Pro Studio Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Advanced Image Resizer
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Resize your images instantly using Pixels (px), Centimeters (cm) for official layout setups, or Percentage (%).
            </p>
          </div>

          {!imageSrc ? (
            /* Standard drag-input interface */
            <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#0B4AA2] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-12 text-center transition-all duration-300">
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl mb-3">📐</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">Click here or Drag & Drop Image to Start</p>
                <p className="text-slate-400 text-xs mt-1">Supports standard JPEG, JPG, and PNG uploads</p>
              </div>
            </div>
          ) : (
            /* Interactive Operational Module Dashboard */
            <div className="space-y-8">

              {/* Unit and Dimension Management Controllers */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">

                {/* Unit Switcher Button Row */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Dimension Unit (इकाई चुनें)</label>
                  <div className="flex gap-2 bg-slate-200/60 p-1 rounded-xl w-max">
                    {[
                      { id: "px", label: "Pixels (px)" },
                      { id: "cm", label: "Centimeters (cm)" },
                      { id: "%", label: "Percentage (%)" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleUnitChange(mode.id)}
                        className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${unit === mode.id ? 'bg-[#0B4AA2] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimension Entry Controllers Grid */}
                <div className="grid sm:grid-cols-3 gap-5 items-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Width ({unit})</label>
                    <input
                      type="number"
                      step={unit === "cm" ? "0.01" : "1"}
                      value={width}
                      onChange={handleWidthChange}
                      className="w-full bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Height ({unit})</label>
                    <input
                      type="number"
                      step={unit === "cm" ? "0.01" : "1"}
                      value={height}
                      onChange={handleHeightChange}
                      className="w-full bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#0B4AA2]"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5 sm:pt-0">
                    <input
                      type="checkbox"
                      id="ratioLock"
                      checked={lockAspectRatio}
                      onChange={(e) => setLockAspectRatio(e.target.checked)}
                      className="w-4 h-4 text-[#0B4AA2] border-slate-300 rounded focus:ring-[#0B4AA2]"
                    />
                    <label htmlFor="ratioLock" className="text-xs sm:text-sm font-bold text-slate-600 cursor-pointer select-none">
                      Lock Aspect Ratio
                    </label>
                  </div>
                </div>

              </div>

              {/* Layout Monitor Section Split Grid */}
              <div className="grid md:grid-cols-2 gap-8">

                {/* Left panel: Original image tracking module specs */}
                <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Uploaded Image Details</span>
                    <div className="h-[280px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner">
                      <img src={imageSrc} alt="Source info module" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="mt-3 text-center text-xs font-bold text-slate-400 space-y-0.5">
                      <p>Pixels: {originalWidth}px × {originalHeight}px</p>
                      <p>Physical size: {((originalWidth / CM_TO_PX_FACTOR)).toFixed(1)}cm × {((originalHeight / CM_TO_PX_FACTOR)).toFixed(1)}cm (@300dpi)</p>
                    </div>
                  </div>
                  <button
                    onClick={resizeImage}
                    disabled={isProcessing || !width || !height}
                    className="w-full mt-5 bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? "Processing Dimensions..." : "⚡ Process & Generate Image"}
                  </button>
                </div>

                {/* Right panel: Download and output generation modules */}
                <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Target Preview Box</span>
                    <div className="h-[280px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner bg-checkered">
                      {previewSrc ? (
                        <img src={previewSrc} alt="Processed asset final output" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400 italic text-center px-6">
                          Configure units and size, then click "Process & Generate Image".
                        </span>
                      )}
                    </div>
                    {previewSrc && (
                      <p className="text-xs font-bold text-green-600 mt-2 text-center">
                        Generated Output: {getAbsolutePixels(width, unit, true)}px × {getAbsolutePixels(height, unit, false)}px
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={downloadImage}
                      disabled={!previewSrc}
                      className={`flex-1 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-white
                        ${!previewSrc ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-green-600 hover:bg-green-700 shadow-green-900/10"}
                      `}
                    >
                      💾 Download Resized Image
                    </button>
                    <button onClick={resetAll} className="bg-slate-200 text-slate-600 font-bold px-5 py-3.5 rounded-xl hover:bg-slate-300 transition text-sm">
                      Reset
                    </button>
                  </div>
                </div>

              </div>

              {/* Informational Guidance Notification Banner */}
              <div className="bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
                📌 <strong>Operating Rule (DPI Mapping):</strong> The Centimeter conversion layer calculates limits based on standard **300 DPI**, which complies perfectly with Indian Government Portals (like MPSC, MahaDBT). For example, entering 3.5 cm × 4.5 cm will automatically generate a perfectly crisp photo.
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ImageResizer;