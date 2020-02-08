const firebase = require('firebase-admin');

const conifg = require('../config/firebase');

// [START initialize]
function initializeApp() {
  firebase.initializeApp({
    credential: firebase.credential.cert(conifg.serviceAccountJson)
  });

  const db = firebase.firestore();
  // [START_EXCLUDE]
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  // [END_EXCLUDE]

  // [END initialize_app]
  return db;
}

const db = initializeApp();

/**
 * Set to firebase dragon info.
 * @param dragon Dragon object. 
 * @param key Key for value.
 * @example
 *  setDragon({
 *    id: 1,
 *    genColor: '0-143-0-2-2-0-3-2-0-2-0-3-4-3-0-1-7-2-2-0-189-0-0-2-3-2-1-0-0-0-0-0',
 *    battleGen: '0-190-255-255-255-226-195-255-231-255-255-154-255-255-255-203-94-68-42-116-98-122-69-149-111-232-31-140-249-140-67',
 *    generated: false
 * });
 */
function setDragon(dragon, key = 'dragoneth') {
  [
    'id',
    'genColor',
    'battleGen',
    'generated'
  ].forEach((requireKey) => {
    if (!(requireKey in dragon)) {
      throw new Error(`${requireKey} is required.`);
    }
  });

  const setDoc = db
    .collection(key)
    .doc(String(dragon.id))
    .set(dragon);

  return setDoc.then(res => {
    dragon,
    key,
    res
  });
}

/**
 * Will respond the last dragon data.
 * @param limit dragons in response.
 * @param key database key.
 * @example
 * getLastDragon().then(/ do somthing /);
 */
function getLastDragon(limit = 1, key = 'dragoneth') {
  const dragonRef = db.collection(key);

  let lastDragon = dragonRef
    .orderBy('id', 'desc')
    .limit(limit);

  return lastDragon
    .get()
    .then((res) => res.docs.map(
      (doc) => doc.data())
    );
}

module.exports = {
  setDragon,
  getLastDragon
};
