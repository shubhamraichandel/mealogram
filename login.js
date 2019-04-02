
function signUp(){
  let email = document.getElementById("remail").value;
  let password = document.getElementById("rpassword").value;
  let displayName = document.getElementById("username").value;


  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .catch(function(error) {
    // Handle Errors here.
    
    var errorCode = error.code;
    var errorMessage = error.message;

   });



   M.toast({html: `User Created`});

   


}

function logOut(){
  firebase.auth().signOut().then(function() {
    console.log("Sign Out Hogaya");
    document.getElementById("sgn").hidden= true;
  }).catch(function(error) {
    // An error happened.
  });
}


function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Login Sucess");

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
     
    }
    
    
    
    else {
      // User is signed out.
      document.getElementById("sgn").hidden= true;
      // ...
    }
  });



