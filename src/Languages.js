import ini from 'ini';

export const LanguageList = async function (lang = 'ua') {
	const list = {ua: {}, pl: {}, en: {}};

	const inifile = await fetch('/languages/' + lang + '.ini');
	const text = await inifile.text();
	list[lang] = ini.parse(text);
	return  list[lang];
};