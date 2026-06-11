import React, { Component } from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../Data/servicesData";

class ServicesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: "all",
      searchTerm: "",
    };
  }

  render() {
    const { selectedCategory, searchTerm } = this.state;

    const filteredServices = servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" ||
        service.category === selectedCategory;

      const matchesSearch = service.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    const categories = [
      "all",
      "mahadbt",
      "aaplesarkar",
      "govtscheme",
      "admission",
      "documents",
      "banking",
      "csc",
      "design",
    ];

    return (
      <div className="bg-slate-50 min-h-screen py-10 ">
        <div className="max-w-7xl mx-auto px-4 ">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-[#0B4AA2] mb-8">
            Our Services
          </h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) =>
              this.setState({ searchTerm: e.target.value })
            }
            className="w-full p-3 border rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  this.setState({
                    selectedCategory: category,
                  })
                }
                className={`px-4 py-2 rounded-full capitalize transition ${selectedCategory === category
                    ? "bg-[#0B4AA2] text-white"
                    : "bg-white border"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    service.image ||
                    "/services/default-service.webp"
                  }
                  alt={service.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-bold text-lg">
                    {service.title}
                  </h3>

                  <div className="mt-3">
                    <span className="text-green-600 font-semibold">
                      ⏱ {service.processingTime}
                    </span>
                  </div>

                  <Link
                    to={`/services/${service.slug}`}
                    className="block text-center mt-4 bg-[#0B4AA2] text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}

export default ServicesPage;