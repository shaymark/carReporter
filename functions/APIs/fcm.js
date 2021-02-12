//fcm.js

const { db } = require('../util/admin');

exports.registerFcmToken = async (request, response) => {
    
    const userAgent = request.useragent;
    let regTokenName;

    if (userAgent.isChrome) regTokenName= 'fcmTokenWeb'
    if (userAgent.isAndroidNative) regTokenName = 'fcmTokenAndroid'
    if (userAgent.isIphoneNative) regTokenName = 'fcmTokenAndroid'

    if(request.body.appUseragent) regTokenName = request.body.appUseragent

    try {
        let doc = db.doc(`users/${request.user.username}`)
        await doc.update({
            [regTokenName]: request.body.fcmToken
        })
    }
    catch {
        return status(500).json({error: err.code, message: err.message}); 
    }

    return response.json({status: "registered"});
}