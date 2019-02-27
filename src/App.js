import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
export const menulist=new Array("UA","PL","EN","RU");
export const title_text="Chemistry CODE";




class Blank extends Component{
    render(){
        return (
            <div className="blank">{this.props.filler}</div>
        )
    }
}



class App extends Component {
  render() {
    return (
      <div className="App">
          <Blank filler="&nbsp;"/>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
