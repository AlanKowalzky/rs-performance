import React, { useState, useMemo, useCallback } from 'react';
import { Country, SortConfig } from '../types';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  visitedCountries: string[];
  onToggleVisited: (cca3: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, visitedCountries, onToggleVisited }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc'
  });

  // Pobieranie unikalnych regionów dla filtra z użyciem useMemo
  const regions = useMemo(() => {
    const uniqueRegions = new Set(countries.map(country => country.region));
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  // Funkcja obsługująca zmianę wyszukiwania z useCallback
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Funkcja obsługująca zmianę filtra regionu z useCallback
  const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  }, []);

  // Funkcja obsługująca zmianę sortowania z useCallback
  const handleSortChange = useCallback((field: 'name' | 'population') => {
    setSortConfig(prevConfig => {
      if (prevConfig.field === field) {
        // Jeśli klikamy na to samo pole, zmieniamy kierunek sortowania
        return {
          ...prevConfig,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      } else {
        // Jeśli klikamy na inne pole, ustawiamy domyślnie sortowanie rosnące
        return {
          field,
          direction: 'asc'
        };
      }
    });
  }, []);

  // Filtrowanie, wyszukiwanie i sortowanie krajów z użyciem useMemo
  const filteredAndSortedCountries = useMemo(() => {
    // Filtrowanie po regionie i wyszukiwanie po nazwie
    let result = countries.filter(country => {
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      const matchesSearch = searchTerm
        ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesRegion && matchesSearch;
    });

    // Sortowanie
    return result.sort((a, b) => {
      if (sortConfig.field === 'name') {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return sortConfig.direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        // Sortowanie po populacji
        return sortConfig.direction === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
    });
  }, [countries, searchTerm, selectedRegion, sortConfig]);

  return (
    <div className="country-list-container">
      <div className="filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Wyszukaj kraj..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="region-filter">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="region-select"
          >
            <option value="">Wszystkie regiony</option>
            {regions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sort-controls">
          <button
            onClick={() => handleSortChange('name')}
            className={`sort-button ${sortConfig.field === 'name' ? 'active' : ''}`}
          >
            Nazwa {sortConfig.field === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('population')}
            className={`sort-button ${sortConfig.field === 'population' ? 'active' : ''}`}
          >
            Populacja {sortConfig.field === 'population' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="countries-grid">
        {filteredAndSortedCountries.length > 0 ? (
          filteredAndSortedCountries.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              isVisited={visitedCountries.includes(country.cca3)}
              onToggleVisited={onToggleVisited}
            />
          ))
        ) : (
          <div className="no-results">Nie znaleziono krajów spełniających kryteria wyszukiwania</div>
        )}
      </div>
    </div>
  );
};

export default CountryList;