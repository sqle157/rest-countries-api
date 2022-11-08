import { useState } from 'react';
// Icons & Components
import { FaAngleDown } from 'react-icons/fa';
import SelectDropDown from './SelectDropDown';

function SelectGroup() {
	const [dropDown, setDropDown] = useState(false);

	return (
		<div className='select-group'>
			<button
				className='select-btn flex'
				onClick={() => setDropDown((prevState) => !prevState)}>
				Filter by Region
				<FaAngleDown className='arrow' />
			</button>

			{dropDown && <SelectDropDown setDropDown={setDropDown} />}
		</div>
	);
}
export default SelectGroup;
