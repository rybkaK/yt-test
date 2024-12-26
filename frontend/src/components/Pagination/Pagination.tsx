import React from 'react';

type Propeties = {
  onPageChange: (page: string | null) => void;
  prevPageToken: string | null;
  isLoading: boolean;
  nextPageToken: string | null;
}

const Pagination: React.FC<Propeties> = ({ prevPageToken, nextPageToken, onPageChange, isLoading }) => {
  return (
      <div className="mt-6 flex justify-center gap-4">
        <button
            onClick={() => onPageChange(prevPageToken)}
            disabled={!prevPageToken || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
            onClick={() => onPageChange(nextPageToken)}
            disabled={!nextPageToken || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
  );
};

export default Pagination;