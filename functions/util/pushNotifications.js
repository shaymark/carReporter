const { messenging } = require('./admin') 

exports.sendPushNotification = (regToken, data) => {
// This registration token comes from the client FCM SDKs.

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: regToken
};

// Send a message to the device corresponding to the provided
// registration token.
return messenging.send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}
