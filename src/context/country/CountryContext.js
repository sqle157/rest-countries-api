import { createContext, useReducer } from 'react';
import countryReducer from '../country/CountryReducer';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
	const initialState = {
		countries: [],
		// country: {},
		loading: true,
	};

	const [state, dispatch] = useReducer(countryReducer, initialState);

	return (
		<CountryContext.Provider
			value={{
				...state,
				dispatch,
			}}>
			{children}
		</CountryContext.Provider>
	);
};

export default CountryContext;
