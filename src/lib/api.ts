const API_BASE_URL = "https://restcountries.com/v3.1";

export async function getCountries(endpoint: `/${string}`) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
