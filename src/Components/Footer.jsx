import React from "react";
import logo from "../logo.png";

function Footer() {
  return (
    <footer className="bg-[#0B4AA2] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />

              <h2 className="text-xl font-bold">
                विदर्भ ऑनलाइन सेंटर
              </h2>
            </div>

            <p className="text-gray-200">
              सर्व शासकीय व डिजिटल सेवा एकाच ठिकाणी.
              नागरिकांना जलद, सुरक्षित आणि विश्वासार्ह सेवा.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Popular Services
            </h3>

            <ul className="space-y-2">
              <li>Farmer ID Card</li>
              <li>PM Kisan</li>
              <li>PAN Card</li>
              <li>Income Certificate</li>
              <li>Ayushman Card</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-2 text-gray-200">
              <li>📞 +91 8749759788</li>
              <li>📧 vidarbhaonlinecenter@gmail.com</li>
              <li>📍 Durga Chowk, Goregaon, Gondia</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-blue-400 mt-10 pt-6 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Vidarbha Online Center.
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;