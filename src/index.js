import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CountryProvider } from './context/country/CountryContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CountryProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</CountryProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
