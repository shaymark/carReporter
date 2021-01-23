// messages.js

const { db } = require('../util/admin');

const { isEmptyString } = require('../util/helpers')

exports.getAllMessages = (reqeuest, response) => {
    db
        .collection('messages')
        // .where('username' , '==', request.user.username)
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            let messages = []
            data.forEach(doc => {
                messages.push({
                    messageId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    senderUser: doc.data().senderUser
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
    if(isEmptyString(reqeuest.body.body)) {
        return response.status(400).json({ body: 'Must not be empty'}); 
    }
    
    if (request.body.title.trim() ==='') {
        return response.status(400).json({ title: 'Must not be empty'});
    }

    const senderUser = "anySender"
    const reciverUser = "anyReciver"
    
    const newMessage = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString(),
        reciverUser: reciverUser,
        senderUser: senderUser
    }

    

    db
        .collection('messages')
        .add(newMessage)
        .then((doc) => {
            const responseMessageItem = newMessage;
            responseMessageItem.id = doc.id;
            return response.json({responseMessageItem});
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