import React, {Component, Fragment} from 'react';
import {Language} from "./App";
import PropTypes from 'prop-types';
import {translate} from "./func.list";
const slides = [
	{src: 'imgs/im_c.jpg', text: "C"},
	{src: 'imgs/im_a.jpg', text: "A"},
	{src: 'imgs/im_b.png', text: "B"},
	{src: 'imgs/im_c.jpg', text: "C"},
	{src: 'imgs/im_a.jpg', text: "A"}
];

class Arrow extends Component {

	static propTypes={
		direction:PropTypes.oneOf(['arrow-prev','arrow-next']),
		ArrowClick:PropTypes.func.isRequired
	}
	render() {
		return (
			<div className={'slick'}>
				<button onClick={(event) => this.props.ArrowClick(event, this.props.direction)}
						className={'slick-arrow ' + this.props.direction}>{this.props.children}</button>
				<span className={'arrow-center'}></span>
			</div>
		);
	}

}

class Slide extends Component {
	constructor(props, context) {
		super(props, context);
	}
	static propTypes ={
		src:PropTypes.string,
		text:PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return this.context != nextContext;
	}

	render() {
		return (<Fragment>
			<Language.Consumer>
				{({slides}) => {
						return <div><h3>{translate(slides, this.props.text)}</h3><img src={this.props.src}/></div>
					}
				}
			</Language.Consumer>
		</Fragment>);
	}
}


function Slider(props) {
	return (<div className="slider">{}
		<div className="ssl" style={{marginLeft: +props.position + 'px'}}>
			{slides.map((slide, i) => {

				return (<Slide key={i} src={slide.src} text={slide.text}/>)

			})}
		</div>
	</div>);
}

class Rotator extends Component {

	step = 10;
	timeout = 50;

	constructor(props) {
		super(props);
		this.state = {
			currentPos: -800,
			interval: '',

			target: null
		};
	}

	checkLimitF() {
		const pos = this.state.currentPos;

		if (pos >= 0) {
			this.setState({currentPos: -1200, target: -1200});
		}
	}
	checkLimitB() {
		const pos = this.state.currentPos;

		if (pos <= -1200) {
			console.log("Limit:" + pos);
			this.setState({currentPos: 0, target: 0});
		}
	}


	moveB() {
		let pos = this.state.currentPos;
		let inter = setInterval(
			() => {
			pos = this.state.currentPos - this.step;

			this.setState({currentPos: pos, interval: inter});

			this.checkLimitB();

			if (this.state.target >= this.state.currentPos) {
				clearInterval(this.state.interval);
			}
			console.log(this.state.currentPos);
		},
		this.timeout);

	}

	moveF() {
		let pos = this.state.currentPos;
		let inter = setInterval(
			() => {
				pos = this.state.currentPos + this.step;

				this.setState({currentPos: pos, interval: inter});

				this.checkLimitF();

				if (this.state.target <= this.state.currentPos) {
					clearInterval(this.state.interval);
				}
				console.log(this.state.currentPos);
			},
			this.timeout);

	}

	handleClick(e, arg) {
		const move = 400;
		const pos = this.state.currentPos;
		console.log(pos);
		let target;
		switch (arg) {
			case 'arrow-prev':
				target = pos - move;
				this.setState({target: target});
				this.moveB();
				break;
			case 'arrow-next':
				target = pos + move;
				this.setState({target: target});
				this.moveF();
				break;

		}
		console.log(arg);
	}

	render() {
		return (
			<div className="slides">
				<Arrow ArrowClick={(target, arg) => this.handleClick(target, arg)}
					   direction="arrow-prev"> Previous</Arrow>

				<Slider position={this.state.currentPos}/>

				<Arrow ArrowClick={(target, arg) => this.handleClick(target, arg)}
                       direction="arrow-next">Next</Arrow>
			</div>
		);
	}

}

export default Rotator;
