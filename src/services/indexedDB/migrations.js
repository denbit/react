//@flow
import IndexedDB from '../indexedDB'
const IDB:IndexedDB = IndexedDB.get();

IDB.addCreateFunction(function (db:IDBDatabase) {
    const storeList:any = db.objectStoreNames;
    if (!storeList.contains('files')) {
        const fileStore = db.createObjectStore('files', {autoIncrement: true});
        fileStore.createIndex('files_name', ['name', 'size'], {unique: true})
    }
});
IDB.addCreateFunction(function (db:IDBDatabase) {
    console.error(2);
    const storeList:any = db.objectStoreNames;
    if (!storeList.contains('content')) {
        const contentStore = db.createObjectStore('content');
        console.log('Creating objectStore');
        contentStore.createIndex('name_idx', 'name');
    }
    if (!storeList.contains('files')) {
        const filesStore = db.createObjectStore('files');
        console.log('Creating objectStore files');
        filesStore.createIndex('name_idx', 'name');
    }

});
