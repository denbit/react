import fallback from "./fallback";
import config from "./config";

/**
 * @param {object} container
 * @param {string} value
 * @returns {string}
 *
 * @author elika.filin@langivi.technology
 */
function translate(container, value) {
	const {defaultLanguage} = config;
	if (container && container[value]) {
		return container[value]
	} else {
		return fallback.loading[defaultLanguage]
	}
}

export {translate};