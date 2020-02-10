// @flow
import * as config from '../config'

type IDBObject = {
    factory: IDBFactory,
    transaction: Object,
    keyRange: Object,
};
const getIDBCollection = (): IDBObject => ({
    factory: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB,
    transaction: window.IDBTransaction || window.webkitIDBTransaction,
    keyRange: window.IDBKeyRange || window.webkitIDBKeyRange
});

function getCached(): ?Object {
    console.info(getIDBCollection());
    return null;
}

var createObjectStore = function (dataBase) {
    // Create an objectStore
    console.log("Creating objectStore");

	dataBase.createObjectStore("content");
}

function setToCache(key, value) {
    const {factory, transaction, keyRange} = getIDBCollection();
    var dbvers = 1;
    const DBConnection = factory.open('chemDB', dbvers);

	DBConnection.onerror = console.error;
	DBConnection.onupgradeneeded = function (event) {
        createObjectStore(event.target.result);
    }
	DBConnection.onsuccess = (event) => {
        var db = DBConnection.result;
        db.onerror = function (event) {
            console.log("Error creating/accessing IndexedDB database");
        };
        if (db.version != dbvers) {
            var setVersion = db.setVersion(dbvers);
            setVersion.onsuccess = function () {
                createObjectStore(db);
            }
        }
        // Open a transaction to the database
        var transaction = db.transaction(["content"], 'readwrite');

        // Put the blob into the dabase
        var put = transaction.objectStore("content").put(value, key);


    };
}

export const getContentTranslation = async (section: string, language: string): Object => {
    let content = getCached();

    if (content === null) {
        try {

            const fileHandle = await fetch('/content/'.concat(section, "_", language, '.html.json'));
            content = await fileHandle.json();
            setToCache(section, content);
        } catch (e) {
            const fileHandle = await fetch('/content/'.concat(section, "_", config.DEFAULT_LANGUAGE, '.html.json'));
            content = await fileHandle.json();
        }
    }

    return content;
};


