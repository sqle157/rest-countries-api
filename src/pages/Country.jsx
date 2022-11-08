import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	fetchCountryByFullName,
	fetchCountryByCode,
} from '../api/CountryAction';
import { useCountryContext } from '../hooks/useCountryContext';
// Icons & Components
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Country() {
	const [borderList, setBorderList] = useState([]);
	const [error, setError] = useState(false);
	const { country, dispatch, loading } = useCountryContext();

	// take the country name from params
	const params = useParams();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		// Set signal
		const AbortCtrl = new AbortController();
		const signal = AbortCtrl.signal;

		const getCountryData = async () => {
			setBorderList([]);
			try {
				const countryData = await fetchCountryByFullName(
					params.country,
					signal
				);

				countryData[0].borders?.forEach(async (border) => {
					const name = await fetchCountryByCode(border, signal);

					setBorderList((prevList) => [...prevList, name]);
				});

				dispatch({ type: 'GET_COUNTRY', payload: countryData[0] });
			} catch (error) {
				// Handle error
				if (
					error.message !== 'The user aborted a request.' &&
					error.message !== 'The operation was aborted. ' &&
					error.message !== 'Fetch is aborted'
				) {
					setError(error.message);
				}
			}
		};

		getCountryData();

		// abort the fetch when the component unmounts
		return () => AbortCtrl.abort();
	}, [params.country, dispatch]);

	// return if there is some error
	if (error) {
		return (
			<main className='country-container flex'>
				<div className='btn-flex'>
					<Link to='/' className='btn-back flex'>
						<FaArrowLeft />
						Back
					</Link>
				</div>
				<h1>
					This country doesn't exist or you have typed something wrong. Please
					check the URL or hit the button to navigate back to Home page...
				</h1>
			</main>
		);
	}

	// Loading Spinner
	if (loading) {
		<div className='grid spinner-container'>
			<Spinner />
		</div>;
	}

	return (
		country && (
			<main className='country-container flex'>
				<div className='btn-flex'>
					<Link to='/' className='btn-back flex'>
						<FaArrowLeft />
						Back
					</Link>
				</div>
				<div className='country-description grid'>
					<div className='country-flag-block'>
						<img src={`${country.flag}`} alt='flag' />
					</div>

					<div className='country-info-block flex'>
						<h1 className='country-name'>{country.name}</h1>
						<div className='info-grid grid'>
							<div>
								<p className='info'>
									<span className='category'>Native Name: </span>
									{country.nativeName}
								</p>
								<p className='info'>
									<span className='category'>Population: </span>
									{country.population}
								</p>
								<p className='info'>
									<span className='category'>Region: </span>
									{country.region}
								</p>
								<p className='info'>
									<span className='category'>Sub Region: </span>
									{country.subregion}
								</p>
								<p className='info'>
									<span className='category'>Capital: </span>
									{country.capital}
								</p>
							</div>
							<div>
								<p className='info'>
									<span className='category'>Top Level Domain: </span>
									{country.topLevelDomain[0]}
								</p>
								<p className='info'>
									<span className='category'>Currencies: </span>
									{country.currencies.map((currency) => currency.name)}
								</p>
								<p className='info'>
									<span className='category'>Languages: </span>
									{country.languages.map(
										(language, index) =>
											language.name +
											(index !== country.languages.length - 1 ? ', ' : '')
									)}
								</p>
							</div>
						</div>

						<div>
							<p className='info flex border-flex'>
								<span className='category'>Border Countries: </span>
								{borderList.length > 0 &&
									borderList.map((border, index) => (
										<Link to={`/${border}`} key={index} className='border-tag'>
											{border}
										</Link>
									))}
							</p>
						</div>
					</div>
				</div>
			</main>
		)
	);
}

export default Country;
