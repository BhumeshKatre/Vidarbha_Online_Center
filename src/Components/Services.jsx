import React from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../Data/servicesData";

function ServicesSection() {
  const featuredServices = servicesData.filter(
    (service) => service.featured
  );

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#0B4AA2]">
            Popular Services
          </h2>

          <Link
            to="/services"
            className="text-[#0B4AA2] font-semibold hover:text-green-600"
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredServices.slice(0,4).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-green"
            >
              {/* Image */}
              <img
                src={service.image || "/services/default-service.webp"}
                alt={service.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {service.title}
                </h3>

                {/* Documents */}
                <div className="mt-3">
                  <p className="font-medium text-sm text-gray-700">
                    Required Documents:
                  </p>

                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    {service.documents?.slice(0, 3).map((doc, index) => (
                      <li key={index}>✓ {doc}</li>
                    ))}
                  </ul>
                </div>

                {/* Processing Time */}
                <div className="mt-4">
                  <span className="text-green-600 font-semibold">
                    ⏱ {service.processingTime}
                  </span>
                </div>

                {/* Button */}
                <Link
                  to={`/services/${service.slug}`}
                  className="block w-full mt-4 bg-[#0B4AA2] text-white py-2 rounded-lg text-center hover:bg-green-600 transition"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ServicesSection;