 let user1;
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
       user1 = user.uid;
      var providerData = user.providerData;

      console.log(user1);
      readData();
      // ...
    } else {
      // User is signed out.
      document.getElementById("sgn").hidden= true;
      window.location = "login.html";
      // ...
    }
  });

function readData() {

  var  userData = firebase.database().ref("users/" + user1 + "/BMR/");

  userData.on("value", displayUserData, errData);

}

function errData(error)
{
  console.log(error);
}


function displayUserData(data)
{
  let result = data.val();
  
   document.getElementById("userBMI").innerHTML = Number(result.bmi).toFixed(2);

   document.getElementById("userWeight").innerHTML = result.analysis;

   document.getElementById("userCal").innerHTML = result.bmr + " Kcal";
    
}
