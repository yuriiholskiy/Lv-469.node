class IndexedDB {
  constructor(options) {
    this.request = window.indexedDB.open(options.DBName, options.DBVersion);
    this.request.onupgradeneeded = options.onUpgrageNeeded;
    this.request.onsuccess = options.onSuccess;
    this.request.onerror = options.onError;
    this.store = options.store;
  }
  addOneDocument(obj, render = () => {}) {
    const tx = this.request.result.transaction([this.store], 'readwrite');
    const store = tx.objectStore(this.store);
    const data = obj;
    store.add(data);
    tx.oncomplete = () => { this.getAndDisplayData(render) };
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
    return allData;
  }
  clearDB(name) {
    const tx = this.request.result.transaction([this.store], 'readwrite');
    const store = tx.objectStore(this.store);
    store.clear();
  }
}
