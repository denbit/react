import React, {Component} from 'react';
import style from './App.scss';
import {LanguageList} from './Languages';
import Header from './header/Header'
import Main from './content/Main'
import Footer from "./Footer";
import Blank from "./content/Blank"
import * as Cookies from "js-cookie";
import * as config from './config/index';

export const Language = React.createContext({filler: {}, slides: {}});
// eslint-disable-next-line no-array-constructor
const LanguageCache = {};

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
        let lang = Cookies.get('lang');
		if (!lang) {
			lang = "ua";
		}
		await this.loadLangs(lang);
		LanguageCache[lang] = this.state.language;
	}

	changeLang(event) {
		const targetLanguage = event.target.innerHTML;
		if (targetLanguage in LanguageCache) {
			this.setState({language: LanguageCache[targetLanguage]});
		} else {
			this.loadLangs(targetLanguage)
				.then(() => LanguageCache[targetLanguage] = {...this.state.language});
		}
		Cookies.set('lang', targetLanguage, {expires: config.COOCKIE_EXPIRES})
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