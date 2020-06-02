import * as config from '../config/index';
import React from 'react';
import {Link} from 'react-router-dom';

const Title = (props) => (
    <div className="title">
        <Link to={'/'} onClick={()=> props.goTo('start')} >
            {config.TITLE_TEXT}
        </Link>
    </div>);
export default Title;
