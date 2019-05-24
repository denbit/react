import React, {Component} from 'react';
import './App.css';
import {LanguageList} from './Languages';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';

export const Language = React.createContext({filler: {}, slides: {}});
export const menulist=new Array("UA","PL","EN","RU");
export const title_text="Chemistry CODE";
const LanguageCache = {};
console.log(LanguageList);


class Blank extends Component{
    static defaultProps={text:"default"};
    render(){
        return (
            <Language.Consumer>
                {language => {
                    if (language.filler===undefined){
                    return <div className="blank" >Loading...</div>
                        }else{ console.log(language);
                    return <div className="blank" >{language.filler[this.props.text]}</div>
                        }
                    }
                }
            </Language.Consumer>

        )
    }
}



class App extends Component {
     constructor (props) {
        super(props);
        this.loadLangs=LanguageList.bind(this);
        this.changeLang = this.changeLang.bind(this);
        this.state={
            language:{},
            selectedLang:'ua'
        }
    }

   async componentWillMount() {
      await  this.loadLangs();
       LanguageCache.ua = this.state.language;
       // setTimeout(()=>this.setState({language:LanguageList['ua']}),100);
    }
     changeLang(e){
    //alert(e.target.innerHTML);
        if ( e.target.innerHTML in LanguageCache){
            this.setState({language:LanguageCache[e.target.innerHTML]});
        }else
        this.loadLangs(e.target.innerHTML);
         LanguageCache[e.target.innerHTML] = this.state.language;
        console.log(LanguageCache);
    }

    render() {
    return (
        <Language.Provider value={this.state.language} >
      <div className="App">
          <Blank text="head"/>
        <Header switcher={this.changeLang}/>
        <Main/>
        <Footer/>
      </div>
        </Language.Provider>
    );
  }
}
export  {Blank};
export default App;
