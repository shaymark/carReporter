// address.js

const { db } = require('../util/admin');

const { isEmptyString } = require('../util/helpers');

exports.getAllAddress = (request, response) => {
    db
        .collection('addresses')
        // .where('username' , '==', request.user.username)
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            let addresses = []
            data.forEach(doc => {
                addresses.push({
                    addressId: doc.id,
                    addressAlias: doc.data().addressAlias,
                    addressName: doc.data().addressName,
                    createdAt: doc.data().createdAt,
                    username: doc.data().username
                })
            })
            return response.json(addresses);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({error: err.code, message: err.message});
        })
            
}

exports.createAddress = (request, response) => {
    
    if(isEmptyString(request.body.addressName)) {
        return response.status(400).json({ addressName: 'Must not be empty'}); 
    }

    const username = "anyUsername"

    // need to check how we remove the address alias if its undefined
    
    const newAddress = {
        username: username,
        addressName: request.body.addressName,
        addressAlias: request.body.addressAlias, 
        createdAt: new Date().toISOString(),
    }

    db
        .collection('addresses')
        .add(newAddress)
        .then((doc) => {
            const responseAddressItem = newAddress;
            responseAddressItem.id = doc.id;
            return response.json({responseAddressItem});
        })
        .catch((error) => {
            response.status(500).json({error: 'Somthing went wrong'});
            console.log(error);
        })
}

exports.deleteAddress = (request, response) => {
    
    const document = db.doc(`/addresses/${request.params.addressId}`);
    document
    .get()
    .then((doc) => {
        if(!doc.exists) {
            return response.status(404).json({ error: 'address not found' })
        }
        // if(doc.data().username != request.user.username) {
        //     return response.status(403).json({error: "Unauthorized"})
        // }
        document.delete().then(() => {
            return response.json( { message: 'Delete successfull' });
        })
    })
    .catch((err) => {
        return response.status(500).json({ error: err.code, message: err.message })
    }) 
}

exports.editAddress = (request, response) => {

    const updatedFields = {}
    if (request.body.addressName != undefined) updatedFields.addressName = request.body.addressName;
    if (request.body.addressAlias != undefined) updatedFields.addressAlias = request.body.addressAlias;

    console.log(updatedFields);

    let document = db.collection('addresses').doc(`${request.params.addressId}`);

    document.update(updatedFields)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((error) => {
        console.error(error);
        return response.status(500).json({
            message: "Cannot update the value",
            error: error.code,
            errorMessage: error.message
        })
    })
}