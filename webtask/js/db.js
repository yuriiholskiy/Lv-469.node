class IndexedDB {
  constructor(options) {
    this.DBName = options.DBName;
    this.request = window.indexedDB.open(this.DBName, options.DBVersion);
    this.request.onupgradeneeded = options.onUpgrageNeeded;
    this.request.onsuccess = options.onSuccess;
    this.request.onerror = options.onError;
    this.store = options.store;
  }
  addOneDocument(data, render = () => {}) {
    const tx = this.request.result.transaction([this.store], 'readwrite');
    const store = tx.objectStore(this.store);
    store.add(data);
    tx.onerror = (event) => {
      console.log('error storing note ' + event.target.errorCode);
    }
  }
  getAndDisplayData(render) {
    const tx = this.request.result.transaction([this.store], 'readonly');
    const store = tx.objectStore(this.store);
    const req = store.openCursor();
    const allData = [];

    req.onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor !== null) {
        allData.push(cursor.value);
        cursor.continue();
      } else {
        render(allData);
      }
    }
  }
  clearDB() {
    const deletedDB = window.indexedDB.deleteDatabase(this.DBName);
    deletedDB.onsuccess = () => {
      console.log(`[DB with name ${this.DBName} is deleted successfully]`);
    };
  }
}
