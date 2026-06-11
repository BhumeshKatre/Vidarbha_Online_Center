import React from "react";

function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-900 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Need help with government services, certificates,
            registrations, or digital solutions? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-bold text-[#0B4AA2] mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  📍 Address
                </h3>
                <p className="text-gray-600">
                  Durga Chowk, Goregaon,
                  Tal. Goregaon,
                  Dist. Gondia - 441801
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  📞 Phone
                </h3>
                <p className="text-gray-600">
                  +91 8149759788
                </p>
                <p className="text-gray-600">
                  +91 8459729470
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  📧 Email
                </h3>
                <p className="text-gray-600">
                  vidarbhaonlinecenter@gmail.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  🕒 Working Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Saturday
                </p>
                <p className="text-gray-600">
                  9:00 AM - 8:00 PM
                </p>
              </div>

            </div>

            <a
              href="https://wa.me/918459729470"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-bold text-[#0B4AA2] mb-6">
              Send Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#0B4AA2] text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <iframe
              title="location"
              src="https://maps.google.com/maps?q=Goregaon%20Gondia&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />

          </div>

        </div>
      </section>

    </div>
  );
}

export default ContactPage;