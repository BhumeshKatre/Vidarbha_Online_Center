import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../Data/servicesData";

function ServiceDetailsPage() {
  const { slug } = useParams();

  // जब भी सर्विस चेंज हो, पेज ऑटोमैटिक टॉप पर स्क्रॉल हो जाए
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="text-center py-24 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Service Not Found</h1>
        <p className="text-slate-500 mt-2">The service you are looking for does not exist.</p>
        <Link to="/" className="mt-6 bg-[#0B4AA2] text-white px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-800 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  // व्हाट्सएप पर कस्टमर का ऑटो-मैसेज जनरेट करने के लिए
  const whatsappMessage = encodeURIComponent(
    `नमस्कार, मुझे *${service.title}* के लिए आवेदन करना है। कृपया आगे की प्रक्रिया बताएं।`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 selection:bg-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Card Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid lg:grid-cols-12 gap-0">

          {/* Left Column: Image & Marathi Content */}
          <div className="lg:col-span-5 bg-slate-100 p-6 sm:p-8 flex flex-col justify-between border-r border-slate-100">
            <div className="sticky top-6">
              <img
                src={service.image || "/services/default-service.webp"}
                alt={service.title}
                className="w-full h-[280px] sm:h-[360px] object-cover rounded-2xl shadow-md border border-white"
              />

              {/* मराठी डिक्लेरेशन / डिस्क्रिप्शन बॉक्स */}
              {service.description && (
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#0B4AA2] p-5 rounded-r-2xl shadow-sm">
                  <span className="text-xs font-bold text-[#0B4AA2] uppercase tracking-wider block mb-1">💡 महत्वाची माहिती</span>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Service Metadata & CTAs */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category Tag */}
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-[#0B4AA2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B4AA2]"></span>
                {service.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 text-[#0B4AA2] tracking-tight">
                {service.title}
              </h1>

              <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
                Get absolute hassle-free assistance for <strong>{service.title}</strong> application.
                Full support from documentation submission to final certificate generation.
              </p>

              {/* Information Table Grid */}
              <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-3 bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">
                  <div>Feature</div>
                  <div className="col-span-2">Details</div>
                </div>
                <div className="divide-y divide-slate-100 text-sm">
                  <div className="grid grid-cols-3 px-4 py-3.5 items-center">
                    <span className="font-semibold text-slate-600">⏱ Processing</span>
                    <span className="col-span-2 font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md inline-block w-max text-xs">{service.processingTime}</span>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3.5 items-center">
                    <span className="font-semibold text-slate-600">🏛 Gov. Fees</span>
                    <span className="col-span-2 font-medium text-slate-800">{service.governmentFees || "₹0"}</span>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3.5 items-center">
                    <span className="font-semibold text-slate-600">💼 Service Fee</span>
                    <span className="col-span-2 font-extrabold text-orange-600">{service.serviceCharge || "₹50"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Call to Actions */}
            <div className="grid sm:grid-cols-3 gap-3.5 mt-8 sm:mt-12">
              <button
                onClick={() => service.officialLink && window.open(service.officialLink, "_blank")}
                disabled={!service.officialLink}
                className={`w-full bg-[#0B4AA2] text-white px-5 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition flex items-center justify-center gap-2 ${!service.officialLink && 'opacity-50 cursor-not-allowed'}`}
              >
                🌐 Apply Online
              </button>

              {/* ऑफलाइन फॉर्म डाउनलोड बटन (कंडीशनल) */}
              {service.offlineFormLink ? (
                <button
                  onClick={() => window.open(service.offlineFormLink, "_blank")}
                  className="w-full bg-amber-500 text-white px-5 py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/10 hover:bg-amber-600 transition flex items-center justify-center gap-2"
                >
                  📄 Download Form
                </button>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 text-slate-400 px-5 py-3.5 rounded-xl text-center text-xs font-semibold flex items-center justify-center">
                  Form Offline N/A
                </div>
              )}

              {/* व्हाट्सएप बटन */}
              <a
                href={`https://wa.me/918459729470?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-green-600 text-white px-5 py-3.5 rounded-xl font-bold shadow-lg shadow-green-600/10 hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Documents & Process Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          {/* Required Documents Component */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2.5 h-5 bg-[#0B4AA2] rounded-full inline-block"></span>
              Required Documents (आवश्यक कागदपत्रे)
            </h2>
            <ul className="space-y-2.5 mt-5">
              {service.documents?.map((doc, index) => (
                <li key={index} className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100/50 hover:bg-blue-50/30 transition">
                  <span className="text-green-600 font-bold bg-green-100/60 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5">✓</span>
                  <span className="text-slate-700 font-semibold text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Steps Component */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2.5 h-5 bg-green-600 rounded-full inline-block"></span>
              Application Process (अर्ज करण्याची पद्धत)
            </h2>
            <div className="relative border-l-2 border-slate-100 ml-3.5 mt-6 space-y-6">
              {[
                { title: "Submit Documents", desc: "Bring original or clear Xerox copies to center, or directly share them via WhatsApp." },
                { title: "Verification Check", desc: "Our executive cross-verifies all critical criteria and guidelines required by the desk." },
                { title: "Portal Submission", desc: "Form is submitted securely on digital state/central portals with instant receipt generation." },
                { title: "Delivery & Print", desc: "Collect your authenticated digital certificates from center or get a PDF file over WhatsApp." }
              ].map((step, i) => (
                <div key={i} className="relative pl-6">
                  <span className="absolute -left-[11px] top-0.5 bg-white border-2 border-[#0B4AA2] text-[#0B4AA2] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
                    {i + 1}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm leading-none">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Services Segment */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-5 bg-slate-400 rounded-full inline-block"></span>
              Related Services
            </h2>
            <span className="h-[1px] bg-slate-200 flex-1 mx-4 hidden sm:block"></span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {servicesData
              .filter((item) => item.category === service.category && item.id !== service.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.slug}`}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <h3 className="font-bold text-slate-700 text-sm group-hover:text-[#0B4AA2] transition line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-5 flex justify-between items-center border-t border-slate-50 pt-3 text-xs">
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">⏱ {item.processingTime}</span>
                    <span className="text-slate-400 font-medium group-hover:text-orange-600 transition">Fee: <strong className="text-slate-700 group-hover:text-orange-600">{item.serviceCharge}</strong></span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetailsPage;