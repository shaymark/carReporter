//index.js

const functions = require('firebase-functions');
const app = require('express')();
const useragent = require('express-useragent');

const auth = require('./util/auth')

const cors = require('cors');
app.use(cors());
app.options('*', cors())

app.use(useragent.express());

const {
    getAllMessages,
    postOneMessage,
    deleteMessage,
    editMessage,
} = require('./APIs/messages')

const {
    loginUser,
    signup,
    userDetails
} = require('./APIs/users')

const {
    getAllAddress,
    deleteAddress,
    createAddress,
    editAddress
} = require('./APIs/address')

const {
    registerFcmToken
} = require('./APIs/fcm')


// Messages
app.get('/message', auth, getAllMessages)
app.post('/message', auth, postOneMessage)
app.post('/messageAnonymouse', postOneMessage)
app.delete('/message/:messageId', auth, deleteMessage)
// app.put('/message/:messageId', auth, editMessage)

//Users
app.post('/login', loginUser)
app.post('/signup', signup)
app.get('/user', auth, userDetails)

//Addreses
app.get('/address', auth, getAllAddress)
app.post('/address', auth, createAddress)
app.delete('/address/:addressId', auth, deleteAddress)
app.put('/address/:addressId', auth, editAddress)

//Fcm
app.post('/registerFcmToken', auth, registerFcmToken)

exports.api = functions.https.onRequest(app)