import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {menulist, title_text} from "./App";

const Title = () => (<div className="title">{title_text}</div> );


function Lang(props) {
    return (<div className="lang" onClick={props.switcher}>{props.lang.toLowerCase()}</div>);
    }

class DateTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({date:new Date()});
    }
    render(){
        return (<span>{this.state.date.toLocaleString()}</span>)
    }
}

class LangPanel extends Component{
    render(){
        return (
            <div className="panel">
                <div><DateTicker date={new Date()}/></div>
                {menulist.map((lang,i)=><Lang key={lang.toString()} switcher={this.props.switcher} lang={lang} some={i} />)}
            </div> );
    }
}


class Header extends Component{

static propTypes = {
    languageSwitcher:PropTypes.func.isRequired
};
    render() {
        return (
            <header className="header">
                <Title/>
                <LangPanel switcher={this.props.languageSwitcher}/>
            </header>
        );
    }
}


export default Header
