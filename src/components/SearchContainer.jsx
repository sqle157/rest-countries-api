import { useContext } from 'react';
import CountryContext from '../context/country/CountryContext';
import { FaSearch } from 'react-icons/fa';
import SelectGroup from './select/SelectGroup';
import { fetchCountryByName } from '../context/country/CountryAction';

function SearchContainer() {
	const { dispatch } = useContext(CountryContext);

	const handleOnChange = async (e) => {
		const countryData = await fetchCountryByName(e.target.value);
		dispatch({ type: 'GET_COUNTRIES', payload: countryData });
	};

	return (
		<div className='flex search-container'>
			<div className='input-group flex'>
				<FaSearch />
				<input
					onChange={handleOnChange}
					type='text'
					placeholder='Search for a country...'
					className='search-input'
				/>
			</div>

			<SelectGroup />
		</div>
	);
}
export default SearchContainer;
