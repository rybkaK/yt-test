import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch.ts';
import { useAppSelector } from './hooks/useAppSelector.ts';
import { fetchVideos } from './store/videos/videosSlice.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from "./components/Header/Header.tsx";
import VideosList from "./components/VideosList/VideosList.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useAppDispatch();
  const { videos, nextPageToken, prevPageToken, loading, error } =
    useAppSelector((state) => state.videos);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    if (query) {
      setSearchQuery(query);
      dispatch(fetchVideos({ query, pageToken: undefined }));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`?q=${searchQuery}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (token: string | null) => {
    if (token) {
      dispatch(fetchVideos({ query: searchQuery, pageToken: token }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <Header isLoading={loading} onChange={handleInputChange} onSearch={handleSearch} searchQuery={searchQuery}/>
      <main className="flex-grow p-6">
        {loading ? (
          <p className="text-gray-600 text-center col-span-2">
            Loading videos...
          </p>
        ) : (
          <VideosList videos={videos}/>
        )}
        {!loading && videos.length > 0 && (
          <Pagination isLoading={loading} prevPageToken={prevPageToken} nextPageToken={nextPageToken} onPageChange={handlePageChange}/>
        )}
      </main>
    </div>
  );
}

export default App;
