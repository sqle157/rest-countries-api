import { useRef } from 'react';
import { useCountryContext } from '../../hooks/useCountryContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { fetchCountryByRegion } from '../../api/CountryAction';

function SelectDropDown({ setDropDown }) {
	const { dispatch } = useCountryContext();
	const ref = useRef();

	useOnClickOutside(ref, () => setDropDown(false));

	const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

	const handleOnClick = async (e) => {
		dispatch({ type: 'SET_LOADING' });

		try {
			const countryData = await fetchCountryByRegion(e.target.dataset.value);
			dispatch({ type: 'GET_COUNTRIES', payload: countryData });
			setDropDown(false);
		} catch (error) {}
	};

	return (
		<div className='select-dropdown flex' ref={ref}>
			{regions.map((region, index) => (
				<button
					key={index}
					onClick={handleOnClick}
					className='select-item'
					data-value={region}
					type='button'>
					{region}
				</button>
			))}
		</div>
	);
}
export default SelectDropDown;
