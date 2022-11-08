import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Error from './pages/Error';
import ThemeContext from './context/ThemeContext';
import { useContext } from 'react';
import Country from './pages/Country';

function App() {
	const { darkTheme } = useContext(ThemeContext);

	document.body.classList = darkTheme ? '' : 'light-theme';

	return (
		<>
			<Router>
				<Header />
				<main>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='*' element={<Error />} />
							<Route path='/:country' element={<Country />} />
						</Routes>
					</div>
				</main>
			</Router>
		</>
	);
}

export default App;
