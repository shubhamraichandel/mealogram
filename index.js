var config = {
    apiKey: "AIzaSyD8SfZs5mKZGSHH5Uo5XmjqhkaA1L4DNgo",
    authDomain: "mealo-d7871.firebaseapp.com",
    databaseURL: "https://mealo-d7871.firebaseio.com",
    projectId: "mealo-d7871",
    storageBucket: "mealo-d7871.appspot.com",
    messagingSenderId: "425720264223"
};
firebase.initializeApp(config);


var user1 = "User1";
var user2 = "User2";

var database = firebase.database().ref();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    //var instances = M.Parallax.init(elems, options);
  });

document.getElementById("bmr-calculator").hidden = true;
document.getElementById("meal").hidden = true;
document.getElementById("calculator").hidden = false;

var btnBmr = document.getElementById("btn-bmr");            // Btn for Calculating BMR
var genderGroup = document.getElementsByName("group");      // Radio group

var bmr;
var bmi;

var bmiResult;


/** Function for BMI and BMR */

btnBmr.addEventListener("click", function(){

    document.getElementById("bmr-calculator").hidden = false;
    document.getElementById("calculator").hidden = true;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var age =  document.getElementById("age").value;
    var bmiHeight;
    var gender;
    if(genderGroup[0].checked)
    {
        
       gender = "male"; 
       bmr = 66 + (13.7 * weight ) + (5 * height) - (6.8 * age);
       bmiHeight = (height)/100;
       bmi = weight / (bmiHeight * bmiHeight);  
       calBMI(bmi);
        
    }
    else if(genderGroup[1].checked)
    {
        gender = "female";        
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        bmiHeight = (height)/100;
        bmi = weight / (bmiHeight * bmiHeight);
        calBMI(bmi);
       
    }

    bmr = Math.round(bmr);
    minCalories = Math.round((bmr - 200)/mealCount);
    maxCalories = Math.round(bmr/mealCount);


  
    document.getElementById("bmi-output").innerHTML = Number(bmi).toFixed(2);
    document.getElementById("bmr-output").innerHTML = bmr + " Kcals/Day";
    
   // buildQ();

    // Checking Values in Console
    console.log(height);
    console.log(weight);
    console.log(age);
    console.log(gender);
    console.log(bmi);
    console.log(bmr);
    
    let bmrCal = "Bmr Calculator"
    var database = firebase.database().ref();


     firebase.database().ref('users/'+user1+'/BMR/').set({
     
      height: height,
      weight: weight,
      age:age,
      gender:gender,
      bmi: bmi,
      bmr:bmr
        
    
    }); 
  
});

/** Function for Calculating BMI (Function called from btnBmr listner) */
function calBMI(bmi){

    if(bmi <= 18.5)
    {
        console.log("Underweight");
        document.getElementById("bmi-result").innerHTML = "Underweight";
    }

    if (18.5 <= bmi && bmi <= 24.99)
    {
        console.log("Normal Weight");
        document.getElementById("bmi-result").innerHTML = "Normal Weight";
    }

    if (25 <= bmi && bmi <= 29.99)
    {
        console.log("Overweight");
        document.getElementById("bmi-result").innerHTML = "Overweight";
    }

    if (30 <= bmi && bmi <= 34.99)
    {
        console.log("Ob C1");
        document.getElementById("bmi-result").innerHTML = "Obesity Class 1";
    }

    if (35 <= bmi && bmi <= 39.99)
    {
        console.log("Ob C2");
        document.getElementById("bmi-result").innerHTML = "Obesity Class 2";
    }

    if (bmi >= 40)
    {
        console.log("Morbid Obesity");
        document.getElementById("bmi-result").innerHTML = "Morbid Obesity";
    }    

};


function recalculate(){

    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("age").value = "";

    document.getElementById("calculator").hidden = false;
    document.getElementById("bmr-calculator").hidden = true;


    console.log("Recal")

  };




/** End of BMR and BMI */


//

//var mealCount = document.getElementById("mealCount").value;

var mealCount = 3;

var myMeal = {'Breakfast':  [], 'Lunch':    [],'Dinner':   [] };


var lb;
//const health;
var bmr , bmi;
var minCalories ;
var maxCalories ;

let queries = {};

var dietSpec = document.getElementsByName("diet"); 

var diet = dietSpec[0].value;

var btnTest = document.getElementById("btn-test");

var btn = document.getElementById("btn-f");

// Function for dietSpec : Balanced, Low-Carb, Low-Fat
function dietSpecific(){
     
     
     if(dietSpec[0].checked)
    {
        diet = dietSpec[0].value;
    }
    else if(dietSpec[1].checked)
    {
        diet = dietSpec[1].value;
    }
    else if(dietSpec[2].checked)
    {
        diet = dietSpec[2].value;
    }
           
};


var healthSpec = document.getElementsByName("health");


//let health =  stitchHealth(healthSpec);


function stitchHealth()
{
    var res = "&";

    for(h=0;h<healthSpec.length;h++)
    {
        if(healthSpec[h].checked)
        {
            res+="health="+healthSpec[h].value+"&";
        }    
    }

      //remove that last ampersand
    return res.slice(0,-1);
               
};


const mealTypes = {
    3: ["Breakfast","Lunch","Dinner"],
    5: ["Breakfast Snack","Breakfast","Lunch","Afternoon Snack","Dinner"],
    2: ["Brunch","Dinner"],
  };



  
function buildQ(){
 
 for(var i = 0 ;i<mealCount; i++)
 {
     let str = mealTypes[mealCount][i];
    //console.log(mealTypes[mealCount][i]);
    queries[str] = 'https://api.edamam.com/search?q='+str+'&app_id='+app_id+'&app_key='+app_key+stitchHealth()+'&diet='+diet+'&to=7&calories='+minCalories+'-'+maxCalories;
    //queries[str] = "q"+[i]+" ";
 }
 console.log(queries);
 //console.log(health); // Using function => stitchHealth();
};

// Buttons

//var ingredient = document.getElementById("ing-food").value;

var divContainer = document.getElementById("web-info");

var divBMR = document.getElementById("bmr-result");

var app_id = "9954c1eb";
var app_key = "ba8e45e171d09167f5040d51e2d37b8c";
    

    
// Testing ke liye value hai... BMR calculate karke results display karane ho toh isse comment kar dena



var key;
var testJson;

//Function for Single Query Call
function execute(){
    buildQ();

    document.getElementById("meal").hidden = false;

    for(var i = 0 ;i<mealCount; i++)
    {
        let str = mealTypes[mealCount][i];

        if(str == "Breakfast")
        {
            key = str;
            var requestBreakfast = new XMLHttpRequest();
            requestBreakfast.open('GET',queries["Breakfast"]);
            requestBreakfast.onload = function(){
            breakfastData = JSON.parse(requestBreakfast.responseText);
            testJson = JSON.stringify(requestBreakfast.responseText);
            renderBreakfast(breakfastData);     

        };
            requestBreakfast.send();
            
        }
        
        else if(str == "Lunch")
        {
            key = str;
            var requestLunch = new XMLHttpRequest();
            requestLunch.open('GET',queries["Lunch"]);
            requestLunch.onload = function(){
            lunchData = JSON.parse(requestLunch.responseText);
            renderLunch(lunchData);
        };
            requestLunch.send();
            
        }

        else if(str == "Dinner")
        {
            key = str;
            var requestDinner = new XMLHttpRequest();
            requestDinner.open('GET',queries["Dinner"]);
            requestDinner.onload = function(){
            dinnerData = JSON.parse(requestDinner.responseText);
            renderDinner(dinnerData);
        };
            requestDinner.send();
            
        }
    }
    
};

    function renderBreakfast(data)
    {
        
       
        for(var i = 0;i<data.hits.length;i++) 
            {
                myMeal.Breakfast[i] = data.hits[i];                                      
                  
            }             
        
          console.log(myMeal.Breakfast[0].recipe.label);
          
         
            // Key Values [0] Monday, [1] Tuesday .... [6] Sunday
           
          var ing;
          var healthLabel;
          let healthLab = [];
            let ingr = [];
            let image = [];
            let label;
            let recipeLink;
            let calories;

          for(d=0;d<7;d++)
          {
                      
            ing = "";
            healthLabel = "";
                        
            document.getElementById("BreakfastImage"+d).src = myMeal.Breakfast[d].recipe.image;
            document.getElementById("BreakfastTitle"+d).innerText = myMeal.Breakfast[d].recipe.label;
            document.getElementById("BreakfastLink"+d).href = myMeal.Breakfast[d].recipe.url;
            document.getElementById("BreakfastCal"+d).innerHTML = Math.round((myMeal.Breakfast[d].recipe.calories)/(myMeal.Breakfast[d].recipe.yield)) + "  kcal";
            document.getElementById("BreakfastIngr"+d).innerHTML = "";
            document.getElementById("BreakfastHealthLabel"+d).innerHTML = "";

           for(i=0;i<myMeal.Breakfast[d].recipe.healthLabels.length;i++)
           {
            healthLab[i] =  myMeal.Breakfast[d].recipe.healthLabels[i] ;
                healthLabel += "<div class = chip>" + myMeal.Breakfast[d].recipe.healthLabels[i] + "</div>";
                  document.getElementById("BreakfastHealthLabel"+d).innerHTML = healthLabel;
               
                
                     
           }
            
            for(i=0;i<myMeal.Breakfast[d].recipe.ingredientLines.length;i++)
            {
                ingr[i] = myMeal.Breakfast[d].recipe.ingredientLines[i] ;
                  ing += "<li>" + myMeal.Breakfast[d].recipe.ingredientLines[i] + "</li><br>";
                  document.getElementById("BreakfastIngr"+d).innerHTML = ing;
            
          }

            image = myMeal.Breakfast[d].recipe.image;
            label= myMeal.Breakfast[d].recipe.label;
            recipeLink =  myMeal.Breakfast[d].recipe.url;
            calories = Math.round((myMeal.Breakfast[d].recipe.calories)/(myMeal.Breakfast[d].recipe.yield)) + " kcal";
          
            firebase.database().ref('users/'+user1+'/Meal Plan/'+'/Breakfast/'+d).set({
            
                label : label,
                image : image,
                link  : recipeLink,   
                health : healthLab,
                ingredient : ingr,
                calories : calories
                });
         
                console.log("Breakfast Added Sucessfully "+d) ;
       

        }

     


    }

    function renderLunch(data)
    {
        for(var i = 0;i<data.hits.length;i++) 
            {
                 myMeal.Lunch[i] = data.hits[i];
            }                  


            var ing;
            var healthLabel;
                 
            let healthLab = [];
            let ingr = [];
            let image = [];
            let label;
            let recipeLink;
            let calories;
         
  
            for(l=0;l<7;l++)
            {
                ing = "";
                healthLabel= "";
              
              document.getElementById("LunchTitle"+l).innerHTML = myMeal.Lunch[l].recipe.label;
              document.getElementById("LunchImage"+l).src = myMeal.Lunch[l].recipe.image;
              document.getElementById("LunchLink"+l).href = myMeal.Lunch[l].recipe.url;
              document.getElementById("LunchCal"+l).innerHTML = Math.round((myMeal.Lunch[l].recipe.calories)/(myMeal.Lunch[l].recipe.yield)) + "  kcal";
              document.getElementById("LunchIngr"+l).innerHTML = "";
              document.getElementById("LunchHealthLabel"+l).innerHTML = "";
    
              for(i=0;i<myMeal.Lunch[l].recipe.healthLabels.length;i++)
              {
                healthLab[i] =  myMeal.Lunch[l].recipe.healthLabels[i] ;
                    healthLabel += "<div class = chip>" + myMeal.Lunch[l].recipe.healthLabels[i] + "</div>";
                    document.getElementById("LunchHealthLabel"+l).innerHTML = healthLabel;
              }         
              
              
              for(i=0;i<myMeal.Lunch[l].recipe.ingredientLines.length;i++)
              {
                    ingr[i] = myMeal.Lunch[l].recipe.ingredientLines[i] 
                    ing += "<li>" + myMeal.Lunch[l].recipe.ingredientLines[i] + "</li><br>";
                    document.getElementById("LunchIngr"+l).innerHTML = ing;
              }
              image = myMeal.Lunch[l].recipe.image;
              label= myMeal.Lunch[l].recipe.label;
              recipeLink =  myMeal.Lunch[l].recipe.url;
              calories = Math.round((myMeal.Lunch[l].recipe.calories)/(myMeal.Lunch[l].recipe.yield)) + " kcal";
            
              firebase.database().ref('users/'+user1+'/Meal Plan/'+'/Lunch/'+l).set({
              
                  label : label,
                  image : image,
                  link  : recipeLink,   
                  health : healthLab,
                  ingredient : ingr,
                  calories : calories
                  });
           
                  console.log("Lunch Added Sucessfully "+l) ;
            } 

           

    }

    function renderDinner(data)
    {
        for(var i = 0;i<data.hits.length;i++) 
            {
                 myMeal.Dinner[i] = data.hits[i];
            }      

            var ing = "";
            var healthLabel = "";
           
  
            for(d=0;d<7;d++)
            {
              ing = "";
              healthLabel = "";
              let healthLab = [];
              let ingr = [];
              let image = [];
              let label;
              let recipeLink;
              let calories;
              document.getElementById("DinnerTitle"+d).innerHTML = myMeal.Dinner[d].recipe.label;
              document.getElementById("DinnerImage"+d).src = myMeal.Dinner[d].recipe.image;
              document.getElementById("DinnerLink"+d).href = myMeal.Dinner[d].recipe.url;
              document.getElementById("DinnerCal"+d).innerHTML = Math.round((myMeal.Dinner[d].recipe.calories)/(myMeal.Dinner[d].recipe.yield)) + "  kcal";
              document.getElementById("DinnerIngr"+d).innerHTML = "";
              document.getElementById("DinnerHealthLabel"+d).innerHTML = "";
    
              for(i=0;i<myMeal.Dinner[d].recipe.healthLabels.length;i++)
              {
                healthLab[i] =  myMeal.Dinner[d].recipe.healthLabels[i] ;
                    healthLabel += "<div class = chip>" + myMeal.Dinner[d].recipe.healthLabels[i] + "</div>";
                    document.getElementById("DinnerHealthLabel"+d).innerHTML = healthLabel;
              }         
              
              
              for(i=0;i<myMeal.Dinner[d].recipe.ingredientLines.length;i++)
              {
                ingr[i] = myMeal.Dinner[d].recipe.ingredientLines[i] 
                    ing += "<li>" + myMeal.Dinner[d].recipe.ingredientLines[i] + "</li><br>";
                    document.getElementById("DinnerIngr"+d).innerHTML = ing;
              }

              image = myMeal.Dinner[d].recipe.image;
              label= myMeal.Dinner[d].recipe.label;
              recipeLink =  myMeal.Dinner[d].recipe.url;
              calories = Math.round((myMeal.Dinner[d].recipe.calories)/(myMeal.Dinner[d].recipe.yield)) + " kcal";
            
              firebase.database().ref('users/'+user1+'/Meal Plan/'+'/Dinner/'+d).set({
              
                  label : label,
                  image : image,
                  link  : recipeLink,   
                  health : healthLab,
                  ingredient : ingr,
                  calories : calories
                  });
           
                  console.log("Dinner Added Sucessfully "+d) ;
  
            }


    }

 

/* btn.addEventListener("click",function(){

var ourRequest = new XMLHttpRequest();

ourRequest.open('GET','https://api.edamam.com/search?q='+ingredient+'&app_id='+app_id+'&app_key='+app_key+health+'&diet='+diet+'&to=3&calories='+minCalories+'-'+maxCalories+'&');

ourRequest.onloadstart = function(){
    console.log("Loading......");
};

ourRequest.onload = function(){

        
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);

 };

ourRequest.send();

}); */




function renderHTML(data){

    var htmlString = "";
    var perServe = 0;

    result = {}; // aur experiment kar iss se

    

    result["Breakfast"] = data.hits; // Need 7 results/meal for a weekly plan.. Mon to Sun

  
     //   console.log(mealTypes[3][0]);
   
   

   // console.log(result["Breakfast"][2]); // key : Value ...(Key for loop mein lagani hai)(Value ko individualy call karenge )

    for(var i = 0;i<data.hits.length;i++) // saare results custom arraysOfObj se display hogi.. direct data.hits se nahi
    {
        htmlString += "<img src="+data.hits[i].recipe.image+">"

        perServe = data.hits[i].recipe.calories / data.hits[i].recipe.yield;

        mealTypeStore.breakfast.label[i] = data.hits[i].recipe.label;

    

        
   // console.log(data.hits[i].recipe.label+" Calories:  "+data.hits[i].recipe.calories+" Serving "+data.hits[i].recipe.yield+" Serving/Yield "+perServe);
    
    }

    console.log(mealTypeStore.breakfast.label[0])
   
    
   
    divContainer.insertAdjacentHTML("beforeend",htmlString);

};


/*
    End of Script
    
    @created by : Shubham Raichandel     
    
    :-)
*/