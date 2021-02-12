// messages.js

const { db } = require('../util/admin');

const { isEmptyString } = require('../util/helpers')

const { sendPushNotification } = require('../util/pushNotifications')

const regToken = "cyvmRnEd35MXg99ye8fHK7:APA91bHjbZLr61db4dLMC3jj44PbbANFUW87nUgUNYgl23aXBPv10Et1axBMs3uXFV_ULtDIDQPDQYtgKyQ1R8ESmOVqbEdYyJ052NnQGDpUpniA7gEDHYuHobeiee0UmDVjzT5IC2RO";

/*
** get: request.user.username, request.query.address(optional) 
** return: all the message for the user with the address(optional)
*/
exports.getAllMessages = async (reqeuest, response) => {

    let query =     
    db
        .collection('messages')
        .where('reciverUser' , '==', reqeuest.user.username)
        .orderBy("createdAt", "desc") 
    
    if (reqeuest.query.address) {
        query = query.where('toAddress', '==', reqeuest.query.address)
    }
    
    try {
        data = await query.get()
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
    } catch(err) {
        console.log(err);
        return response.status(500).json({error: err.code, message: err.message});
    }
}

exports.postOneMessage = async (request, response) => {
    if(isEmptyString(request.body.body)) {
        return response.status(400).json({ body: 'Must not be empty'}); 
    }
    
    if (isEmptyString(request.body.title)) {
        return response.status(400).json({ title: 'Must not be empty'});
    }

    if (isEmptyString(request.body.toAddress)) {
        return response.status(400).json({ toAddress: 'Must not be empty'});
    }

    let senderUser;
    if (request.user) {
        senderUser = request.user.username;
    } else {
        senderUser = "anonymouse@anonymouse.com"; 
    }
    
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
  
    let responseMessageItem;
    try {
        let doc = db.doc(`/addresses/${request.body.toAddress}`)
        let addressDoc = await doc.get()
        if(!addressDoc.exists) {
            return response.status(500).json({ error: 'address not found' })
        }
        console.log(addressDoc.data().username);
        newMessage.reciverUser =  await addressDoc.data().username;
        
        let messages = db.collection('messages')
        let messageDoc = await messages.add(newMessage)
        responseMessageItem = newMessage;
        responseMessageItem.id = messageDoc.id;

        const currentToken = regToken;
        const data = {}
        await sendPushNotification(currentToken, data);

        return response.json({responseMessageItem});
    } catch (err) {
        console.log(error);
        response.status(500).json({error: 'Somthing went wrong'});
    }
}



exports.deleteMessage = async (request, response) => {
    
    const document = db.doc(`/messages/${request.params.messageId}`);
    try {
        let data = await document.get()
        if(!data.exists) {
            return response.status(404).json({ error: 'message not found' })
        }
        await document.delete()
            
        return response.json( { message: 'Delete successfull' });
    } catch(err) {
        return response.status(500).json({ error: err.code, message: err.message })
    }
}

exports.editMessage = (request, response) => {
    return response.json({status: "all good"});
}