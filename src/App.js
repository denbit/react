import React, {Component} from 'react';
import style from './App.scss';
import {LanguageList} from './Languages';
import Header from './header/Header'
import Main from './content/Main'

import Blank from "./content/Blank"
import * as Cookies from "js-cookie";
import * as config from './config';

export const Language = React.createContext({filler: {}, slides: {}});
// eslint-disable-next-line no-array-constructor
const LanguageCache = {};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			language: {},
			contentLanguage: Cookies.get('lang')?  Cookies.get('lang'): config.DEFAULT_LANGUAGE
		};
		this.changeLang = this.changeLang.bind(this);
	}

	loadLangs = async (language) => {
		const loadedLanguage = await LanguageList(language);
		this.setState({
			language: loadedLanguage,
			contentLanguage: language,
		});
	};

	async componentWillMount() {
        let lang = Cookies.get('lang');
		if (!lang) {
			lang = "ua";
		}
        console.log(style);
		await this.loadLangs(lang);
		LanguageCache[lang] = this.state.language;
	}

	changeLang(event) {
		const targetLanguage = event.target.innerHTML;
		if (targetLanguage in LanguageCache) {
			this.setState({
				language: LanguageCache[targetLanguage],
				contentLanguage: targetLanguage,
			});
		} else {
			this.loadLangs(targetLanguage)
				.then(() => LanguageCache[targetLanguage] = {...this.state.language});
		}
		Cookies.set('lang', targetLanguage, {expires: config.COOCKIE_EXPIRES})
	}

	render() {

		return (
			<Language.Provider value={this.state.language}>
				<div  className={'App'}>
					<Blank text="head"/>
					<Header languageSwitcher={this.changeLang}/>
					<Main language={this.state.contentLanguage}/>

				</div>
			</Language.Provider>
		);
	}
}
export default App;
