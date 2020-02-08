require('custom-env').env();
const firebase = require('firebase-admin');

// TODO(DEVELOPER): Change the two placeholders below.
// [START initialize]
// Initialize the app with a service account, granting admin privileges
const serviceAccount = require('./serviceAccountKey.json');

const PROJECT_ID = process.env.PROJECT_ID;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`
});
// [END initialize]

const db = firebase.database();
const ref = db.ref('node-client');

// ref.child('unit').on('child_added', (snap) => {
//   console.log(snap.val());
// });
const unitRef = ref.child('unit');

unitRef.push({
  gen0: 'test1',
  gen1: 'test2',
  generated: true,
  id: 10
});
