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
      user1 = user.uid;
      document.getElementById("userEmail").innerHTML = email;
      document.getElementById("userName").innerHTML = displayName;

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

   document.getElementById("userAnalysis").innerHTML = result.analysis;

   
   document.getElementById("userWeight").innerHTML = "Weight : " + result.weight + " Kgs";
   
   document.getElementById("userHeight").innerHTML = "Height : " + result.height + " cms";

   document.getElementById("userCal").innerHTML = result.bmr + " Kcal";
    
}
