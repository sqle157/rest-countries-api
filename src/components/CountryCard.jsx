import { Link } from 'react-router-dom';

function CountryCard({ country }) {
	const { name, flags, population, region, capital } = country;

	return (
		<div className='country-card'>
			<div className='country-flag'>
				<Link to={`/${name.toLowerCase().replace(/\s/g, '%20')}`}>
					<img src={flags.png} alt='flag' />
				</Link>
			</div>
			<div className='country-info flex'>
				<h2>{name}</h2>
				<p className='info'>
					<span className='category'>Population</span>:{' '}
					{population.toLocaleString()}
				</p>
				<p className='info'>
					<span className='category'>Region</span>: {region}
				</p>
				<p className='info'>
					<span className='category'>Capital</span>: {capital}
				</p>
			</div>
		</div>
	);
}
export default CountryCard;
