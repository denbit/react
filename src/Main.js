import React, {Component} from 'react'
import Rotator from './Rotator'
import {Blank, Language} from "./App";
import * as s from './start.json';


function updateText(text) {
	this.setState(text)
}

class NavElement extends Component {
	constructor(props) {
		super(props);
		this.goTo = this.goTo.bind(this);
	}

	goTo(e, props) {
		e.preventDefault();
		updateText({page: props});

	}

	render() {
		return (<div className="menu_item">
			<a onClick={(e) => this.goTo(e, this.props.link)} href={this.props.link}> {this.props.text}</a>
		</div>);
	}
}

class Nav extends Component {
	render() {

		return (<nav className="menu">
			<Language.Consumer>
				{language => {
					console.log(language);
					return (
						<React.Fragment>
							<NavElement link="about" text={language.about}/>
							<NavElement link="calculation" text={language.calculation}/>
							<NavElement link="contacts" text={language.contacts}/>
						</React.Fragment>)
				}
				}
			</Language.Consumer>
		</nav>);

	}
}


class Screen extends Component {
	constructor(props) {
		super(props);
		this.state = {page: 'main'};
		this.ref = React.createRef();
		updateText = updateText.bind(this);



	}
	load(){
		console.log("strin is:  "+s.content);
	}

	componentDidMount() {
		this.ref.current.innerHTML = this.props.page;
        this.load();

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.ref.current.innerHTML = this.props.page;
	}

	render() {

		return (
			<div ref={this.ref}>{this.props.page}</div>
		);
	}

}

class Main extends Component {
	render() {
		return (
			<div className="body">
				<Nav/>
				<p style={{fontSize: 30 + 'px'}}>
					<Blank text={'beforeSlider'}/>
				</p>
				<div className={'rotator_place'}>
					<Rotator/>
				</div>
				<Screen page={"h"}></Screen>

			</div>
		);
	}

}

export default Main;