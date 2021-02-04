//index.js

const functions = require('firebase-functions');
const app = require('express')();

const auth = require('./util/auth')

const cors = require('cors');
app.use(cors());
app.options('*', cors())

const {
    getAllMessages,
    postOneMessage,
    deleteMessage,
    editMessage,
} = require('./APIs/messages')

const {
    loginUser,
    signup,
} = require('./APIs/users')

const {
    getAllAddress,
    deleteAddress,
    createAddress,
    editAddress
} = require('./APIs/address')

// Messages
app.get('/message', auth, getAllMessages)
app.post('/message', auth, postOneMessage)
app.delete('/message/:messageId', auth, deleteMessage)
// app.put('/message/:messageId', auth, editMessage)

//Users
app.post('/login', loginUser)
app.post('/signup', signup)

//Addreses
app.get('/address', auth, getAllAddress)
app.post('/address', auth, createAddress)
app.delete('/address/:addressId', auth, deleteAddress)
app.put('/address/:addressId', auth, editAddress)

exports.api = functions.https.onRequest(app)