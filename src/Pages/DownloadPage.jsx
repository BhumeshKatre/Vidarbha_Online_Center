import React, { useState } from "react";
import {
  FileText,
  Search,
  Download,
  Filter,
} from "lucide-react";

const formsData = [
 {
    id: 1,
    title: "Lek Ladki Maharashtra Yojana Form",
    category: "Government Scheme",
    pdf: "https://drive.google.com/uc?export=download&id=1sajnGGrhKn-xdLEEqadcSZBFDfZ2CzuR",
  },
];

const DownloadPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredForms = formsData.filter(
    (form) =>
      (category === "All" || form.category === category) &&
      form.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">
            Download Center
          </h1>
          <p className="text-gray-600 text-lg">
            सरकारी फॉर्म डाउनलोड करा आणि सेवा मिळवा
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-xl px-4">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Forms..."
                className="w-full p-3 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <Filter size={20} className="text-gray-500" />
              <select
                className="w-full p-3 outline-none bg-transparent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Aadhaar</option>
                <option>PAN Card</option>
                <option>Farmer</option>
                <option>Certificate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6"
            >
              <div className="flex justify-center mb-4">
                <FileText
                  size={55}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">
                {form.title}
              </h3>

              <p className="text-center text-gray-500 mb-5">
                {form.category}
              </p>

              <a
                href={form.pdf}
                download
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
              >
                <Download size={18} />
                Download Form
              </a>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Form भरने में सहायता चाहिए?
          </h2>

          <p className="mb-6 text-blue-100">
            Vidarbha Online Center येथे संपर्क करा.
          </p>

          <a
            href="tel:8459729470"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold"
          >
            📞 Contact Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;