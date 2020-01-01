import Slide from "./Slide";
import React from 'react';
import * as config from '../config/index';
import PropTypes from "prop-types";

function Slider(props) {
    return (<div className="slider">{}
        <div className="ssl" style={{marginLeft: +props.position + 'px'}}>
            {config.SLIDES.map((slide, i) => {

                return (<Slide key={i} src={slide.src} text={slide.text}/>)

            })}
        </div>
    </div>);
}
Slider.propTypes = { position: PropTypes.number.isRequired};
export default Slider