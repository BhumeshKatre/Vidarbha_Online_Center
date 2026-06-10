import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ServicesPage from "./Pages/ServicesPage";
import ServiceDetailsPage from "./Pages/ServiceDetailsPage";
import DownloadPage from "./Pages/DownloadPage";
import JpgToPdf from "./Tools/JpgToPdf";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ImageCompressor from "./Tools/ImageCompressor";

function App() {
  return (
    <>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailsPage />} />
            <Route path="/tools/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/downloads" element={<DownloadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/Contact" element={<ContactPage />} />
          </Routes>
      <Footer />
    </>
  );
}

export default App;
