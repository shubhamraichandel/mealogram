 
function logOut(){
    firebase.auth().signOut().then(function() {
      console.log("Sign Out Hogaya");
      document.getElementById("sgn").hidden= true;
    }).catch(function(error) {
      // An error happened.
    });
  }


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("sgn").hidden= false;
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
      document.getElementById("sgn").hidden= true;
      // ...
    }
  });

