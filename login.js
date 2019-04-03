
function signUp(){
  let email = document.getElementById("remail").value;
  let password = document.getElementById("rpassword").value;
  let username = document.getElementById("username").value;


  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    
   M.toast({html: `User Created`});
  })
  
  .catch(function(error) {
    // Handle Errors here.
    
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode +" "+errorMessage );
    M.toast({html: errorMessage});

   });

   firebase.auth().onAuthStateChanged(function() {
    if (user) {
      // User is signed in.

      user.updateProfile({
        displayName: username
        
      });
      setTimeout(function(){  window.location = "index.html"; }, 3000);
     
      console.log(uid);
     
    }
    
    
    
    else {
      // User is signed out.
      
      M.toast({html: `User is Signed Out!`});
      // ...
    }
  });
    
   
}

function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
    M.toast({html: `Welcome Back!`});
  })
  .catch(function(error) {
        
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode +" "+errorMessage);
    M.toast({html: errorMessage});

  });

}

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    
      var displayName = user.displayName;
      console.log(displayName);
      setTimeout(function(){ window.location = "profile.html"; }, 3000);
      
      
     
    }
    
    
    
    else {
      // User is signed out.
      document.getElementById("sgn").hidden= true;
      // ...
    }
  });



