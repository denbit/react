import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import Rotator from '../rotator/Rotator';
import Blank from './Blank';
import {withUserConsumer} from '../services/UserContext';
import Nav from './Nav';
import Screen from './Screen';
import * as config from '../config';
import Footer from "./Footer";
import Logout from './Logout';

class Main extends Component {
	static propTypes = {
		language: PropTypes.oneOf(config.MENULIST),
	};

	renderRouteComponent(element) {
		return (props) => <Screen language={this.props.language}
				className={'main_screen'}
				page={this.props.options[element]}
				{...props.match} router={props.history}
		/>;
	}

	render() {
        const isStartPage=this.props.current==='start';
		const data = {
			explain: "When we typically think of a GPU, we usually think of applications or programs that make intensive use of a graphical interface of some sort. Using a graphics card while gaming, for example, is one of the most popular ways to utilize the graphical rendering power of a GPU. A GPGPU (General Purpose Graphics Processing Unit) goes beyond traditional means. All modern GPUs are considered to be GPGPUs because they can be used not only for graphics but also to run calculations and perform tasks, just like CPUs can. When it comes to computational power, GPUs are outpacing even the most potent CPUs because of how they handle parallel processes. This means that they can run multiple operations with higher rates of speed than a CPU can. This makes utilizing a GPGPU the ideal choice for all current and future applications. "
		};
		const  text = 'GPUs are not just for games and other rendering services anymore.' +
			' This page will explain what a HPC is, what makes it different, ' +
			'and why it is important.';
		return (<>
				<section className="body">
					<Nav />
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
			<Footer contactData={data}  info={text}/>
			</>
		);
	}

}

export default withUserConsumer(Main);

