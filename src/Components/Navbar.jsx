import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="glass-morphism fixed top-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl tracking-tighter text-green-800 underline decoration-green-400 decoration-4 underline-offset-4">
            GREENER.
          </span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Admin</Link>
            <Link to="/order" className="hover:text-black transition-colors">Home Delivery</Link>
            <Link to="/about" className="hover:text-black transition-colors">The Lab</Link>
          </div>
        </div>
        <button className="bg-black text-white text-xs px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all font-medium">
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;