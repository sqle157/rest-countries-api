import { useEffect } from 'react';
import { useCountryContext } from '../hooks/useCountryContext';
import { fetchAllCountries } from '../api/CountryAction';
// Components
import CountryCard from '../components/CountryCard';
import SearchContainer from '../components/SearchContainer';
import Spinner from '../components/Spinner';

function CountriesSection() {
	const { countries, dispatch, loading } = useCountryContext();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		// Set signal
		const AbortCtrl = new AbortController();
		const signal = AbortCtrl.signal;

		const getCountriesData = async () => {
			try {
				const data = await fetchAllCountries(signal);
				dispatch({ type: 'GET_COUNTRIES', payload: data });
			} catch (error) {}
		};

		getCountriesData();

		// abort the fetch when the component unmounts
		return () => AbortCtrl.abort();
	}, [dispatch]);

	return loading ? (
		<div className='grid spinner-container'>
			<Spinner />
		</div>
	) : (
		countries && (
			<>
				<SearchContainer />
				<div className='grid home-container'>
					{countries.length > 0 &&
						countries.map((country, index) => (
							<CountryCard key={index} country={country} />
						))}
				</div>
			</>
		)
	);
}
export default CountriesSection;
