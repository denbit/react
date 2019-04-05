import React, { Component } from 'react';
import './App.css';
import {LanguageList} from './Languages';
//import logo from './logo.svg';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
export const Language=React.createContext();
export const menulist=new Array("UA","PL","EN","RU");
export const title_text="Chemistry CODE";

//console.log(LanguageList);


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
    constructor(props) {
        super(props);
        this.state={
            language:{},
            selectedLang:'ua'
        }
        this.loadLangs=LanguageList.bind(this);
        this.changeLang = this.changeLang.bind(this);
    }

    componentWillMount() {
        this.loadLangs();
       // setTimeout(()=>this.setState({language:LanguageList['ua']}),100);
    }
    changeLang(e){
    //alert(e.target.innerHTML);
        this.loadLangs(e.target.innerHTML);
    }

    render() {
    return (
        <Language.Provider value={this.state.language} >
      <div className="App">
          <Blank filler="&nbsp;"/>
        <Header switcher={this.changeLang}/>
        <Main/>
        <Footer/>
      </div>
        </Language.Provider>
    );
  }
}

export default App;
