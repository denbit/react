import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import style from './App.scss';
import {LanguageList} from './Languages';
import Header from './header/Header';
import Main from './content/Main';
import Blank from './content/Blank';
import * as Cookies from 'js-cookie';
import * as config from './config';
import {withUserProvider} from './services/UserContext';
import {Language, LanguageCache} from './services/LanguageContext';
import {mockToken} from './services/mockService';
import {getContentTranslation} from './services/contentService';
import Calculation from './content/Calculation/Calculation';
import ContactForm from './content/ContactForm';
import {WrappedProfile} from './content/Profile/ProfileWrapper';
import Login from './content/Login';


mockToken();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: {},
            contentLanguage: Cookies.get('lang') ? Cookies.get('lang') : config.DEFAULT_LANGUAGE,
            options: {
                calculation: Calculation,
                contacts: ContactForm,
                start: 'null',
                about: 'null',
                profile: WrappedProfile,
                login: Login,
            },
            current: 'start',
        };
        this.changeLang = this.changeLang.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.goTo(this.getPage());
            console.log('update', this.props.location.pathname);
        }
        if(prevState.contentLanguage!==this.state.contentLanguage) {
            this.goTo(this.getPage());
            console.log('language changed', this.state.contentLanguage);
        }
    }

    loadLangs = async (language) => {
        const loadedLanguage = await LanguageList(language);
        this.setState({
            language: loadedLanguage,
            contentLanguage: language,
        });
    };
    getPage(){
        const path = this.props.location.pathname;
        const strippedPath = path.substr(1);
        if (strippedPath===''){
            return 'start';
        }
        else {
            return strippedPath;
        }
    }
    async componentDidMount() {
        await this.goTo(this.getPage());
    }

    async goTo(strippedPath) {

        if (strippedPath in this.state.options && typeof this.state.options[strippedPath] === 'string') {
            await this.updateContent(strippedPath); console.log('content  changed')
        }
        await this.setState({current: strippedPath});
    }

    async updateContent(path = '', language = '') {

        const contentLanguage = await getContentTranslation(path||this.state.current,
            language || this.state.contentLanguage);
        console.trace(path,this.state.current, language, contentLanguage);

        this.setState(({options: prevOptions}) => ({
            options: {
                ...prevOptions, [path||this.state.current]: contentLanguage.content,
            },
        }));
    }

    async componentWillMount() {
        let lang = Cookies.get('lang');
        if (!lang) {
            lang = 'ua';
        }
        console.log(style);
        await this.loadLangs(lang);
        LanguageCache[lang] = this.state.language;
    }

    changeLang(event) {
        const targetLanguage = event.target.innerHTML;
        if (targetLanguage in LanguageCache) {
            this.setState({...this.state,
                language: LanguageCache[targetLanguage],
                contentLanguage: targetLanguage,
            });
        } else {
            this.loadLangs(targetLanguage).then(() => LanguageCache[targetLanguage] = {...this.state.language});
        }
        Cookies.set('lang', targetLanguage, {expires: config.COOCKIE_EXPIRES});
    }

    render() {
        return (
            <Language.Provider value={this.state.language}>
                <div className={'App'}>
                    <Blank text="head"/>
                    <Header languageSwitcher={this.changeLang}/>
                    <Main options={this.state.options} language={this.state.contentLanguage}/>
                </div>
            </Language.Provider>
        );
    }
}

export default withUserProvider(withRouter(App));
