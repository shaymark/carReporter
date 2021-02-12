const { messenging } = require('./admin') 

exports.sendPushNotification = async (regToken, data) => {
// This registration token comes from the client FCM SDKs.

  var message = {
    data: {
        title:"title",
        body: "body",
        click_action: "/messages"
    },
    token: regToken
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  try {
    let response = await messenging.send(message)
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.log('Error sending message:', error);
  }
}
