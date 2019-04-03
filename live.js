function fetch() {
    
    let app_id = "9954c1eb";
    let app_key = "ba8e45e171d09167f5040d51e2d37b8c";

    let str = document.getElementById("searchBar");

    let request = new XMLHttpRequest();

    request.open('GET', 'https://api.edamam.com/search?q=' + str.value + '&app_id=' + app_id + '&app_key=' + app_key);

    console.log(str.value);
 
    request.onload = function () {
        data = JSON.parse(request.responseText);
        result(data);
        
  
    }

    request.send();
    
 
   
};

function result(data) {

    let divResult = document.getElementById("result");
    let count = data.hits.length;

    for (i = 0; i < count; i++) {

        console.log(data.hits[i].recipe.label);

        let healthLabel = "";
        let ingredients = "";

        for (h = 0; h < data.hits[i].recipe.healthLabels.length; h++) {
            healthLabel += "<div class = chip>" + data.hits[i].recipe.healthLabels[h] + "</div>";
        }

        for (x = 0; x < data.hits[i].recipe.healthLabels.length; x++) {
            ingredients += "<li>" + data.hits[i].recipe.ingredientLines[x] + "</li><br>";
        }

        let item = `<div class="col m4 s12">
                        <div class="card large">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="${data.hits[i].recipe.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator"><b>${data.hits[i].recipe.label}</b></span>
                    <!--        <div class="text-darken-3 left">${healthLabel}<br></div> -->
                            <b class="text-grey text-darken-2">Calories: </b><span class="text-darken-1">${Math.round(data.hits[i].recipe.calories)} Kcal</span><br>
                            <b class="text-grey text-darken-2">Servings: </b><span class="text-darken-1">${data.hits[i].recipe.yield}</span>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4"><b>Ingredients</b><i class="material-icons right">close</i></span>
                            <br>
                            <span class="left">${ingredients}</span>
                        </div>
                        <div class="card-action">
                            <a href="${data.hits[i].recipe.url}">Recipe link</a>
                        </div>
                    </div>
                </div>`;

        divResult.insertAdjacentHTML("beforeend", item);

       
       
    }

 
}