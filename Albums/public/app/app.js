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
                $("#row1").append(`<div id="logo"><img style="width: 300px; height: 300px" src="${doc.data().photo}" /></div><div id="logo">Album Name: ${doc.data().name} | Artist: ${doc.data().artist} | Genre: ${doc.data().genre}</div><hr>`);
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
                    $("#row1").append(`<div id="logo"><img style="width: 300px; height: 300px" src="${doc.data().photo}" /></div><div id="logo">Album Name: ${doc.data().name} | Artist: ${doc.data().artist} | Genre: ${doc.data().genre}</div><hr>`);
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

function signinWithProvider(provider) {
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      // ...
  }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
});
}

function signinGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  signinWithProvider(provider);
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