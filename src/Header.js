import {changeLang} from "./func.list";
import React, { Component } from 'react';
import { title_text , menulist } from "./App";
class Title  extends Component{
    render(){
        return(<div className="title">{title_text}</div> )
    }
}
class Lang extends Component{

    render(){
        return(<div className="lang" onMouseOver={() => console.log("Hovered!")} onClick={(e)=>this.props.switcher(e)}>{this.props.lang.toLowerCase()}</div>);
    }
}
class DateTicker extends Component{
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
        let td=<div><DateTicker date={new Date()}/></div>;
        return (
            <div className="panel">{td}
                {menulist.map((lang,i)=><Lang key={lang.toString()} switcher={this.props.switcher} lang={lang} some={i} />)}
            </div> );
    }
}


class Header extends Component{

    render() {
        return (
            <header className="header">
                <Title/>
                <LangPanel switcher={this.props.switcher}/>

            </header>
        );
    }


}
export default Header
