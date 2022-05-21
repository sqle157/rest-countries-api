import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByFullName, fetchCountryByCode } from '../context/country/CountryAction';
// import CountryContext from '../context/country/CountryContext';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Country() {
	const [country, setCountry] = useState({});
	const [borderList, setBorderList] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	// const { country, loading, dispatch } = useContext(CountryContext);

	const params = useParams();

	// For some reason, reducer & context create a weird bug
	// The fetch will always fail in the first load, but it will work normally after reloading
	// I couldn't figure out why, so I have to return to normal useState management
	useEffect(() => {
		// dispatch({ type: 'SET_LOADING' });
		const getCountryData = async () => {
			try {
				const countryData = await fetchCountryByFullName(params.country);

				countryData[0].borders?.forEach(async (border) => {
					const name = await fetchCountryByCode(border);
					// Prevent duplicate by using Set
					setBorderList((prevState) => Array.from(new Set([...prevState, name])));
				});

				// dispatch({ type: 'GET_COUNTRY', payload: countryData[0] });
				setCountry(countryData[0]);
				setLoading(false);
			} catch {
				// Handle error when return 404
				setError(true);
			}
		};

		getCountryData();
	}, [params.country]);

	// console.log(country);

	const {
		name,
		nativeName,
		population,
		capital,
		flag,
		region,
		subregion,
		topLevelDomain,
		currencies,
		languages,
	} = country;

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
					This country doesn't exist or you have typed something wrong. Please check the URL or
					hit the button to navigate back to Home page...
				</h1>
			</main>
		);
	}

	return loading ? (
		<div className='grid spinner-container'>
			<Spinner />
		</div>
	) : (
		<main className='country-container flex'>
			<div className='btn-flex'>
				<Link to='/' className='btn-back flex'>
					<FaArrowLeft />
					Back
				</Link>
			</div>
			<div className='country-description grid'>
				<div className='country-flag-block'>
					<img src={`${flag}`} alt='flag' />
				</div>

				<div className='country-info-block flex'>
					<h1 className='country-name'>{name}</h1>
					<div className='info-grid grid'>
						<div>
							<p className='info'>
								<span className='category'>Native Name: </span>
								{nativeName}
							</p>
							<p className='info'>
								<span className='category'>Population: </span>
								{population}
							</p>
							<p className='info'>
								<span className='category'>Region: </span>
								{region}
							</p>
							<p className='info'>
								<span className='category'>Sub Region: </span>
								{subregion}
							</p>
							<p className='info'>
								<span className='category'>Capital: </span>
								{capital}
							</p>
						</div>
						<div>
							<p className='info'>
								<span className='category'>Top Level Domain: </span>
								{topLevelDomain[0]}
							</p>
							<p className='info'>
								<span className='category'>Currencies: </span>
								{currencies.map((currency) => currency.name)}
							</p>
							<p className='info'>
								<span className='category'>Languages: </span>
								{languages.map(
									(language, index) =>
										language.name + (index !== languages.length - 1 ? ', ' : '')
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
	);
}

export default Country;
