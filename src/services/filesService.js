//@flow
import {getIDBCollection, openDBConnection} from "./contentService";

IDBTransaction.READ_WRITE = 'readwrite';

function readFiles(input) {
	return new Promise((resolve, reject) => {
		const fileMap = new Map();
		Array.prototype.forEach.call(input.current.files, (file) => {
			try {
				const fr = new FileReader();
				fr.onload = (ev) => {
					fileMap.set(file, ev.target.result);
					if (fileMap.size === input.current.files.length) {
						resolve(fileMap);
					}
				};
				fr.readAsBinaryString(file);
			} catch (e) {
				reject(e);
			}
		});
	});
}

function prepareValuesForIndexedDB(fileMap: Map, userId: number) {
	const arrayValues = Array.from(fileMap);
	console.log('arrayValues', arrayValues)

}

export function setToIndexedDB(input, userId) {
	const result = readFiles(input);
	result.then((fileMap) => prepareValuesForIndexedDB(fileMap, userId)).catch(console.error);
}


function addFileToDB(value) {
	openDBConnection(function (event) {
		let db = event.target.result;
		if (!db.objectStoreNames.contains('files')) {
			const fileStore = db.createObjectStore('files', {autoIncrement: true});
			fileStore.createIndex('files_name', ['name', 'size'], {unique: true})
		}
	}).then((db) => {
		var {transaction: IDBTransaction} = getIDBCollection();
		db.onerror = function (event) {
			console.log('Error creating/accessing IndexedDB database');
		};
		var transaction = db.transaction(["files"], IDBTransaction.READ_WRITE);
		transaction.oncomplete = () => console.info('Opened a transaction to the database');
		transaction.onerror = () => console.error('Aborted a transaction to the database');
		var put = transaction.objectStore("files").add(value);
	})
		.catch((err) => {
			console.error('Error: ' + err)
		})
}