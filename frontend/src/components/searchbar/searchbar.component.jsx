/**
 * searchbar.component.jsx
 *
 * Acts as a searchbar for both the student enrolled classes table
 * and the courses available to enrol table.
 *
 * Author: Desmond Stular
 * Date: February 18, 2024
 */

import './searchbar.component.css';

const Searchbar = ({placeholder, handler}) => {
	return (
		<input type="search" placeholder={placeholder} onChange={handler}/>
	);
}

export default Searchbar;
