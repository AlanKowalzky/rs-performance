import React, { useState, useMemo, useCallback } from 'react';
import { Country, SortConfig } from '../types';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  visitedCountries: string[];
  onToggleVisited: (cca3: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  visitedCountries,
  onToggleVisited,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });

  const regions = useMemo(() => {
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback((field: 'name' | 'population') => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        return {
          ...prevConfig,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          field,
          direction: 'asc',
        };
      }
    });
  }, []);

  const filteredAndSortedCountries = useMemo(() => {
    const result = countries.filter((country) => {
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion
        : true;
      const matchesSearch = searchTerm
        ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesRegion && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortConfig.field === 'name') {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return sortConfig.direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
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
            placeholder="Search country..."
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
            <option value="">All regions</option>
            {regions.map((region) => (
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
            Name{' '}
            {sortConfig.field === 'name' &&
              (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('population')}
            className={`sort-button ${sortConfig.field === 'population' ? 'active' : ''}`}
          >
            Population{' '}
            {sortConfig.field === 'population' &&
              (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="countries-grid">
        {filteredAndSortedCountries.length > 0 ? (
          filteredAndSortedCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isVisited={visitedCountries.includes(country.cca3)}
              onToggleVisited={onToggleVisited}
            />
          ))
        ) : (
          <div className="no-results">
            No countries found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
