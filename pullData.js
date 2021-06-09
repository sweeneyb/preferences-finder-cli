var admin = require('firebase-admin');


let user = "guid"
if(process.argv.length > 2) {
  user = process.argv[2]
}

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://preference-finder.firebaseio.com'
});

const collectionsRef = admin.firestore().collection("ratings")

collectionsRef.where("user", "==", user)
  .orderBy('timestamp', 'asc').get().then(query => {
    if (query.empty) {
        console.log("no results")
    } else {
        query.docs.forEach(doc => {
            let item = getSummary(doc.data())
            console.log(JSON.stringify(item))
        })

        console.log("")
        console.log("item, rating, time")
        query.docs.forEach(doc => {
            let item = getSummary(doc.data())
            let array = Object.values(item).join(",");
            console.log(array)
        })
    }
})


function getSummary(document) {
        return { image: document.image, rating: document.rating, time: document.timestamp.toDate()}
}