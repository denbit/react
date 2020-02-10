// @flow
import * as config  from '../config'
function getCached(): ?Object {
	console.info('test');
	return null;
}

export const getContentTranslation = async (section: string, language: string): Object => {
	let  content = getCached();

			if (content === null) {
				try {
					const fileHandle = await fetch('/content/'.concat(section, ".", language, '.json'));
					content = await fileHandle.json();
				}
				catch (e) {
					const fileHandle = await fetch('/content/'.concat(section, ".", config.DEFAULT_LANGUAGE, '.json'));
					content = await fileHandle.json();
				}
			}

	 return  content;
};


