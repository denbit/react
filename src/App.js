import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {changeLang} from "./func.list";
var menulist=new Array("UA","PL","EN","RU");
var title_text="Chemistry CODE";

class Blank extends Component{
 render(){
   return (
       <div className="blank">{this.props.filler}</div>
   )
 }
}
class Title  extends Component{
  render(){
      return(<div className="title">{title_text}</div> )
  }
}
class Lang extends Component{
    render(){
        return(<div className="lang" onclick={changeLang}>{this.props.lang}</div>);
    }
}
class LangPanel extends Component{
   render(){
     return (
         <div className="panel">
            {menulist.map((lang,i)=>{
            return  <Lang lang={lang}/>})}
        </div>);
   }
}
class NavElement extends Component{
    render(){
        return(<div className="menu_item">
            <a href={this.props.link}> {this.props.text}</a>
        </div> );
    }
}
class Nav extends Component{
 render(){
      return (<nav className="menu">
        <NavElement link="about" text="Що таке Chemistry HPC"/>
        <NavElement link="calculation" text="Розрахунок спектрів"/>
        <NavElement link="contacts" text="Контакти"/>
     </nav>);

 }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Blank filler="text"/>

        <header className="header">
            <Title/>
            <LangPanel/>

        </header>
        <div className="body">
            <Nav/>
            <p style={{fontFamily:30+'px'}}>About block
        </p> </div>
      </div>
    );
  }
}

export default App;
