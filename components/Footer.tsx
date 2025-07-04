import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white font-title">9isas</h3>
          <p className="text-gray-500 mt-1">Weaving magical tales with AI.</p>
        </div>
        <div className="text-gray-500 mt-4 md:mt-0">
          <p>&copy; {new Date().getFullYear()} 9isas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
