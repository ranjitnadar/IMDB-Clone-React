import React, { Component } from 'react';

import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom';
import Login from './components/login';
import MovieList from './components/movielist';
import MovieDetail from './components/moviedetail';
import PageNotFound from './components/PageNotFound';

import './App.css';

class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Redirect exact from="/" to="login"/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/movie" component={MovieList}/>
					<Route exact path="/movie/:movieId" component={MovieDetail}/>
					<Route path="**" component={PageNotFound} />
				</Switch>
			</Router>
		);
	}
}
export default App;
