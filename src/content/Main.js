import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Rotator from '../rotator/Rotator';
import ContactForm from '../contacts';
import Blank from './Blank';
import {Route, Switch, withRouter} from 'react-router-dom';
import Nav from './Nav';
import Screen from './Screen';
import {getContentTranslation} from '../services/contentService';
import * as config from '../config';

class Main extends Component {
	constructor(props) {
		super(props);
		this.goTo = this.goTo.bind(this);
		this.state = {
			options: {
				start: 'null',
				about: 'null',
				calculation: 'null',
				contacts: ContactForm,
			},
			current: 'start',

		};
	}

	static propTypes = {
		language: PropTypes.oneOf(config.MENULIST),
	};

	async componentDidMount() {

		const path = this.props.location.pathname.substr(1);
		this.setState({});
		const contentLanguage = await getContentTranslation(path,
				this.props.language);
		this.setState(({options: prevOptions}) => ({
			options: {
				...prevOptions, [path]: contentLanguage.content,
			},
			current: path,
		}));
	}

	async goTo(props) {
		if (this.state.options[props] === 'null') {
			const contentLanguage = await getContentTranslation(props,
					this.props.language);

			console.log(contentLanguage);
			this.setState(({options: prevOptions}) => ({
				options: {
					...prevOptions, [props]: contentLanguage.content,
				},

			}));
		}
		this.setState({current: props});

	}

	renderRouteComponent(element) {

		return (props) => <Screen
				className={'main_screen'}
				page={this.state.options[element]}
				{...props.match}
		/>;
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

export default withRouter(Main);
