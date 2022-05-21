// Fetch all country
export const fetchAllCountries = async () => {
	const response = await fetch('https://restcountries.com/v2/all');
	const data = await response.json();

	return data;
};

// Fetch country by name (either fullname or just part of it)
export const fetchCountryByName = async (searchValue) => {
	if (searchValue !== '') {
		const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`);
		const data = await response.json();

		return data;
	} else {
		return fetchAllCountries();
	}
};

// Fetch country by fullname
export const fetchCountryByFullName = async (name) => {
	const response = await fetch(`https://restcountries.com/v2/name/${name}?fullText=true`);
	const data = await response.json();

	return data;
};

// Fetch country by region
export const fetchCountryByRegion = async (region) => {
	if (region !== '') {
		const response = await fetch(`https://restcountries.com/v2/region/${region}`);
		const data = await response.json();

		return data;
	}
};

// Return name of the country fetched by country code
export const fetchCountryByCode = async (code) => {
	const response = await fetch(`https://restcountries.com/v2/alpha/${code}`);
	const data = await response.json();
	const { name } = data;
	// console.log(name);
	return name;
};
