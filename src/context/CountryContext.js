import { createContext, useReducer } from 'react';

const initialState = {
	countries: null,
	country: null,
	loading: false,
};

const CountryContext = createContext();

const countryReducer = (state, action) => {
	switch (action.type) {
		case 'GET_COUNTRIES':
			return {
				...state,
				countries: action.payload,
				loading: false,
			};
		case 'GET_COUNTRY':
			return {
				...state,
				country: action.payload,
				loading: false,
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export const CountryProvider = ({ children }) => {
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
