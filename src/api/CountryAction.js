// Fetch all country
export const fetchAllCountries = async (signal) => {
	const response = await fetch('https://restcountries.com/v2/all', { signal });
	const data = await response.json();

	return data;
};

// Fetch country by name (either fullname or just part of it)
export const fetchCountryByName = async (searchValue, signal) => {
	if (searchValue !== '') {
		const response = await fetch(
			`https://restcountries.com/v2/name/${searchValue}`,
			{ signal }
		);
		const data = await response.json();

		return data;
	} else {
		return fetchAllCountries();
	}
};

// Fetch country by fullname
export const fetchCountryByFullName = async (name, signal) => {
	const response = await fetch(
		`https://restcountries.com/v2/name/${name}?fullText=true`,
		{ signal }
	);
	const data = await response.json();

	return data;
};

// Fetch country by region
export const fetchCountryByRegion = async (region, signal) => {
	if (region !== '') {
		const response = await fetch(
			`https://restcountries.com/v2/region/${region}`,
			{ signal }
		);
		const data = await response.json();

		return data;
	}
};

// Return name of the country fetched by country code
export const fetchCountryByCode = async (code, signal) => {
	const response = await fetch(`https://restcountries.com/v2/alpha/${code}`, {
		signal,
	});
	const data = await response.json();
	const { name } = data;
	// console.log(name);
	return name;
};
