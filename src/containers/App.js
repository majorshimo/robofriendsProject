import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super() 
		//Important to know that if we will run a this.state function we need to run super()
		this.state = {
			robots: [],
			//here robots is a state, whereas in the robots.js file it is a prop
			searchfield: ''
		}
		//console.log('constructor');
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users => this.setState({robots: users}));
			//console.log('componentDidMount');
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render(){
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		//console.log('render');
		//the following if statement says that if the api cannot return anything or is taking too long
		// it will return a screen that says loading
		return !robots.length ? 
			<h1> Loading</h1> :
			(
				<div className = 'tc'>
					<h1 className ='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots ={filteredRobots}/>
					</Scroll>
				</div>
			);
		}
}

export default App;