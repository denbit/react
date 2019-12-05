import React, {Component} from 'react'
import Rotator from './Rotator'
import ContactForm from './contacts';
import {Blank, Language} from "./App";
import * as start from './start.html.json';
import * as about from './about.html.json';
import * as calculation from './calculation.html.json';
import { Switch, Route,  Link } from "react-router-dom";

function updateText(text) {
	this.setState(text)
}

class NavElement extends Component {
	render() {
		return (<div className="menu_item">
			<Link to={'/'+this.props.link} >
					{this.props.text}
			</Link>
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
		if ( ((typeof this.props.page)==='object') && ((typeof prevProps.page)==='string') ){
			console.log(" thanging type of content ");
}

	}

	render() {
		const atrs = Object.assign({},this.props);
		const page = this.props.page;
		delete atrs.page;
		 if ((typeof this.props.page)==='string'){
			 return (
				 <div ref={this.ref} ></div>
			 );
		 } else{
			 this.ref.current.innerHTML ='';
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
		e.preventDefault();
		const state= props;
		this.setState({current:state})

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
				<Switch>
					<Route exact={true} path={'/'}
							   render={(props)=><Screen className={'main_screen'}
														page={this.state.options['start']}/>}/>
					<Route path={'/about'}
						   render={(props)=><Screen className={'main_screen'}
													page={this.state.options['about']}/>}/>
					<Route path={'/calculation'}
						   render={(props)=><Screen className={'main_screen'} {...props.match}
													page={this.state.options['calculation']}>{props.match}</Screen>}/>
					<Route path={'/contacts'}
						   render={(props)=><Screen className={'main_screen'} {...props.match}
													page={this.state.options['contacts']}>{props.match}</Screen>}/>

				</Switch>


			</div>
		);
	}

}

export default Main;