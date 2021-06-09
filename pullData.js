var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://preference-finder.firebaseio.com'
});

const collectionsRef = admin.firestore().collection("ratings")

collectionsRef.where("user", "==", "guid").get().then(query => {
    if (query.empty) {
        console.log("no results")
    } else {
        query.docs.forEach(doc => {
            console.log(JSON.stringify(doc.data()))
        })
    }
})