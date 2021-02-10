//admin.js

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const messenging = admin.messaging();

module.exports = { admin, db, messenging }