import React from 'react';

type Properties = {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const Header: React.FC<Properties> = ({ searchQuery, onSearch, onChange, isLoading }) => {
  return (
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            YouTube Video Search
          </h1>
          <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={onChange}
                className="w-64 px-4 py-2 bg-white border border-black placeholder-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={onSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;