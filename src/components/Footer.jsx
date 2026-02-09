import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-lg font-bold">GrowthLab</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering the next generation of digital entrepreneurs with data-driven growth strategies.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Product</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Features</li>
              <li className="hover:text-blue-600 cursor-pointer">Templates</li>
              <li className="hover:text-blue-600 cursor-pointer">Integrations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Resources</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Growth Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Success Stories</li>
              <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
            </ul>
          </div>

          {/* Legal/Contact */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Legal</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-blue-600 cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} GrowthLab Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
              <span key={social} className="text-gray-400 hover:text-blue-600 text-xs font-bold cursor-pointer transition-colors">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;