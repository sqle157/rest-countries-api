import { useCountryContext } from '../hooks/useCountryContext';
import { fetchCountryByName } from '../api/CountryAction';
// Icons & Components
import { FaSearch } from 'react-icons/fa';
import SelectGroup from './select/SelectGroup';

function SearchContainer() {
	const { dispatch } = useCountryContext();

	const handleOnChange = async (e) => {
		try {
			const countryData = await fetchCountryByName(e.target.value);
			dispatch({ type: 'GET_COUNTRIES', payload: countryData });
		} catch (error) {}
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
