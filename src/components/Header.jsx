import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
	const { darkTheme, toggleTheme } = useContext(ThemeContext);

	return (
		<header className='header'>
			<div className='header-container container flex'>
				<h1>Where in the world?</h1>
				<button className='theme-switcher flex' onClick={toggleTheme}>
					{darkTheme ? <FaSun /> : <FaMoon className='moon-icon' />}
					<span>{darkTheme ? 'Light' : 'Dark'} Mode</span>
				</button>
			</div>
		</header>
	);
}
export default Header;
