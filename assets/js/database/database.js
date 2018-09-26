// Initialize Firebase
var config = {
    apiKey: "AIzaSyALSTGEwrPQvGDjfoyUQ5d-OUTASX6WW-c",
    authDomain: "musical-maps-project.firebaseapp.com",
    databaseURL: "https://musical-maps-project.firebaseio.com",
    projectId: "musical-maps-project",
    storageBucket: "musical-maps-project.appspot.com",
    messagingSenderId: "933657167227"
};
firebase.initializeApp(config);

var database = firebase.database();


function databasePush(item) {

    database.ref().push(item);

}


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var doseExist = false;
    var i;
    for (i = 0; i < Locations.length; i++) {

        if (childSnapshot.val().name === Locations[i].name) {
            doseExist = true;
        }
    }
    if (doseExist === false){
    //add to locations array//
    var loc = {
        name: childSnapshot.val().name,
        lat: childSnapshot.val().lat,
        long: childSnapshot.val().long,
        videoIds: childSnapshot.val().videoIds.slice(0)
    };

    Locations.push(loc);
    }
});