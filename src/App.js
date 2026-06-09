import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ServicesPage from "./Pages/ServicesPage";
import ServiceDetailsPage from "./Pages/ServiceDetailsPage";
import DownloadPage from "./Pages/DownloadPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/services/:slug"
          element={<ServiceDetailsPage />}
        />

        <Route path="/downloads" element={<DownloadPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
