// address.js

const { db } = require('../util/admin');

const { isEmptyString } = require('../util/helpers');

exports.getAllAddress = async (request, response) => {
    
    try {
        let data =  
        await db
            .collection('addresses')
            .where('username' , '==', request.user.username)
            .orderBy("createdAt", "desc")
            .get()
        
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
    } catch (err) {
        console.log(err);
        return response.status(500).json({error: err.code, message: err.message}); 
    }
            
}

exports.createAddress = async (request, response) => {
    
    if(isEmptyString(request.body.addressName)) {
        return response.status(400).json({ addressName: 'Must not be empty'}); 
    }

    const username = request.user.username

    // need to check how we remove the address alias if its undefined
    
    const newAddress = {
        username: username,
        addressName: request.body.addressName,
        addressAlias: request.body.addressAlias, 
        createdAt: new Date().toISOString(),
    }

    try {
        let collection = db.collection('addresses')
        let doc =  await collection.add(newAddress) 
        const responseAddressItem = newAddress;
        responseAddressItem.id = doc.id;
        
        return response.json({responseAddressItem}); 
    } catch (error) {
        console.log(error);
        response.status(500).json({error: 'Somthing went wrong'});
    }
}

exports.deleteAddress = async (request, response) => {
    console.log('delete addresses')
    const document = db.doc(`/addresses/${request.params.addressId}`);
    try {
        doc = await document.get()
        if(!doc.exists) {
            return response.status(404).json({ error: 'address not found' })
        }
        if(doc.data().username != request.user.username) {
            return response.status(403).json({error: "Unauthorized"})
        }
        document.delete().then(() => {
            return response.json( { message: 'Delete successfull' });
        })
    } catch (err) {
        return response.status(500).json({ error: err.code, message: err.message }) 
    }
}

exports.editAddress = async (request, response) => {

    const updatedFields = {}
    if (request.body.addressName != undefined) updatedFields.addressName = request.body.addressName;
    if (request.body.addressAlias != undefined) updatedFields.addressAlias = request.body.addressAlias;

    console.log(updatedFields);

    let document = db.collection('addresses').doc(`${request.params.addressId}`);

    try {
        await document.update(updatedFields)

        return response.json({message: 'Updated successfully'}); 
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Cannot update the value",
            error: error.code,
            errorMessage: error.message
        }) 
    }
}