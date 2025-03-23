import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { fetchCountries } from './services/api';
import { Country } from './types';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);


  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);


  useEffect(() => {
    const storedVisitedCountries = localStorage.getItem('visitedCountries');
    if (storedVisitedCountries) {
      setVisitedCountries(JSON.parse(storedVisitedCountries));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }, [visitedCountries]);


  const handleToggleVisited = useCallback((cca3: string) => {
    setVisitedCountries(prev => {
      if (prev.includes(cca3)) {
        return prev.filter(code => code !== cca3);
      } else {
        return [...prev, cca3];
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">World Countries</h1>
        <p className="App-subtitle">Browse, filter and mark visited countries</p>
      </header>

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <CountryList 
          countries={countries} 
          visitedCountries={visitedCountries} 
          onToggleVisited={handleToggleVisited} 
        />
      )}
    </div>
  );
}

export default App;
