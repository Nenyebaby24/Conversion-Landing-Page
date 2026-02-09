import React from 'react';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-black text-xl">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Growth<span className="text-blue-600">Lab</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('booking')} className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Strategy Call
          </button>
          <a href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all active:scale-95 shadow-md"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;