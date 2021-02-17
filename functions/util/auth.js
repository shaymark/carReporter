

const { admin, db } = require('./admin');

module.exports = async (request, response, next) => {
    let idToken;
    if(request.headers.authorization) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return response.status(401).json({error: 'Unauthorized'});
    }

    try {
       let auth = admin.auth()
       let decodeToken = await auth.verifyIdToken(idToken)
       request.user = decodeToken;
       let users = await db.collection('users').where('userId', '=',request.user.uid).limit(1).get();
       request.user.username = users.docs[0].data().username;
       request.user.imageUrl = users.docs[0].data().imageUrl;
       return next()
    } catch(err) {
        console.error('Error while verifying token', err);
        console.error( err); 
        return response.status(401).json({errror: err}); 
    }
  
}
