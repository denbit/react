import React, {Component} from 'react'
import Rotator from './Rotator'
import ContactForm from './contacts';
import {Language} from "./App";
import Blank from "./Blank"
import * as start from './start.html.json';
import * as about from './about.html.json';
import * as calculation from './calculation.html.json';
import {Link, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";


function updateText(text) {
	this.setState(text)
}

class NavElement extends Component {
	static propTypes = {
		link: PropTypes.string.isRequired,
		text: PropTypes.string,
		goTo: PropTypes.func.isRequired
	};

	render() {
		return (
			<div className="menu_item">
				<Link to={'/' + this.props.link}>
					{this.props.text}
				</Link>
			</div>);
	}
}

class Nav extends Component {
	static propTypes = {
		navigateTo: PropTypes.func.isRequired
	};

	render() {
		const {navigateTo} = this.props;
		return (<nav className="menu">
			<Language.Consumer>
				{language => (
					<React.Fragment>
						<NavElement link="about" goTo={navigateTo} text={language.about}/>
						<NavElement link="calculation" goTo={navigateTo} text={language.calculation}/>
						<NavElement link="contacts" goTo={navigateTo} text={language.contacts}/>
					</React.Fragment>)
				}
			</Language.Consumer>
		</nav>);
	}
}


class Screen extends Component {
	static propTypes = {
		page: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		])
	};

	constructor(props) {
		super(props);
		this.state = {
			page: 'main'
		};
		this.ref = React.createRef();
		updateText = updateText.bind(this);
	}

	componentDidMount() {
		if ((typeof this.props.page) === 'string')
			this.ref.current.innerHTML = this.props.page;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if ((typeof this.props.page) === 'string')
			this.ref.current.innerHTML = this.props.page;
		if (((typeof this.props.page) === 'object') && ((typeof prevProps.page) === 'string')) {
			console.log(" changing type of content ");
		}
	}

	renderString = (attrs) => (<div ref={this.ref} className={attrs.className}></div>);

	renderComponent = (Component, attrs) => (<div className={attrs.className}><Component/></div>);

	render() {
		const atrs = Object.assign({}, this.props);
		const Page = this.props.page;
		delete atrs.page;
		if (this.ref.current)
			this.ref.current.innerHTML = '';
		return (
			(typeof Page) === 'string' ? this.renderString(atrs) :
				this.renderComponent(Page, atrs)
		);
	}

}

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