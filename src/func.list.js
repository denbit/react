import fallback from "./fallback";
import * as config from "./config/index.js";

/**
 * @param {object} container
 * @param {string} value
 * @returns {string}
 *
 * @author elika.filin@langivi.technology
 */
function translate(container, value) {
	const defaultLanguage = config.DEFAULT_LANGUAGE;
	if (container && container[value]) {
		return container[value]
	} else {
		return fallback.loading[defaultLanguage]
	}
}
export {translate};