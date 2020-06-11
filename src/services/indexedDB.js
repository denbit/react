//@flow
type IDBObject = {
    factory: IDBFactory,
    transaction: Object,
    keyRange: Object,
};

const getIDBCollection = (): IDBObject => ({
    factory: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB,
    transaction: window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction ||
        window.msIDBTransaction,
    keyRange: window.IDBKeyRange || window.webkitIDBKeyRange,
});
export const CONSTRAINT_ERROR = 0;
class IndexedDB {
    static version = 3;
    static instance: IndexedDB;
    createFunctions:Set<Function>;
    notifyIsShown:boolean=false;

    constructor() {
        IndexedDB.instance = this;
        this.createFunctions=new Set();// $FlowFixMe
        this.initiateCreate=this.initiateCreate.bind(this);// $FlowFixMe
        this.setNotify=this.setNotify.bind(this);// $FlowFixMe
        this.getNotify=this.getNotify.bind(this);
        this.checkVersion();

    }

    static get(){
        if (!this.instance) {
            new IndexedDB();
        }
        return this.instance;
    }
    checkVersion(){
        const {factory} = getIDBCollection();
        var DBConnection:any = factory.open('chemDB');
        DBConnection.onsuccess = () => {
            console.log(`Current version is ${DBConnection.result.version}`);
        };

    }
    addCreateFunction(createFunction:Function) {
        this.createFunctions.add(createFunction);
    }

    initiateCreate(event:any) {
        console.log(`Next version is ${IndexedDB.version}`);
        console.info(`Initiating db creation, current number of store constructors is ${this.createFunctions.size}`);
        this.createFunctions.forEach((fnName) => {
            fnName(event.target.result);
        });
    }

    setNotify(value:boolean){
        this.notifyIsShown=value;
    }
    getNotify(){
        return this.notifyIsShown;
    }
    openDBConnection():Promise<IDBDatabase> {
        // const notify = this.getNotify();
        // const setNotify = this.setNotify;
        return new Promise(((resolve, reject) => {
            const {factory} = getIDBCollection();
            var DBConnection:any = factory.open('chemDB', IndexedDB.version);
            DBConnection.onerror = (e) => reject(e);
            DBConnection.onupgradeneeded = this.initiateCreate;
            DBConnection.onsuccess = () => {
                const db:IDBDatabase=DBConnection.result;
                console.log('Getting DB');
                db.onversionchange = function () {
                    db.close();
                     // if (!notify){
                     //     setNotify(true);
                          alert('Please reload page. System is updating...');
                     //   //  window.location.reload(true);
                     // }
                };
                db.onerror = function (event) {
                    console.log('Error creating/accessing IndexedDB database', event);
                };
                resolve(db);
            };
        }));

    }
}

export default IndexedDB

