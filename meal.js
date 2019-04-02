let user1;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
        user1 = user.uid;
      var providerData = user.providerData;

      console.log(user1);
      var database = firebase.database().ref();

readData();
     
      // ...
    } else {
      // User is signed out.
      document.getElementById("sgn").hidden= true;
      // ...
    }
  });






function readData() {

    var breakfastRef = firebase.database().ref("users/" + user1 + "/Meal Plan/" + "/Breakfast/");
    var lunchRef = firebase.database().ref("users/" + user1 + "/Meal Plan/" + "/Lunch/");
    var dinnerRef = firebase.database().ref("users/" + user1 + "/Meal Plan/" + "/Dinner/");

    breakfastRef.on("value", renderBreakfast, errData);
    lunchRef.on("value", renderLunch, errData);
    dinnerRef.on("value", renderDinner, errData);
}

function errData() {

}

function renderBreakfast(data)
{
    var result = data.val();
    var keys = Object.keys(result);
 
    for (var d = 0; d < keys.length; d++) {
        var key = keys[d];
        var res = result[key];

        let ing ;
        let healthLabel = "";
                    
        document.getElementById("BreakfastImage"+d).src = res.image;
        document.getElementById("BreakfastTitle"+d).innerText = res.label;
        document.getElementById("BreakfastLink"+d).href = res.url;
        document.getElementById("BreakfastCal"+d).innerHTML = res.calories;
        document.getElementById("BreakfastIngr"+d).innerHTML = "";
        document.getElementById("BreakfastHealthLabel"+d).innerHTML = "";

       for(i=0;i<res.health.length;i++)
       {
              healthLabel += "<div class = chip>" + res.health[i] + "</div>";
              document.getElementById("BreakfastHealthLabel"+d).innerHTML = healthLabel;
                
       }
        
        for(i=0;i<res.ingredient.length;i++)
        {
              ing += "<li>" + res.ingredient[i] + "</li><br>";
              document.getElementById("BreakfastIngr"+d).innerHTML = ing;
        
        }

    }

}

function renderLunch(data)
{
    var result = data.val();
    var keys = Object.keys(result);
 
    for (var d = 0; d < keys.length; d++) {
        var key = keys[d];
        var res = result[key];

                  
        let ing = "";
        let healthLabel = "";
                    
        document.getElementById("LunchImage"+d).src = res.image;
        document.getElementById("LunchTitle"+d).innerText = res.label;
        document.getElementById("LunchLink"+d).href = res.url;
        document.getElementById("LunchCal"+d).innerHTML = res.calories;
        document.getElementById("LunchIngr"+d).innerHTML = "";
        document.getElementById("LunchHealthLabel"+d).innerHTML = "";

       for(i=0;i<res.health.length;i++)
       {
              healthLabel += "<div class = chip>" + res.health[i] + "</div>";
              document.getElementById("LunchHealthLabel"+d).innerHTML = healthLabel;
                
       }
        
        for(i=0;i<res.ingredient.length;i++)
        {
              ing += "<li>" + res.ingredient[i] + "</li><br>";
              document.getElementById("LunchIngr"+d).innerHTML = ing;
        
        }

    }

}
function renderDinner(data)
{

    var result = data.val();
    var keys = Object.keys(result);
 
    for (var d = 0; d < keys.length; d++) {
        var key = keys[d];
        var res = result[key];

                  
        let ing = "";
        let healthLabel = "";
                    
        document.getElementById("DinnerImage"+d).src = res.image;
        document.getElementById("DinnerTitle"+d).innerText = res.label;
        document.getElementById("DinnerLink"+d).href = res.url;
        document.getElementById("DinnerCal"+d).innerHTML = res.calories;
        document.getElementById("DinnerIngr"+d).innerHTML = "";
        document.getElementById("DinnerHealthLabel"+d).innerHTML = "";

       for(i=0;i<res.health.length;i++)
       {
              healthLabel += "<div class = chip>" + res.health[i] + "</div>";
              document.getElementById("DinnerHealthLabel"+d).innerHTML = healthLabel;
                
       }
        
        for(i=0;i<res.ingredient.length;i++)
        {
              ing += "<li>" + res.ingredient[i] + "</li><br>";
              document.getElementById("DinnerIngr"+d).innerHTML = ing;
        
        }

    }

}

