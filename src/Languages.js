import {ini} from './ini';
export const LanguageList = async function (lang = 'ua') {
	const list = {ua: {}, pl: {}, en: {}};

	const inifile = await fetch('/languages/' + lang + '.ini');
	const text = await inifile.text();
    console.log(list);
	list[lang] = ini.decode(text);
	return  list[lang];
};
