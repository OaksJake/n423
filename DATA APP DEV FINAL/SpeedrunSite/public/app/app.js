var _db;

function initListeners() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#navbar").append(`<a href="profile.html">Account</a>`);
        } else {
            $("#navbar").append(`<a href="login.html">Login</a>
          <p>|</p>
          <a href="signup.html"><b>Sign-Up</b></a>`);
        }
    });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("sign out");
      }).catch((error) => {
        // An error happened.
      });
      location.href = 'index.html';
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
    alert("Succesfully Logged-in!");
    location.href="index.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function create() {
    console.log("create");
    let display = $("#fName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        updateUser(display);
        $("#fName").val("");
        $("#email").val("");
        $("#password").val("");
        // Signed in 
        var user = userCredential.user;
        // ...
        console.log("account created");
    }).then(() => {
        alert("account created!");
        location.href="index.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
    });
}

function updateUser(disname) {
    firebase.auth().currentUser.updateProfile({
        displayName: disname,
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

function gamePage(game){
    localStorage.setItem('gameName', game);
    location.href = 'gamePage.html';
}

var input = document.getElementById("searchInput");

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    let search = $("#searchInput").val();
    gameSearch(search);
  }
});

function gameSearch(game){
    localStorage.setItem('gameSearch', game);
    location.href = 'games.html';
}

function runSubmitPage(game){
    localStorage.setItem('submitGame', game);
    location.href = 'NewRun.html';
}

function runSubmit(){
    let game = localStorage.getItem('submitGame');
    let time = $("#timeSubmit").val();
    let username = firebase.auth().currentUser.displayName;
    _db
    .collection("Unapproved Runs")
    .add({
        Game: game,
        Time: time,
        Username: username
    }).then(() => {
        location.href = 'gamePage.html';
    });
}

function pendingRuns(game){
    localStorage.setItem('reviewGame', game);
    location.href = 'PendingRuns.html';
}

function addRun(game, time, username, key){
    _db
    .collection("Speedruns")
    .add({
        Game: game,
        Rank: "unranked",
        Time: time,
        Username: username
    }).then(function() {
        _db
        .collection("Unapproved Runs")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.id == key){
                    doc.ref.delete();
                }
            })
        }).then(function() {
            _db
            .collection("Speedruns")
            .get()
            .then(function(querySnapshot) {
                let objectHolder = [];
                querySnapshot.forEach(function(doc) {
                    if(doc.data().Game == game){
                        let time = doc.data().Time;
                        let hr = parseInt(time.substring(0, 2));
                        let mn = parseInt(time.substring(3, 5));
                        let sec = parseInt(time.substring(6, 9));
                        if(objectHolder.length == 0){
                            objectHolder.push(doc);
                        }
                        else{
                            var i = 0
                            while(i < objectHolder.length){
                                let time2 = objectHolder[i].data().Time;
                                let hr2 = parseInt(time2.substring(0, 2));
                                let mn2 = parseInt(time2.substring(3, 5));
                                let sec2 = parseInt(time2.substring(6, 9));
                                if(hr < hr2){
                                    objectHolder.splice(i, 0, doc);
                                    i = objectHolder.length;
                                    break;
                                }
                                else if(hr == hr2 && mn < mn2){
                                    objectHolder.splice(i, 0, doc);
                                    i = objectHolder.length;
                                    break;
                                }
                                else if(hr == hr2 && mn == mn2 && sec < sec2){
                                    objectHolder.splice(i, 0, doc);
                                    i = objectHolder.length;
                                    break;
                                }
                                else if(i == objectHolder.length - 1){
                                    objectHolder.push(doc);
                                    i++
                                }
                                i++;
                            }
                        }
                    }
                })
                for(var i = 0; i < objectHolder.length; i++){
                    let ranking = i + 1;
                    _db.collection("Speedruns").doc(objectHolder[i].id).update({Rank: ranking})
                }
            }).then(function (){
                alert("Run has been accepted!");
                location.reload();
            });
        })
    });
}

function deleteRun(key){
    _db
    .collection("Unapproved Runs")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.id == key){
                doc.ref.delete();
            }
        })
        alert("Run has been rejected");
        location.reload();
    });
}

function initFirebase() {
  _db = firebase.firestore();
    _db
        .collection("Speedruns")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
            $("#hometable").append(`<tr><td>${doc.data().Username}</td><td>${doc.data().Game}</td><td>${doc.data().Rank}</td><td>${doc.data().Time}</td></tr>`);
            });
        });
    if(localStorage.getItem('gameSearch') != ""){
        var i = 0;
        _db
        .collection("Games")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let NAME = doc.data().Name.toUpperCase();
                let SEARCH = localStorage.getItem('gameSearch').toUpperCase();
                if(NAME.includes(SEARCH)){
                    $("#gamestable").append(`<tr><td><button class="gamesButton" onClick="gamePage('${doc.data().Name}')"><img style="width: 200px;" src="${doc.data().Picture}" alt="${doc.data().Name}"><p class="gameTableName">${doc.data().Name}</p></button></td></tr>`);
                    i++
                }
            });
            if(i == 0){
                $("#gamestable").append(`<p style="color: white; font-sized: 28px;">No results found</p>`)
            }
        });
    }
    else if(localStorage.getItem('gameSearch') == ""){
        var i = 1;
        var numEntries = 0;
        _db
        .collection("Games")
        .get()
        .then(function (querySnapshot) {
            const count = querySnapshot.size;
            var htmlRowAdd = "";
            querySnapshot.forEach(function (doc) {
                _db
                .collection("Speedruns")
                .get()
                .then(function (querySnapshot) {
                    numEntries = 0;
                    querySnapshot.forEach(function (runDoc) {
                        if(runDoc.data().Game == doc.data().Name){
                            numEntries++; 
                        }
                    });
                    htmlRowAdd += `<td><button class="gamesButton" onClick="gamePage('${doc.data().Name}')"><img style="width: 200px;" src="${doc.data().Picture}" alt="${doc.data().Name}"><p class="gameTableName">${doc.data().Name}</p><p style="font-size: 16px;">${numEntries} Runs</p></button></td>`;
                    if(i % 5 == 0 || i == count){
                        $("#gamestable").append(`<tr>${htmlRowAdd}</tr>`);
                        htmlRowAdd = "";
                    }
                    i++;
                });
            });
        });
    }
    _db
    .collection("Games")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if(doc.data().Name == localStorage.getItem('gameName')){
                $("#gamePage").append(`<img class="gamePage" src="${doc.data().Picture}"/><h2 class="gameName">${doc.data().Name}</h2>`);
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        $("#gamePage").append(`<button class="login-buttons" style="width: 250px; margin-left: 115%" onClick="runSubmitPage('${doc.data().Name}')">Submit Run</button>`);
                    }
                    if (user) {
                        _db
                        .collection("Moderators")
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (modDoc) {
                                if(modDoc.data().Game == localStorage.getItem('gameName')){
                                    if (firebase.auth().currentUser.displayName == modDoc.data().Username) {
                                        $("#gamePage").append(`<br><button class="login-buttons" style="width: 250px; margin-left: 115%" onClick="pendingRuns('${doc.data().Name}')">Pending Runs</button>`);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
    });
    _db
    .collection("Speedruns")
    .get()
    .then(function (querySnapshot) {
        let rankHolder = [];
        querySnapshot.forEach(function (doc) {
            if(doc.data().Game == localStorage.getItem('gameName')){
                let rank = doc.data().Rank;
                if(rankHolder.length == 0){
                    rankHolder.push(doc);
                }
                else {
                    var i = 0
                    while(i < rankHolder.length){
                        let rank2 = rankHolder[i].data().Rank;
                        if(rank < rank2){
                            rankHolder.splice(i, 0, doc);
                            i = rankHolder.length;
                            break;
                        }
                        else if(i == rankHolder.length - 1){
                            rankHolder.push(doc);
                            i++
                        }
                        i++;
                    }
                }
            }
        });
        for(var i = 0; i < rankHolder.length; i++){
            $("#gamePageRanks").append(`<tr><td>${rankHolder[i].data().Rank}</td><td>${rankHolder[i].data().Time}</td><td>${rankHolder[i].data().Username}</td></tr>`);
        }
    });
    _db
    .collection("Speedruns")
    .get()
    .then(function () {
        $("#runSubmitData").append(`<h3 style="color: #e940ff"><i>${firebase.auth().currentUser.displayName}</i> </h3><h3>Completed</h3><h3 style="color: #42edf3"><i>${localStorage.getItem('submitGame')}</i></h3><h3>in...</h3>`);
    });
    _db
    .collection("Unapproved Runs")
    .get()
    .then(function (querySnapshot) {
        $("#pendingRunsName").append(`<h2>Pending Runs for ${localStorage.getItem('reviewGame')}</h2>`);
        querySnapshot.forEach(function (doc) {
            if(doc.data().Game == localStorage.getItem('reviewGame')){
                $("#runReviewData").append(`<div><h4>${doc.data().Username} | Time: ${doc.data().Time} | <button style="width: 120px; background-color: #42edf3; color: #000; font-size: 36px; padding: 3px; cursor: pointer;" onClick="addRun('${doc.data().Game}', '${doc.data().Time}', '${doc.data().Username}', '${doc.id}')">Accept</button> <button style="width: 120px; background-color: #e940ff; color: #000; font-size: 36px; padding: 3px; cursor: pointer;" onClick="deleteRun('${doc.id}')">Deny</button></h4></div>`);
            }
        });
    });
    _db
    .collection("Unapproved Runs")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if(doc.data().Username == firebase.auth().currentUser.displayName){
                $("#AccountContent").append(`<div><h4>Game: ${doc.data().Game} | Time: ${doc.data().Time}</div>`);
            }
        });
    });
}

$(document).ready(function() {
    try{
      initListeners();
      initFirebase();  
      let app = firebase.app();
    }catch{
        console.log("error on try")
    }
});