// Serwis do pobierania danych z REST Countries API

export const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,flags,cca3');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
