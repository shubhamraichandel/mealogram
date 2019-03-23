var config = {
    apiKey: "AIzaSyD8SfZs5mKZGSHH5Uo5XmjqhkaA1L4DNgo",
    authDomain: "mealo-d7871.firebaseapp.com",
    databaseURL: "https://mealo-d7871.firebaseio.com",
    projectId: "mealo-d7871",
    storageBucket: "mealo-d7871.appspot.com",
    messagingSenderId: "425720264223"
};
firebase.initializeApp(config);

function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
  
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("New User Created");
        // ...
      });


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("User already exsist");
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      console.log(uid);
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });


}
