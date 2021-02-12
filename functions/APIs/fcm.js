//fcm.js

const { db } = require('../util/admin');

exports.registerFcmToken = (request, response) => {
    
    const userAgent = request.useragent;
    let regTokenName;

    if (userAgent.isChrome) regTokenName= 'fcmTokenWeb'
    if (userAgent.isAndroidNative) regTokenName = 'fcmTokenAndroid'
    if (userAgent.isIphoneNative) regTokenName = 'fcmTokenAndroid'

    if(request.body.appUseragent) regTokenName = request.body.appUseragent


    db
        .doc(`users/${request.user.username}`)
        .update({
            [regTokenName]: request.body.fcmToken
        })
        .then(() => {
            return response.json({status: "registered"});
        })
        .catch((err) => {
            return status(500).json({error: err.code, message: err.message}); 
        })
        
}