import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

function QrGenerator() {
  const [activeTab, setActiveTab] = useState("url");
  const [qrImageUrl, setQrImageUrl] = useState("");
  
  // State parameters for Mode 1: URL / Website Link
  const [url, setUrl] = useState("https://");

  // State parameters for Mode 2: Pure Text
  const [text, setText] = useState("");

  // State parameters for Mode 3: WiFi Configuration Settings
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA"); // 'WPA', 'WEP', or 'nopass'

  // State parameters for Mode 4: UPI Digital Payment
  const [upiId, setUpiId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [amount, setAmount] = useState("");

  const canvasRef = useRef(null);

  // Generate the structural string data layout based on the active tab config parameters
  const getQrRawData = () => {
    switch (activeTab) {
      case "url":
        return url.trim();
      case "text":
        return text;
      case "wifi":
        // Standard WiFi QR format: WIFI:S:SSID;T:WPA;P:PASSWORD;;
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      case "upi":
        // Standard National Payments Corporation of India (NPCI) UPI deep-link specification
        // Format: upi://pay?pa=id@vpa&pn=Name&am=Amount&cu=INR
        const cleanName = encodeURIComponent(payeeName.trim());
        let upiString = `upi://pay?pa=${upiId.trim()}&pn=${cleanName}&cu=INR`;
        if (amount.trim() && parseFloat(amount) > 0) {
          upiString += `&am=${parseFloat(amount)}`;
        }
        return upiString;
      default:
        return "";
    }
  };

  // Compile raw textual parameters into visual QR Code canvas matrices safely
  const generateQrCode = async () => {
    const rawData = getQrRawData();
    
    // Prevent rendering empty or default fallback placeholder blocks
    if (!rawData || rawData === "https://" || rawData === "upi://pay?pa=&pn=&cu=INR") {
      setQrImageUrl("");
      return;
    }

    try {
      // Generate standalone target Data URL with higher precision resolution scales (Scale 8 ~ 300+ pixels)
      const options = {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "H", // High error correction to handle print folds or scratches safely
        color: {
          dark: "#000000",  // Crisp solid black modules for perfect optical scanners readability
          light: "#ffffff"  // High contrast stark white background canvas
        }
      };

      const urlData = await QRCode.toDataURL(rawData, options);
      setQrImageUrl(urlData);
    } catch (err) {
      console.error("QR Code Generation Framework Crash:", err);
    }
  };

  // Auto trigger background compilation rendering loops when inputs alter dynamically
  useEffect(() => {
    generateQrCode();
  }, [url, text, wifiSsid, wifiPassword, wifiEncryption, upiId, payeeName, amount, activeTab]);

  // Handle immediate physical download actions of the computed high DPI asset file
  const downloadQrCode = () => {
    if (!qrImageUrl) return;
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = `csc_utility_qr_${activeTab}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Flush operational structural metrics back to clean baseline parameters
  const resetTabFields = () => {
    setQrImageUrl("");
    if (activeTab === "url") setUrl("https://");
    if (activeTab === "text") setText("");
    if (activeTab === "wifi") { setWifiSsid(""); setWifiPassword(""); setWifiEncryption("WPA"); }
    if (activeTab === "upi") { setUpiId(""); setPayeeName(""); setAmount(""); }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 selection:bg-blue-200">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Main Application Base Card Wrapper */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          
          {/* Main Title Layout Module Header */}
          <div className="border-b border-slate-100 pb-5 mb-8">
            <span className="bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🏷️ CSC Generator Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4AA2] mt-3 tracking-tight">
              Utility QR Code Generator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Generate commercial high-resolution crisp offline QR code scanners for links, text scripts, WiFi hotspots, and instant UPI payments.
            </p>
          </div>

          {/* Interactive Navigation Mode Switcher Row */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200/60">
            {[
              { id: "url", label: "🔗 Website URL" },
              { id: "text", label: "📝 Plain Text" },
              { id: "wifi", label: "📶 WiFi Network" },
              { id: "upi", label: "💸 UPI Payment" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setQrImageUrl(""); }}
                className={`flex-1 min-w-[120px] text-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${activeTab === tab.id ? "bg-[#0B4AA2] text-white shadow-md" : "text-slate-600 hover:text-slate-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Core Computational Work Areas Split Grid Layout */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT CONFIGURATION PANEL: Handles Form Factor Data Entries (7 Columns) */}
            <div className="md:col-span-7 bg-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl">
              
              {/* TAB BOX 1: URL/Website Configuration Interface */}
              {activeTab === "url" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Web Domain URL</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Enter Website Link</label>
                    <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                </div>
              )}

              {/* TAB BOX 2: Plain Text Configuration Interface */}
              {activeTab === "text" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Custom Text Information Payload</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Enter Text Message</label>
                    <textarea rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type notes, store operational hours, or notices here..." className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                </div>
              )}

              {/* TAB BOX 3: WiFi Network Configuration Interface */}
              {activeTab === "wifi" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">WiFi Hotspot Routing Profiles</span>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Network Name (SSID)</label>
                    <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="e.g. Smart_Online_WiFi" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Password / Security Key</label>
                    <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="Enter network passcode keys" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Network Security Type</label>
                    <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 focus:outline-none focus:border-[#0B4AA2]">
                      <option value="WPA">WPA/WPA2 (Standard Personal - Recommended)</option>
                      <option value="WEP">WEP (Legacy Hardware Profiles)</option>
                      <option value="nopass">Unsecured (Open Public Hotspot)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB BOX 4: UPI Interoperable Payments Interface */}
              {activeTab === "upi" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">NPCI Static Merchant Pay Invoices</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">UPI ID / VPA (एंटर यूपीआई आईडी)</label>
                      <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="e.g. name@okhdfcbank" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Payee Name (नाम दर्ज करें)</label>
                      <input type="text" value={payeeName} onChange={(e) => setPayeeName(e.target.value)} placeholder="e.g. Smart Online Center" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Requested Fixed Amount (₹ - Optional)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Leave blank for any dynamic payment entry" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0B4AA2]" />
                  </div>
                </div>
              )}

              {/* Reset operational form controllers button */}
              <button type="button" onClick={resetTabFields} className="w-full mt-6 bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs transition">
                Clear Current Fields
              </button>

            </div>

            {/* RIGHT SCANNER PREVIEW PANEL: High contrast outputs download actions (5 Columns) */}
            <div className="md:col-span-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between h-full min-h-[360px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                  Live QR Scan Preview
                </span>

                <div className="min-h-[220px] rounded-2xl p-4 bg-white border border-slate-200 shadow-inner flex items-center justify-center overflow-hidden">
                  {qrImageUrl ? (
                    <div className="text-center p-2 bg-white shadow-sm rounded-lg border border-slate-100 animate-fadeIn">
                      <img src={qrImageUrl} alt="CSC Computed Custom QR Code Matrix" className="w-[180px] h-[180px] block mx-auto object-contain" />
                      <span className="inline-block mt-2 text-[10px] bg-green-50 border border-green-100 text-green-700 font-black px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                        Scan Ready
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic text-center px-6 leading-relaxed select-none">
                      Fill out required operational input string parameters on the left console panel to render custom secure QR scanners.
                    </div>
                  )}
                </div>
              </div>

              {/* Action operational high DPI asset downloads row control footer panels */}
              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={downloadQrCode}
                  disabled={!qrImageUrl}
                  className={`w-full font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm text-white
                    ${!qrImageUrl ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-green-600 hover:bg-green-700 shadow-green-900/10"}
                  `}
                >
                  💾 Download QR Image (PNG)
                </button>
              </div>

            </div>

          </div>

          {/* Secure sandbox localized environment regulatory operations banner */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-xl p-4 text-xs font-semibold leading-relaxed">
            📌 <strong>Pro CSC Operating Notice:</strong> System algorithms utilize error correction level <strong>"H" (High 30% recovery)</strong> matching international ISO specifications. This ensures barcodes and matrices remain fully operational even if printed elements are crumpled or folded on display boards.
          </div>

        </div>
      </div>
    </div>
  );
}

export default QrGenerator;