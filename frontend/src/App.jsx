import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import URLForm from './components/URLForm';
import URLList from './components/URLList';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/urls');
      setUrls(response.data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShorten = async (longUrl) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/shorten', { url: longUrl });
      setUrls(prev => [response.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <URLForm onSubmit={handleShorten} loading={loading} error={error} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Links</h2>
          <URLList urls={urls} />
        </div>
      </main>
    </div>
  );
}

export default App;