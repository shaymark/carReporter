// messages.js

const { db } = require('../util/admin');

const { isEmptyString } = require('../util/helpers')

/*
** get: request.user.username, request.query.address(optional) 
** return: all the message for the user with the address(optional)
*/
exports.getAllMessages = (reqeuest, response) => {

    let query =     
    db
        .collection('messages')
        .where('reciverUser' , '==', reqeuest.user.username)
        .orderBy("createdAt", "desc") 
    
    if (reqeuest.query.address) {
        query = query.where('toAddress', '==', reqeuest.query.address)
    }
    

    query
        .get()
        .then((data) => {
            let messages = []
            data.forEach(doc => {
                messages.push({
                    messageId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    senderUser: doc.data().senderUser,
                    toAddress: doc.data().toAddress,
                    reciverUser: doc.data().reciverUser  
                })
            })
            return response.json(messages);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({error: err.code, message: err.message});
        })
            
}


exports.postOneMessage = (request, response) => {
    if(isEmptyString(request.body.body)) {
        return response.status(400).json({ body: 'Must not be empty'}); 
    }
    
    if (isEmptyString(request.body.title)) {
        return response.status(400).json({ title: 'Must not be empty'});
    }

    if (isEmptyString(request.body.toAddress)) {
        return response.status(400).json({ toAddress: 'Must not be empty'});
    }

    const senderUser = request.user.username;
    const reciverUser = "anyReciver";
    
    const newMessage = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString(),
        reciverUser: reciverUser,
        senderUser: senderUser,
        toAddress: request.body.toAddress
    }

    console.log(request.body.toAddress);
  
    db
        .doc(`/addresses/${request.body.toAddress}`)
        .get()
        .then((addressDoc) => {
            if(!addressDoc.exists) {
                return response.status(500).json({ error: 'address not found' })
            }
            console.log(addressDoc.data().username);
            newMessage.reciverUser =  addressDoc.data().username;
        })
        .then(()=> {
            db.
                collection('messages')
                .add(newMessage)
                .then((doc) => {
                    const responseMessageItem = newMessage;
                    responseMessageItem.id = doc.id;
                    return response.json({responseMessageItem});
                })
        })
        .catch((error) => {
            response.status(500).json({error: 'Somthing went wrong'});
            console.log(error);
        })
}



exports.deleteMessage = (request, response) => {
    
    const document = db.doc(`/messages/${request.params.messageId}`);
    document
    .get()
    .then((doc) => {
        if(!doc.exists) {
            return response.status(404).json({ error: 'message not found' })
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

exports.editMessage = (request, response) => {
    return response.json({status: "all good"});
}