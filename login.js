function signUp() {
  let email = document.getElementById("remail").value;
  let password = document.getElementById("rpassword").value;
  let username = document.getElementById("username").value;



  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: username

      });
      
      M.toast({
        html: `User created, please verify your email `
      },3000);

      user.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        // An error happened.
      });

 
    })

    .catch(function (error) {
      // Handle Errors here.

      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode + " " + errorMessage);
      M.toast({
        html: errorMessage
      });

    });

  /*  firebase.auth().onAuthStateChanged(function(user) {
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
  });  */


}

   function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email, password)
  
      .catch(function (error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        M.toast({
          html: errorMessage
        });

      });



    firebase.auth().onAuthStateChanged(function (user) {
      
      if (user) {
        // User is signed in.
        let flag = 1;
        if (user.emailVerified) {
          flag = 0;
          M.toast({
            html: `Welcome Back! ` +user.displayName
          });
          console.log('Email is verified');
         
          if(flag === 0){
          setTimeout(function () {
            window.location = "index.html";
          }, 3000); 
        }
          else 
          {
            setTimeout(function () {
              window.location = "profile.html";
            }, 3000); 
          }
        
        
        var displayName = user.displayName;
        console.log(displayName);
        }
       
    
                  
        }

        else{
          firebase.auth().signOut();
       
         
       
          M.toast({
            html: `Please Verify Your Email`
          });
      }
    });


  } 