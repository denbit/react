import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Rotator from '../rotator/Rotator';
import ContactForm from './ContactForm';
import Calculation from './Calculation/Calculation';
import Blank from './Blank';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {withUserConsumer} from '../services/UserContext';
import Nav from './Nav';
import Screen from './Screen';
import {getContentTranslation} from '../services/contentService';
import * as config from '../config';
import Footer from "./Footer";
import {WrappedProfile} from './Profile/ProfileWrapper';
import Login from './Login';
import Logout from './Logout';

let goTo;
class Main extends Component {
	constructor(props) {
		super(props);
		goTo = this.goTo = this.goTo.bind(this);
		this.state = {
			options: {
				calculation: Calculation,
				contacts: ContactForm,
				start: 'null',
				about: 'null',
                profile:WrappedProfile,
                login: Login
			},
			current: 'start',

		};
	}

	static propTypes = {
		language: PropTypes.oneOf(config.MENULIST),
	};

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

	componentWillMount() {
		if (this.props.location.pathname.substr(1) in this.state.options) {
			this.setState({current: this.props.location.pathname.substr(1)})
		}
	}

	 componentDidMount() {
		this.updateContent();
		console.log("language changed", this.props.user);
	}

	async updateContent (language=''){
		let path;
		if (this.props.location.pathname !== "/")
			path = this.props.location.pathname.substr(1);
		else
			path = "start";

		const contentLanguage = await getContentTranslation(path,
				language ? language : this.props.language);
		this.setState(({options: prevOptions}) => ({
			options: {
				...prevOptions, [path]: contentLanguage.content,
			},
			current: path,
		}));
	}
	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.language !== this.props.language) {
			this.updateContent(nextProps.language);
			console.log("language chang34636ed");
		}
	}


	renderRouteComponent(element) {

		return (props) => <Screen
				className={'main_screen'}
				page={this.state.options[element]}
				{...props.match} router={props.history}
		/>;
	}

	render() {
        const isStartPage=this.state.current==='start';
		const data = {
			explain: "When we typically think of a GPU, we usually think of applications or programs that make intensive use of a graphical interface of some sort. Using a graphics card while gaming, for example, is one of the most popular ways to utilize the graphical rendering power of a GPU. A GPGPU (General Purpose Graphics Processing Unit) goes beyond traditional means. All modern GPUs are considered to be GPGPUs because they can be used not only for graphics but also to run calculations and perform tasks, just like CPUs can. When it comes to computational power, GPUs are outpacing even the most potent CPUs because of how they handle parallel processes. This means that they can run multiple operations with higher rates of speed than a CPU can. This makes utilizing a GPGPU the ideal choice for all current and future applications. "
		};
		const  text = 'GPUs are not just for games and other rendering services anymore.' +
			' This page will explain what a HPC is, what makes it different, ' +
			'and why it is important.';
		return (<>
				<section className="body">
					<Nav navigateTo={this.goTo}/>
					<p style={{fontSize: 30 + 'px'}}>
                        {isStartPage&&<Blank text={'beforeSlider'}/>}
					</p>
                    {isStartPage&&<div className={'rotator_place'}>
						<Rotator/>
					</div>}
					<Switch>
						<Route exact={true} path={'/'}
									 render={this.renderRouteComponent('start')}/>
						<Route path={'/about'}
									 render={this.renderRouteComponent('about')}/>
						<Route path={'/calculation'}
									 render={this.renderRouteComponent('calculation')}/>
						<Route path={'/contacts'}
									 render={this.renderRouteComponent('contacts')}/>
                        <Route path={'/login'}
                               render={this.renderRouteComponent('login')}/>
                        {this.props.user?<Route path={'/profile'}
                                render={this.renderRouteComponent('profile')}/>:<Redirect to='/'/> }
                        {this.props.user&&<Route path={'/logout'} component={Logout} />}
					</Switch>
				</section>
			<Footer contactData={data} forNav={this.goTo} info={text}/>
			</>
		);
	}

}

export default withUserConsumer(withRouter(Main));
export {goTo}
