import axios from 'axios';

const baseUrl = "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code";

async function countriesService(searchValue: string): Promise<string | null> {
  try {
    const response = await axios.get(baseUrl);
    const countries = response.data.countries;
    console.log('servicecountries:------->|', countries);

    const country = countries.find((country: { value: string; label: string }) => country.value === searchValue);
    console.log('servicecountries:', country);
    
    return country ? country.label : null;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return null;
  }
}

export default countriesService;
