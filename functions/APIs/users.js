
const { validateLoginData } = require('../util/validators');
const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);


// Login
exports.loginUser = async (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password,
    }

    const { valid, errors } = validateLoginData(user)
    if (!valid) return response.status(400).json(errors);
    try {
        let auth = firebase.auth() 
        let data = await auth.signInWithEmailAndPassword(user.email, user.password) 
        let token = await data.user.getIdToken()
        return response.json( { token });
    } catch (err) {
        console.error(console.error);
        return response.status(403).json({general: 'wrong credentials, please try again'})    
    }
};

// Create user

exports.signup = async (request, response) => {
    
    let newUser = {
        email: request.body.email,
        password:request.body.password, 
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        phone: request.body.phone,
        contry: request.body.contry
    }

    newUser.username = newUser.email;
    
    let token, userId;
    
    try {
        let auth = firebase.auth()
        let data = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
        let token = await data.user.getIdToken()
        newUser.userId = data.user.uid
        let doc = db.doc(`/users/${newUser.username}`)
        await doc.set(newUser)

        return response.status(201).json({token})
    } catch {
        response.status(500).json({error: 'Somthing went wrong'}); 
    }
}


//User details
exports.userDetails = (request, response) => {
    const user = {
        username: request.user.username
    }
    return response.json(user)
}