import fallback from "./fallback";
import config from "./config";

function translate(container, value) {
	const {defaultLanguage} = config;
	if (container && container[value]) {
		return container[value]
	} else {
		return fallback.loading[defaultLanguage]
	}
}

export {translate};