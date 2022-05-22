import { useRef, useContext } from 'react';
import CountryContext from '../../context/country/CountryContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { fetchCountryByRegion } from '../../context/country/CountryAction';

function SelectDropDown({ setDropDown }) {
	const { dispatch } = useContext(CountryContext);
	const ref = useRef();

	useOnClickOutside(ref, () => setDropDown(false));

	const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

	const handleOnClick = async (e) => {
		dispatch({ type: 'SET_LOADING' });
		const countryData = await fetchCountryByRegion(e.target.dataset.value);
		dispatch({ type: 'GET_COUNTRIES', payload: countryData });
		setDropDown(false);
	};

	return (
		<div className='select-dropdown flex' ref={ref}>
			{regions.map((region, index) => (
				<span key={index} onClick={handleOnClick} className='select-item' data-value={region}>
					{region}
				</span>
			))}
		</div>
	);
}
export default SelectDropDown;
