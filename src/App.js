import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {LanguageList} from './Languages'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
export const menulist=new Array("UA","PL","EN","RU");
export const title_text="Chemistry CODE";
const Language=React.createContext({});




class Blank extends Component{
    render(){
        return (
            <Language.Consumer>
                {language => <div className="blank" >{this.props.filler+language.filler}</div> }
            </Language.Consumer>

        )
    }
}



class App extends Component {
  render() {
    return (
        <Language.Provider value={{filler:'філер'}}>
      <div className="App">
          <Blank filler="&nbsp;"/>
        <Header/>
        <Main/>
        <Footer/>
      </div>
        </Language.Provider>
    );
  }
}

export default App;
