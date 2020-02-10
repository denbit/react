import React, {Component} from 'react';
import Arrow from "./Arrow";
import Slider from "./Slider";
import * as config from '../config/index';

class Rotator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPos: config.CURRENT_POSITION,
			interval: '',
			target: null
		};
	}

	checkLimitF() {
		const pos = this.state.currentPos;
		if (pos >= config.CHECK_LIMIT_FORWARD) {
			this.setState({currentPos: config.CHANGE_CURRENT_POSITION_FORWARD, target: config.CHANGE_TARGET_FORWARD});
		}
	}
	checkLimitB() {
		const pos = this.state.currentPos;
		if (pos <= config.CHECK_LIMIT_BACKWARD) {
			this.setState({currentPos: config.CHANGE_CURRENT_POSITION_BACKWARD, target: config.CHANGE_TARGET_BACKWARD});
		}
	}

	moveB() {
		let pos = this.state.currentPos;
		let inter = setInterval(
			() => {
			pos = this.state.currentPos - config.STEP;

			this.setState({currentPos: pos, interval: inter});

			this.checkLimitB();

			if (this.state.target >= this.state.currentPos) {
				clearInterval(this.state.interval);
			}
		},
			config.TIMEOUT);

	}

	moveF() {
		let pos = this.state.currentPos;
		let inter = setInterval(
			() => {
				pos = this.state.currentPos + config.STEP;

				this.setState({currentPos: pos, interval: inter});

				this.checkLimitF();

				if (this.state.target <= this.state.currentPos) {
					clearInterval(this.state.interval);
				}
			},
			config.TIMEOUT);

	}

	handleClick(e, arg) {
		const pos = this.state.currentPos;
		console.log(pos);
		let target;
		switch (arg) {
			case 'arrow-prev':
				target = pos - config.MOVE;
				this.setState({target: target});
				this.moveB();
				break;
			case 'arrow-next':
				target = pos + config.MOVE;
				this.setState({target: target});
				this.moveF();
				break;

		}
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
