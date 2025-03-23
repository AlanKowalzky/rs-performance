import React, { memo } from 'react';
import { Country } from '../types';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (cca3: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, isVisited, onToggleVisited }) => {
  const handleToggleVisited = () => {
    onToggleVisited(country.cca3);
  };

  return (
    <div className={`country-card ${isVisited ? 'visited' : ''}`}>
      <div className="country-flag">
        <img src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} />
      </div>
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <button 
          className={`visit-button ${isVisited ? 'visited' : ''}`}
          onClick={handleToggleVisited}
        >
          {isVisited ? 'Visited' : 'Mark as Visited'}
        </button>
      </div>
    </div>
  );
};

// Używamy React.memo do optymalizacji renderowania
export default memo(CountryCard);
