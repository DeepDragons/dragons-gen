const firebase = require('firebase-admin');
const Rx = require('rxjs');

const conifg = require('../config/firebase');

// [START initialize]
// Initialize the app with a service account, granting admin privileges
const serviceAccount = require(conifg.serviceAccountJson);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${conifg.projectId}.firebaseio.com`
});

const db = firebase.database();
const ref = db.ref(conifg.clientName);

const watch = new Rx.Observable((observer) => {
  ref.child('unit').on('child_added', (snap) => {
    observer.next(snap);
  });
})

module.exports = {
  watch,
  clientRef: ref
};
