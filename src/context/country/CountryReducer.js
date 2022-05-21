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

export default countryReducer;
