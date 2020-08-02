const functions = require('firebase-functions');
const fetch = require('node-fetch').default
const admin = require('firebase-admin');
admin.initializeApp();

//when i add a child to the database named "pushNotifications"
exports.sendNotification = functions.database.ref("/pushNotifications/{pushid}").onCreate(event => {

//All tokens must recive that single push notification 
    admin.database().ref('/users').on('child_added', (snapshot) => {

        admin.database().ref('/pushNotifications').on('child_added', (snap) => {

            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    to: snapshot.val().expoPushToken,
                    sound: "default",
                    title: snap.val().title,
                    body: snap.val().body,
                    data: { data: "goes here" },
                    _displayInForeground: true,
                })
            })
        });
    })
});



exports.sendNotificationOnUpdate = functions.database.ref("/users/{newUser}").onUpdate(event => {

    admin.database().ref('/users').on('child_added', (snapshot) => {

        admin.database().ref('/pushNotifications').on('child_added', (snap) => {

            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    to: snapshot.val().expoPushToken,
                    sound: "default",
                    title: snap.val().title,
                    body: snap.val().body,
                    data: { data: "goes here" },
                    _displayInForeground: true,
                })
            })
        });
    })
});


