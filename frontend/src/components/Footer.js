import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {currentYear} Öğrenci Ders Çalışma Sistemi. Tüm hakları saklıdır.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 