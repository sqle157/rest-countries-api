import { Link } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';
// Icons
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
	const { darkTheme, toggleTheme } = useThemeContext();

	return (
		<header className='header'>
			<div className='header-container container flex'>
				<Link to='/'>
					<h1>Where in the world?</h1>
				</Link>
				<button className='theme-switcher flex' onClick={toggleTheme}>
					{darkTheme ? <FaSun /> : <FaMoon className='moon-icon' />}
					<span>{darkTheme ? 'Light' : 'Dark'} Mode</span>
				</button>
			</div>
		</header>
	);
}
export default Header;
