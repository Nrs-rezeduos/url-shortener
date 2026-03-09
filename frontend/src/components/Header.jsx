import React from 'react';
import { Link } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Link className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Link Analytics Shortener</h1>
            <p className="text-sm text-gray-500">Shorten URLs and track their performance</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;