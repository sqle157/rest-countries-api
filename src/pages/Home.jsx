import { useContext, useEffect } from 'react';
import CountryContext from '../context/country/CountryContext';
import CountryCard from '../components/CountryCard';
import SearchContainer from '../components/SearchContainer';
import Spinner from '../components/Spinner';
import { fetchAllCountries } from '../context/country/CountryAction';

function CountriesSection() {
	const { countries, loading, dispatch } = useContext(CountryContext);

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });

		const getCountriesData = async () => {
			const countriesData = await fetchAllCountries();
			dispatch({ type: 'GET_COUNTRIES', payload: countriesData });
		};

		getCountriesData();
	}, [dispatch]);

	return loading ? (
		<div className='grid spinner-container'>
			<Spinner />
		</div>
	) : (
		<>
			<SearchContainer />
			<div className='grid home-container'>
				{countries.length > 0 &&
					countries.map((country, index) => <CountryCard key={index} country={country} />)}
			</div>
		</>
	);
}
export default CountriesSection;
