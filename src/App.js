import React, {Component} from 'react';
import style from './App.scss';
import {LanguageList} from './Languages';
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import Blank from "./Blank"
import * as Cookies from "js-cookie";

export const Language = React.createContext({filler: {}, slides: {}});
export const menulist = new Array("UA", "PL", "EN", "RU");
export const title_text = "Chemistry CODE";
export const LanguageCache = {};
console.log(LanguageList);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			language: {}
		};
		this.changeLang = this.changeLang.bind(this);
	}

	loadLangs = async (language) => {
		const loadedLanguage = await LanguageList(language);
		this.setState({language: loadedLanguage});
	};

	async componentWillMount() {
		await this.loadLangs();
		LanguageCache.ua = this.state.language;
	}

	changeLang(event) {
		const targetLanguage = event.target.innerHTML;
		if (targetLanguage in LanguageCache) {
			this.setState({language: LanguageCache[targetLanguage]});
		} else {
			this.loadLangs(targetLanguage)
				.then(() => LanguageCache[targetLanguage] = {...this.state.language});
		}
		Cookies.set('lang', targetLanguage, {expires: 30})
	}

	render() {
		return (
			<Language.Provider value={this.state.language}>
				<div className={style.App}>
					<Blank text="head"/>
					<Header languageSwitcher={this.changeLang}/>
					<Main/>
					<Footer/>
				</div>
			</Language.Provider>
		);
	}
}
export default App;