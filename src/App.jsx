import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AdminPOS from "./Components/AdminPOS";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-28 pb-20 px-6">
          <Routes>
            <Route path="/" element={<AdminPOS />} />
            <Route path="/order" element={<Placeholder title="Order Online" description="Delivery system coming to Panchkula soon." />} />
            <Route path="/about" element={<Placeholder title="The Lab" description="Grown in Panchkula. High-density nutrition." />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Placeholder = ({ title, description }) => (
  <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in duration-1000">
    <h1 className="text-5xl font-light tracking-tight mb-4">{title}</h1>
    <p className="text-gray-500 text-xl">{description}</p>
  </div>
);