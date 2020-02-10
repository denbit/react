import React, {Component} from 'react';
import Rotator from '../rotator/Rotator';
import ContactForm from '../contacts';
import Blank from "./Blank";
import * as start from '../start.html.json';
import * as about from '../about.html.json';
import * as calculation from '../calculation.html.json';
import {Route, Switch} from "react-router-dom";
import Nav from './Nav';
import Screen from './Screen';

class Main extends Component {
	constructor(props) {
		super(props);
		this.goTo = this.goTo.bind(this);
		this.state = {
			options: {
				start: start.content,
				about: about.content,
				calculation: calculation.content,
				contacts: ContactForm
			},
			current: "start"

		}
	}

	goTo(e, props) {
		e.preventDefault();
		this.setState({current: props});
	}

	renderRouteComponent(element) {
		return (props) => <Screen
			className={'main_screen'}
			page={this.state.options[element]}
			{...props.match}
		/>
	}

	render() {
		return (
			<section className="body">
				<Nav navigateTo={this.goTo}/>
				<p style={{fontSize: 30 + 'px'}}>
					<Blank text={'beforeSlider'}/>
				</p>
				<div className={'rotator_place'}>
					<Rotator/>
				</div>
				<Switch>
					<Route exact={true} path={'/'}
						   render={this.renderRouteComponent('start')}/>
					<Route path={'/about'}
						   render={this.renderRouteComponent('about')}/>
					<Route path={'/calculation'}
						   render={this.renderRouteComponent('calculation')}/>
					<Route path={'/contacts'}
						   render={this.renderRouteComponent('contacts')}/>
				</Switch>
			</section>
		);
	}

}

export default Main;