import { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkTheme, setDarkTheme] = useState(true);

	const toggleTheme = () => {
		setDarkTheme((prevState) => !prevState);
	};

	return (
		<ThemeContext.Provider
			value={{
				darkTheme,
				toggleTheme,
			}}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
