import './styles/index.scss';

import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Table from './Table';
import Main from './Main';
import GameList from './GameList';
import CreateGame from './CreateGame';
import NotFound from './NotFound';

const app = document.getElementById('app');

const router = <Router history={hashHistory}>
	<Route path='/games' component={GameList} />
	<Route path='/games/:gameID' component={Table} />
	<Route path='new-game' component={CreateGame} />
	<Route path='/' component={Main} />
	<Route path='*' component={NotFound} />
</Router>;

render(router, app);
