import DateTicker from "./DateTicker";
import Lang from "./Lang";
import React, {Component} from 'react';
import * as config from '../config/index';
import PropTypes from "prop-types";

class LangPanel extends Component{
    static propTypes = {
        switcher: PropTypes.func.isRequired
    };
    render(){
        return (
            <div className="panel">
                <div>
                    <DateTicker date={new Date()}/>
                </div>
                {config.MENULIST.map((lang,i)=><Lang key={lang.toString()} switcher={this.props.switcher} lang={lang} some={i} />)}
            </div> );
    }
}

export default LangPanel