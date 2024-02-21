import { useState, useEffect } from 'react';
import Header from '../src/components/Header/Header';
import Result from '../src/components/Result/Result';

export default function ProductSearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async ({ search }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/result?q=${search}`);
      if (!response.ok) {
        throw new Error('Cannot fetch products');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Product Search</h1>
      <Header handleSearch={handleSearch} />
      {isLoading ? <p>Loading...</p> : <Result products={searchResults} />}
    </div>
  );
}
