import { useContext } from 'react';
import CountryContext from '../context/CountryContext';

export const useCountryContext = () => {
	const context = useContext(CountryContext);

	if (!context) {
		throw Error(
			'useCountryContext must be used inside an CountryContextProvider'
		);
	}

	return context;
};
