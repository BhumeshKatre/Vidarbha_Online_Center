import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ServicesPage from "./Pages/ServicesPage";
import ServiceDetailsPage from "./Pages/ServiceDetailsPage";
import DownloadPage from "./Pages/DownloadPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ToolPage from "./Pages/ToolPage";

// Import your newly upgraded master details wrapper page component
import ToolDetailsPage from "./Pages/ToolDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Core Informational Base Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />

        {/* Main Tools Grid Catalog Dashboard */}
        <Route path="/tools" element={<ToolPage />} />

        <Route path="/tools/:slug" element={<ToolDetailsPage />} />

        {/* Utility Document Base Routes */}
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;