import React, {Component} from 'react';
import style from './App.scss';
import {LanguageList} from './Languages';
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";

export const Language = React.createContext({filler: {}, slides: {}});
export const menulist = new Array("UA", "PL", "EN", "RU");
export const title_text = "Chemistry CODE";
const LanguageCache = {};
console.log(LanguageList);
 console .log(gefwgsegbgcb rgdrtdgdtgtfhgrdexes)
const Blank = (props) => {
	return (
		<Language.Consumer>
			{language =>
				(
					language.filler === undefined
						?
						(<p className="blank">Loading...</p>)
						:
						(<p className="blank">{language.filler[props.text]}</p>)
				)
			}
		</Language.Consumer>
	)
};
Blank.defaultProps = {text: "default"};

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
		console.log(LanguageCache);
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
export {Blank};
export default App;
