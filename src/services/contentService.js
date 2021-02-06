// @flow
import * as config from '../config';

type IDBObject = {
	factory: IDBFactory,
	transaction: Object,
	keyRange: Object,
};
const getIDBCollection = (): IDBObject => ({
	factory: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB,
	transaction: window.IDBTransaction || window.webkitIDBTransaction,
	keyRange: window.IDBKeyRange || window.webkitIDBKeyRange,
});
var dbvers = 1;

function getCached(key): ?Object {

	return openDBConnection().then((db) => {

		const storeList = db.objectStoreNames;
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

var createObjectStores = function (db) {
	console.error(2);
	const storeList = db.objectStoreNames;
	if (!storeList.contains('content')) {
		const contentStore = db.createObjectStore('content');
		console.log('Creating objectStore');
		contentStore.createIndex('name_idx', 'name');

	}

};

function openDBConnection() {
	return new Promise(((resolve, reject) => {
		const {factory} = getIDBCollection();
		var DBConnection = factory.open('chemDB', dbvers);
		console.info('Trying to open connection');
		DBConnection.onerror = (e) => reject(e);
		DBConnection.onupgradeneeded = (event) => {
			console.info('Creating new db');
			createObjectStores(event.target.result);

		};
		DBConnection.onsuccess = () => {
			console.log('Getting DB');
			resolve(DBConnection.result);
		};
	}));

}

async function setToCache(key, value) {
	return openDBConnection().then(db => {
		db.onversionchange = function () {
			db.close();
			alert('Please reload page. System is updating...');
		};
		db.onerror = function (event) {
			console.log('Error creating/accessing IndexedDB database');
		};
		if (db.setVersion && db.version !== dbvers) {
			var setVersion = db.setVersion(dbvers);
			setVersion.onsuccess = function () {
				createObjectStores(db);
			};
		}
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
		const token = window.token || 'WVhCcFFHbHY=';
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


