//@flow
import IndexedDB from './indexedDB'

type indexedDBEntries = {
	name: string,
	size: number,
	type: string,
	content: string,
	userId: number,
}

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

function prepareValuesForIndexedDB(fileMap: Map<File,string>, userId: number) {
	const entriesValues = fileMap.entries();
	const resultArray = [];
	for (let [file, content] of entriesValues) {
		const objectForIndexedDB: indexedDBEntries = {};
		const {name, size, type} = file;
		objectForIndexedDB.name = name;
		objectForIndexedDB.size = size;
		objectForIndexedDB.type = type;
		objectForIndexedDB.content = content;
		objectForIndexedDB.userId = userId;
		resultArray.push(objectForIndexedDB);
	}
	addFileToDB(resultArray)
}

export function setToIndexedDB(input, userId) {
	const result = readFiles(input);
	result.then((fileMap) => prepareValuesForIndexedDB(fileMap, userId)).catch(console.error);
}


function addFileToDB(value) {
    console.log(value);
    IndexedDB.get().openDBConnection().then((db) => {
		db.onerror = function (event) {
			console.log('Error creating/accessing IndexedDB database', event);
		};
		var transaction = db.transaction(["files"], 'readwrite');
		transaction.oncomplete = () => console.info('Opened a transaction to the database');
		transaction.onerror = () => console.error('Aborted a transaction to the database');
		let idbObjectStore = transaction.objectStore("files");
		value.forEach((item) => {
			idbObjectStore.add(item)
		})
	})
		.catch((err) => {
			console.error('Error: ' + err)
		})
}
