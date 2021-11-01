var _db;

function initListeners() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("user");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          _db
            .collection("Albums")
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                $("#row1").append(`<div id="logo"><img style="width: 300px; height: 300px" src="${doc.data().photo}" /></div><div id="logo">Album Name: ${doc.data().name} | Artist: ${doc.data().artist} | Genre: ${doc.data().genre}</div>`);
              });
            });
          // ...
        } else {
          // User is signed out
          // ...
          _db
            .collection("Albums")
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                  if(doc.data().free == true) {
                    $("#row1").append(`<div id="logo"><img style="width: 300px; height: 300px" src="${doc.data().photo}" /></div><div id="logo">Album Name: ${doc.data().name} | Artist: ${doc.data().artist} | Genre: ${doc.data().genre}</div>`);
                  }
                });
            });
          console.log("logged out");
        }
    });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("sign out");
      }).catch((error) => {
        // An error happened.
      });
}

function login() {
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("login");
    var user = userCredential.user;
    $("#loginPassword").val("");
    $("#loginEmail").val("");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function create() {
    console.log("create");
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let fullName = fName + " " + lName;
        updateUser(fullName, "https://avatarfiles.alphacoders.com/147/147999.png");
        $("#fName").val("");
        $("#lName").val("");
        $("#email").val("");
        $("#password").val("");
        // Signed in 
        var user = userCredential.user;
        // ...
        console.log("account created");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
    });
}

function initFirebase() {
  _db = firebase.firestore();
}

$(document).ready(function() {
    try{
      initFirebase();  
      let app = firebase.app();
      initListeners();
    }catch{
        console.log("error on try")
    }
});