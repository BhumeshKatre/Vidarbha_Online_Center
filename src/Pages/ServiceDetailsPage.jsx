import React from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../Data/servicesData";

function ServiceDetailsPage() {
  const { slug } = useParams();

  const service = servicesData.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">
          Service Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-2 gap-8">

          {/* Image */}
          <div>
            <img
              src={
                service.image ||
                "/services/default-service.webp"
              }
              alt={service.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {service.category}
            </span>

            <h1 className="text-4xl font-bold mt-4 text-[#0B4AA2]">
              {service.title}
            </h1>

            <p className="mt-4 text-gray-600">
              Complete assistance for {service.title}.
              Fast, secure and reliable service.
            </p>

            <div className="mt-6">
              <span className="text-xl font-semibold text-green-600">
                ⏱ {service.processingTime}
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <button className="bg-[#0B4AA2] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                Apply Now
              </button>

              <a
                href="https://wa.me/918459729470"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Required Documents
          </h2>

          <ul className="space-y-3">
            {service.documents?.map((doc, index) => (
              <li key={index}>
                ✅ {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Process
          </h2>

          <div className="space-y-4">
            <div>1️⃣ Submit Required Documents</div>
            <div>2️⃣ Verification Process</div>
            <div>3️⃣ Application Submission</div>
            <div>4️⃣ Service Completion</div>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Related Services
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {servicesData
              .filter(
                (item) =>
                  item.category === service.category &&
                  item.id !== service.id
              )
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.slug}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
                >
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-green-600 mt-2">
                    ⏱ {item.processingTime}
                  </p>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetailsPage;