/*eslint "no-unused-vars": "off"*/
// eslint doesn't understand JSX very well.

import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import React from 'react';
import DOM from 'react-dom';
import Table from './Table.jsx';
import Main from './Main.jsx';
import GameList from './GameList.jsx';
import CreateGame from './CreateGame.jsx';

class NotFound extends React.Component {
	constructor() {
		super();
	}
	render() {
		return <h1>Page not found :(</h1>;
	}
}

const app = document.getElementById('app');

const router = <Router history={hashHistory}>
	<Route path='/games' component={GameList} />
	<Route path='/games/:gameID' component={Table} />
	<Route path='new-game' component={CreateGame} />
	<Route path='/' component={Main} />
	<Route path='*' component={NotFound} />
</Router>;

DOM.render(router, app);
