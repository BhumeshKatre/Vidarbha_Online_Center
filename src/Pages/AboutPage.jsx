import React from "react";

function AboutPage() {
  return (
    <div className="bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-blue-900 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">
            About Vidarbha Online Center
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Your trusted partner for government services,
            digital solutions, documentation support, and
            citizen services across India.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="About Us"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-4xl font-bold text-[#0B4AA2]">
              Who We Are
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Vidarbha Online Center is a modern digital service
              platform helping citizens access government and
              online services quickly and easily.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We assist with Farmer ID, PM Kisan, Ayushman Card,
              Income Certificate, Scholarship Applications,
              PAN Card, Passport Services, and many more.
            </p>
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-bold text-[#0B4AA2]">
            Our Mission
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            To make government and digital services simple,
            transparent, and accessible for everyone through
            technology and expert assistance.
          </p>

        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center text-[#0B4AA2] mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "Fast Processing",
              "Expert Guidance",
              "Secure Documentation",
              "Customer Support",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md text-center"
              >
                <h3 className="font-semibold text-lg">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0B4AA2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p>Applications Processed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">20+</h3>
            <p>Services Available</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">98%</h3>
            <p>Customer Satisfaction</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p>Support Available</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-bold text-[#0B4AA2]">
            Need Any Online Service?
          </h2>

          <p className="mt-4 text-gray-600">
            Contact us today and get professional assistance.
          </p>

          <a
            href="https://wa.me/918459729470"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700"
          >
            Contact on WhatsApp
          </a>

        </div>
      </section>

    </div>
  );
}

export default AboutPage;