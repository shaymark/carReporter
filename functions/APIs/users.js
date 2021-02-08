
const { validateLoginData } = require('../util/validators');
const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);


// Login
exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password,
    }

    const { valid, errors } = validateLoginData(user)
    if (!valid) return response.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json( { token });
        })
        .catch((error) => {
            console.error(console.error);
            return response.status(403).json({general: 'wrong credentials, please try again'})
        })
};

// Create user

exports.signup = (request, response) => {
    
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
    
    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken(); 
    })
    .then((tokenId) => {
        token = tokenId

        newUser.userId = userId;
        
        db
            .doc(`/users/${newUser.username}`)
            .set(newUser);
    })
    .then(() => {
        return response.status(201).json({token})
    })
    .catch((error) => {
        response.status(500).json({error: 'Somthing went wrong'});
        console.log(error);
    })
    .catch((err) => {
        console.log("Failed to create user", err.mssage);
        return response.status(500).json({general: err.message})
    })
}


//User details
exports.userDetails = (request, response) => {
    const user = {
        username: request.user.username
    }
    return response.json(user)
}