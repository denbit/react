import React, {Component} from 'react'
import Rotator from './Rotator'
import ContactForm from './contacts';
import {Blank, Language} from "./App";
import * as start from './start.html.json';
import * as about from './about.html.json';
import * as calculation from './calculation.html.json';


function updateText(text) {
	this.setState(text)
}

class NavElement extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="menu_item">
			<a onClick={(e) => this.props.goTo(e, this.props.link)} href={this.props.link}> {this.props.text}</a>
		</div>);
	}
}

class Nav extends Component {
	render() {

		return (<nav className="menu">
			<Language.Consumer>
				{language => {
					return (
						<React.Fragment>
							<NavElement link="about" goTo={this.props.click} text={language.about}/>
							<NavElement link="calculation" goTo={this.props.click}  text={language.calculation}/>
							<NavElement link="contacts" goTo={this.props.click}  text={language.contacts}/>
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

	componentDidMount() {
		if ((typeof this.props.page)==='string')
			this.ref.current.innerHTML = this.props.page;

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if ((typeof this.props.page)==='string')
			this.ref.current.innerHTML = this.props.page;
	}

	render() {
		let atrs=Object.assign({},this.props);
		const page = this.props.page;
		delete atrs.page;
		 if ((typeof this.props.page)==='string'){
			 return (
				 <div ref={this.ref} {...atrs}></div>
			 );
		 } else{
			 return (
				 <div {...atrs}>{page}</div>
			 );
		 }

	}

}

class Main extends Component {
	constructor(props){
		super(props);
		this.goTo = this.goTo.bind(this);
		this.state={options:{
                start:start.content,
                about:about.content,
                calculation:calculation.content,
				contacts:<ContactForm></ContactForm>
			},
			current:"start"

		}
	}
	goTo(e, props) {
		const title="Chemistry CODE";
		e.preventDefault();
		const state=props;
		this.setState({current:state})
		window.history.pushState('', '', '/'+state);
		document.title = title+' :: '+state[0].toUpperCase()+state.substr(1);

	}
	render() {
		return (
			<div className="body">
				<Nav click={this.goTo}/>
				<p style={{fontSize: 30 + 'px'}}>
					<Blank text={'beforeSlider'}/>
				</p>
				<div className={'rotator_place'}>
					<Rotator/>
				</div>
				<Screen className={'main_screen'} page={this.state.options[this.state.current]}></Screen>

			</div>
		);
	}

}

export default Main;