/*eslint "no-unused-vars": "off"*/
import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
	render() {
		const hash = location.hash;
		const page = hash.slice(1, hash.indexOf('?'));
		return <div>
			<h1>We couldn't find the page: {page}</h1>
			<Link to='/'>Back to the homepage</Link>
		</div>;
	}
}

export default NotFound;
