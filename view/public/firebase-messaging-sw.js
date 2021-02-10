importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js');
var config = {
  apiKey: "AIzaSyCgT8X47M_yKUIK51XHt1g9nTci2ba9-tw",
  authDomain: "car-reporter.firebaseapp.com",
  projectId: "car-reporter",
  storageBucket: "car-reporter.appspot.com",
  messagingSenderId: "218551549861",
  appId: "1:218551549861:web:2ee5f4a864cbdf6ac3f24c",
  measurementId: "G-RJDXBHGL2L"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png',
        data: { url:payload.data.click_action }, //the url which we gonna use later
        actions: [{action: "open_url", title: "Read Now"}]
    };

    self.addEventListener('notificationclick', function(event) {
      console.log('On notification click: ', event.notification.tag);
      const url = event.notification.data.url
      event.notification.close();
    
      // This looks to see if the current is already open and
      // focuses if it is
      event.waitUntil(clients.matchAll({
        type: "window"
      }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == url && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow)
          return clients.openWindow(url);
      }));
    });

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

