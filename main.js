var mainApp = {};

(function(){
    var firebase = app_firebase;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in or token was refreshed.
          uid = user.uid;
        }else{
            uid = null;
            window.location.replace("login.html");
        }
      });

      function logOut(){
          firebase.auth().signOut();
      }
      mainApp.logOut = logOut;
})()
