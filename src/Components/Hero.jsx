import React from "react";
import shopImg from '../assests/shop.png'

function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-blue-900 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="lg:w-1/2">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
            CSC | Government & Digital Services
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            विदर्भ ऑनलाइन सेंटर
          </h1>

          <h2 className="mt-3 text-xl md:text-2xl text-green-100">
            सर्व शासकीय व डिजिटल सेवा एकाच ठिकाणी
          </h2>

          <p className="mt-6 text-lg text-gray-100 leading-relaxed">
            आधार कार्ड, पॅन कार्ड, किसान आयडी, जात प्रमाणपत्र,
            उत्पन्न प्रमाणपत्र, शासकीय अर्ज, ऑनलाइन फॉर्म,
            बँकिंग सेवा आणि इतर डिजिटल सेवा.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-bold hover:scale-105 transition">
              आमच्या सेवा
            </button>

            <button className="border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-800 transition">
              संपर्क करा
            </button>
          </div>

          <div className="mt-8 flex gap-8">
            <div>
              <h3 className="text-3xl font-bold">5000+</h3>
              <p className="text-green-100">Satisfied Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-green-100">Services</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-green-100">Support</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={shopImg}
            alt="Digital Services"
            className="w-full max-w-lg drop-shadow-2xl rounded-4xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;