// @flow
import * as config from '../config';
import IndexedDB from './indexedDB';

function getCached(key): ?Object {

	return  IndexedDB.get().openDBConnection().then((db) => {
		const storeList:any=db.objectStoreNames;
		if (storeList.contains('content')) {
			let transaction = db.transaction('content', 'readonly');
			var contentStore = transaction.objectStore('content');
			transaction.oncomplete = () => console.info('Finished proccessing');
			transaction.onerror = () => console.error('Aborted proccessing');
			return new Promise(((resolve, reject) => {
				const getRequest = contentStore.index('name_idx').get(key);
				getRequest.onsuccess = e => {
					const data = getRequest.result;
					console.info('Reading record', key, e,
						data);
					resolve(data ? data : null);
				};
				getRequest.onerror = reject;
			}));

		}
	}).catch(console.debug);
}


async function setToCache(key, value) {
	return IndexedDB.get().openDBConnection().then(db => {
		// if (db.setVersion && db.version !== dbvers) {
		// 	var setVersion = db.setVersion(dbvers);
		// 	setVersion.onsuccess = function () {
		// 		createObjectStores(db);
		// 	};
		// }
		const storeList = db.objectStoreNames;
		if (storeList.contains('content')) {
			// Open a transaction to the database
			var transaction = db.transaction(['content'], 'readwrite');
			transaction.oncomplete = () => console.info('Finished proccessing');
			transaction.onerror = () => console.error('Aborted proccessing');
			var contentStore = transaction.objectStore('content');
			const countRequest = contentStore.count(key);
            console.info(key, 'setting it', countRequest);
			return new Promise((resolve, reject) => {
				countRequest.onsuccess = (e) => {
					console.log(e.target.result);
					if (e.target.result === 0) {
					    if (value.name!==key){
					        value.name=key
                        }
                        console.log(value,key);
						let putRequest = contentStore.put(value,key);
						putRequest.onsuccess = (e) => {
							console.log('put entry');
							resolve(e.target.result);
						};
						putRequest.onerror = (e) => reject(e);
					}
					resolve('Entry exists');
				};
				countRequest.onerror = (e) => reject(e);
			});

		} else
			return Promise.reject('The store does not exist');
	});

}

export const getContentTranslation = async (
	section: string, language: string): Object => {
	let content = await getCached(section + '_' + language + '.html');
	console.log('cached', section, language);
	if (content === null) {
		const token = window.token;
		const options = {
			'headers':
				{
					'Authorization': `Bearer ${token}`,
					'X-Requested-With': 'XMLHttpRequest',
				},
		};
		try {

			const fileHandle = await fetch(
				'http://192.168.1.6/api/content/'.concat(section, '_', language, '.html.json'),
				options);
			content = await fileHandle.json();
			console.log(
				await setToCache(section + '_' + language + '.html', content));
		} catch (e) {
			const fileHandle = await fetch(
				'api/content/'.concat(section, '_', config.DEFAULT_LANGUAGE,
					'.html.json'), options);
			content = await fileHandle.json();
		}
	}

	return content;
};


