//@flow
import IndexedDB, {CONSTRAINT_ERROR} from './indexedDB'

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

function prepareValuesForIndexedDB(fileMap: Map<File, string>, userId: number) {
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
    return resultArray;
}

export function setToIndexedDB(input, userId) {
    const result = readFiles(input);
    return result.then((fileMap) => {
        const preparedFiles = prepareValuesForIndexedDB(fileMap, userId);
        return addFileToDB(preparedFiles)
    })
}

export function readKey(item: indexedDBEntries) {
    return IndexedDB.get().openDBConnection().then((db) => {
        return new Promise((resolve, reject) => {
            var readtransaction = db.transaction(["files"], 'readonly');
            let readidbObjectStore = readtransaction.objectStore("files");
            const index = readidbObjectStore.index('files_name');
            const request = index.getKey([item.name, item.size]);
            request.onsuccess = () => resolve({id: request.result, fileName: item.name});
            request.onerror = reject
        })
    })
}

function addFileToDB(value) {
    let dbConnection = IndexedDB.get().openDBConnection();
    return dbConnection.then((db) => {
        db.onerror = function (event) {
            console.error('Error creating/accessing IndexedDB database', event);
        };
        var transaction = db.transaction(["files"], 'readwrite');
        transaction.oncomplete = () => console.info('Opened a transaction to the database');
        transaction.onerror = () => console.error('Aborted a transaction to the database');
        let idbObjectStore = transaction.objectStore("files");
        const map = new Map();
        map.set('success', new Set());
        map.set('failed', new Set());
        const promiseMap = [];
        for (let item: indexedDBEntries of value) {
            promiseMap.push(promiseForEach(item, idbObjectStore, map));
        }
        return Promise.allSettled(promiseMap);
    })
}

function promiseForEach(item, idbObjectStore, map) {
    return new Promise((resolve, reject) => {
        const request = idbObjectStore.add(item);
        request.onsuccess = () => {
            map.get('success').add({id: request.result, fileName: item.name});
            resolve(map)
        }
        request.onerror = (err) => {
            if (err.target.error.code === CONSTRAINT_ERROR) {
                map.get('failed').add(item);
                err.preventDefault();
                reject(map);
            }
        }
    })
}

export function getAll() {

    return IndexedDB.get().openDBConnection().then((db) => {
        return new Promise((resolve, reject) => {
            const readtransaction = db.transaction(["files"], 'readonly');
            const readidbObjectStore = readtransaction.objectStore("files");
            const getAll = readidbObjectStore.getAll();
            getAll.onsuccess = () => {
                const getAllResult = getAll.result;
                const getAllKeys = readidbObjectStore.getAllKeys();
                getAllKeys.onsuccess = () => {
                    const keysResult = getAllKeys.result
                    const resultArray = [];
                    for (let i = 0; i < keysResult.length; i++) {
                        resultArray.push({id: keysResult[i], name: getAllResult[i].name})
                    }
                    resolve(resultArray)
                }
                getAllKeys.onerror = () => {
                    reject(console.error('Error: ' + getAllKeys.error))

                }
            }
        })

    })
}

export function readFile(ids) {
    return IndexedDB.get().openDBConnection().then((db) => {
        const readTransaction = db.transaction(["files"], 'readonly');
        const readIDBObjectStore = readTransaction.objectStore("files");

        return Promise.all(Array.from(ids.values()).map((id) => {
            return new Promise((resolve, reject) => {
                const getFile = readIDBObjectStore.get(id);

                getFile.onsuccess = () => {
                    getFile.result.id = id;
                    resolve(getFile.result);
                }
                getFile.onerror = () => reject(console.error('Error: ' + getFile.error))
        })
        }))
    })
}
