# Aplikacja Kraje Świata

Aplikacja React do przeglądania, filtrowania i zaznaczania odwiedzonych krajów świata. Aplikacja pobiera dane z REST Countries API i umożliwia użytkownikowi filtrowanie krajów według regionu, wyszukiwanie według nazwy oraz sortowanie według nazwy lub populacji.

## Funkcjonalności

- Pobieranie i wyświetlanie danych o krajach z REST Countries API
- Filtrowanie krajów według regionu
- Wyszukiwanie krajów według nazwy
- Sortowanie krajów według nazwy lub populacji (rosnąco/malejąco)
- Zaznaczanie odwiedzonych krajów z zapisem w localStorage

## Optymalizacja wydajności

Aplikacja została zoptymalizowana pod kątem wydajności przy użyciu następujących technik:

### Przed optymalizacją

*Tutaj zostaną dodane zrzuty ekranu i wyniki profilowania przed optymalizacją*

### Zastosowane optymalizacje

1. **useMemo** - Użyto do zapamiętywania przefiltrowanej, przeszukanej i posortowanej listy krajów, aby uniknąć niepotrzebnych obliczeń przy każdym renderowaniu.

```tsx
const filteredAndSortedCountries = useMemo(() => {
  // Filtrowanie i sortowanie krajów
  // ...
}, [countries, selectedRegion, searchTerm, sortConfig]);
```

2. **useCallback** - Użyto do zapamiętywania funkcji obsługi zdarzeń dla filtrowania, wyszukiwania i sortowania, aby zapobiec niepotrzebnym renderowaniom komponentów potomnych.

```tsx
const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
}, []);
```

3. **React.memo** - Zastosowano do komponentu karty kraju, aby zapobiec ponownemu renderowaniu, gdy jego właściwości nie uległy zmianie.

```tsx
export default memo(CountryCard);
```

4. **Właściwe użycie kluczy (key)** - Zapewniono unikalne klucze dla list, aby uniknąć problemów z rekoncyliacją.

```tsx
<CountryCard
  key={country.cca3}
  country={country}
  isVisited={visitedCountries.includes(country.cca3)}
  onToggleVisited={onToggleVisited}
/>
```

### Po optymalizacji

*Tutaj zostaną dodane zrzuty ekranu i wyniki profilowania po optymalizacji*

## Technologie

- React 19
- TypeScript
- REST Countries API
- React Dev Tools Profiler (do analizy wydajności)

## Uruchomienie aplikacji

```bash
npm install
npm start
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).
