import { openDB } from 'idb';

const initdb = async () =>
// make sure the database exists, if not create it, version 1 
  openDB('jate', 1, {
    // upgrade adds the schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // creates a new object store and gives it a key Id, autoincrementing
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to the database with correct version
  const jateDB = await openDB('jate', 1);
  // create a transaction
  const tx = jateDB.transaction('jate', 'readwrite');
  // get the object store
  const store = tx.objectStore('jate');
  // add the content to the store
  const request = store.put({ id:1, value: content });
  // wait for the request to finish
  const result = await request;
  // log the result
  console.log('Data saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved', result);
  return result;
};

initdb();
