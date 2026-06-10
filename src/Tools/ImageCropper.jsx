import React, { useState, useRef } from "react";

function ImageCropper() {
  const [imageSrc, setImageSrc] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // क्रॉप बॉक्स के कोऑर्डिनेट्स
  const [crop, setCrop] = useState({ x: 50, y: 50, width: 150, height: 150 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragType, setDragType] = useState("move"); // 'move' या 'resize'

  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  // फाइल सिलेक्ट होने पर लोड करना
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setCroppedImage("");
        // डिफ़ॉल्ट क्रॉप बॉक्स सेट करना
        setCrop({ x: 50, y: 50, width: 150, height: 150 });
      };
      reader.readAsDataURL(file);
    }
  };

  // माउस दबाने पर (Drag चालू)
  const handleMouseDown = (e, type) => {
    e.preventDefault();
    setIsDragging(true);
    setDragType(type);

    // माउस की करंट पोजीशन सेव करना
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // माउस हिलने पर (बॉक्स मूव या रीसाइज करना)
  const handleMouseMove = (e) => {
    if (!isDragging || !imageRef.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // इमेज कंटेनर की बाउंड्री चेक करने के लिए
    const imgRect = imageRef.current.getBoundingClientRect();

    if (dragType === "move") {
      // पूरा बॉक्स सरकाना
      setCrop((prev) => {
        const newX = Math.max(0, Math.min(prev.x + deltaX, imgRect.width - prev.width));
        const newY = Math.max(0, Math.min(prev.y + deltaY, imgRect.height - prev.height));
        return { ...prev, x: newX, y: newY };
      });
    } else if (dragType === "resize") {
      // बॉक्स का साइज छोटा-बड़ा करना
      setCrop((prev) => {
        const newWidth = Math.max(20, Math.min(prev.width + deltaX, imgRect.width - prev.x));
        const newHeight = Math.max(20, Math.min(prev.height + deltaY, imgRect.height - prev.y));
        return { ...prev, width: newWidth, height: newHeight };
      });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // माउस छोड़ने पर (Drag बंद)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // मुख्य क्रॉपिंग लॉजिक
  const handleCrop = () => {
    if (!imageSrc || !imageRef.current) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // स्क्रीन पर दिखने वाली इमेज और ऑरिजनल इमेज का स्केल रेशियो निकालना
      const displayWidth = imageRef.current.width;
      const displayHeight = imageRef.current.height;
      const scaleX = image.naturalWidth / displayWidth;
      const scaleY = image.naturalHeight / displayHeight;

      // कैनवास का साइज क्रॉप बॉक्स जितना सेट करना
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      // कैनवास पर सिलेक्टेड हिस्सा ड्रा करना
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // बेस64 जनरेट करके प्रीव्यू सेट करना
      setCroppedImage(canvas.toDataURL("image/jpeg"));
    };
  };

  // क्रॉप्ड इमेज डाउनलोड करना
  const downloadCroppedImage = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `csc_cropped_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc("");
    setCroppedImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="max-w-5xl mx-auto px-4">

        {/* Main Utility Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">

          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ✂️ CSC Photo Editor
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Smart Image Cropper
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              पासपोर्ट फोटो या सिग्नेचर को आसानी से सिलेक्ट करके क्रॉप (काटें) करें और डाउनलोड करें।
            </p>
          </div>

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
                <span className="text-4xl mb-3 group-hover:rotate-12 transition duration-300">✂️</span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  Click or Drag Photo to Crop
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Supports JPG, JPEG, PNG formats
                </p>
              </div>
            </div>
          ) : (
            /* Editing Workspace */
            <div className="space-y-8">
              <div className="grid md:grid-cols-12 gap-8 items-start">

                {/* Left Side: Cropping Board (8 Columns) */}
                <div className="md:col-span-7 bg-slate-100 rounded-2xl p-4 flex items-center justify-center border border-slate-200 shadow-inner overflow-hidden">
                  <div className="relative select-none max-w-full">
                    <img
                      ref={imageRef}
                      src={imageSrc}
                      alt="Source Workspace"
                      className="max-h-[400px] w-auto object-contain block"
                      draggable={false}
                    />

                    {/* Dark Mask Layer */}
                    <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

                    {/* Active Highlighted Crop Box */}
                    <div
                      style={{
                        position: "absolute",
                        left: `${crop.x}px`,
                        top: `${crop.y}px`,
                        width: `${crop.width}px`,
                        height: `${crop.height}px`,
                        backgroundImage: `url(${imageSrc})`,
                        backgroundPosition: `-${crop.x}px -${crop.y}px`,
                        backgroundSize: imageRef.current ? `${imageRef.current.width}px ${imageRef.current.height}px` : "auto",
                      }}
                      onMouseDown={(e) => handleMouseDown(e, "move")}
                      className="border-2 border-[#0B4AA2] shadow-2xl cursor-move box-border"
                    >
                      {/* Diagonal Grid Lines (For design feel) */}
                      <div className="w-full h-full border border-white/30 pointer-events-none grid grid-cols-3 grid-rows-3">
                        <div className="border-r border-b border-white/20"></div>
                        <div className="border-r border-b border-white/20"></div>
                        <div className="border-b border-white/20"></div>
                        <div className="border-r border-b border-white/20"></div>
                        <div className="border-r border-b border-white/20"></div>
                        <div className="border-b border-white/20"></div>
                      </div>

                      {/* Resize Handle Handle (Bottom Right Corner) */}
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation(); // ताकि पेरेंट का move इवेंट ट्रिगर न हो
                          handleMouseDown(e, "resize");
                        }}
                        className="absolute bottom-0 right-0 w-4 h-4 bg-[#0B4AA2] border-2 border-white rounded-full translate-x-1/2 translate-y-1/2 cursor-se-resize shadow-md"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Preview & Download Card (5 Columns) */}
                <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Live Preview</span>
                    <div className="h-[200px] rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-white shadow-inner">
                      {croppedImage ? (
                        <img src={croppedImage} alt="Cropped Result" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400 italic text-center px-4">
                          बॉक्स सेट करके नीचे दिए गए "काटें (Crop)" बटन पर क्लिक करें।
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dashboard Operations */}
                  <div className="space-y-2 mt-6">
                    {!croppedImage ? (
                      <button
                        onClick={handleCrop}
                        className="w-full bg-[#0B4AA2] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-800 transition"
                      >
                        🎯 Crop Selected Area
                      </button>
                    ) : (
                      <button
                        onClick={downloadCroppedImage}
                        className="w-full bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-green-700 transition"
                      >
                        💾 Download Cropped Image
                      </button>
                    )}

                    <button
                      onClick={resetAll}
                      className="w-full bg-slate-200 text-slate-600 font-bold px-5 py-3 transition text-sm rounded-xl hover:bg-slate-300"
                    >
                      Reset / Change Photo
                    </button>
                  </div>
                </div>

              </div>

              {/* User Instruction Banner */}
              <div className="bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold">
                💡 <strong>कैसे उपयोग करें:</strong> फोटो के ऊपर बने नीले डिब्बे को माउस से पकड़कर कहीं भी सरका सकते हैं। डिब्बे के नीचे दाहिने (Bottom-Right) कोने वाले बिंदु को खींचकर साइज को छोटा या बड़ा कर सकते हैं।
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ImageCropper;