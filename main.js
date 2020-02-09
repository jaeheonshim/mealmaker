const mealDOM = {
    mealTitle: document.getElementById("title"),
    mealImage: document.getElementById("image"),
    mealCategory: document.getElementById("category"),
    mealArea: document.getElementById("area"),
    mealInstructions: document.getElementById("instructions"),
    mealIngredients: document.getElementById("ingredients"),
    mealVideo: document.getElementById("video")
}

function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        displayMeal(json);
        document.getElementById("meal-container").style.display = "block";
    });
}

function displayMeal(json) {
    let meal = json.meals[0];

    mealDOM.mealTitle.textContent = meal.strMeal;
    mealDOM.mealImage.src = meal.strMealThumb;
    mealDOM.mealCategory.textContent = meal.strCategory;
    mealDOM.mealArea.textContent = meal.strArea;
    mealDOM.mealInstructions.textContent = meal.strInstructions;
    mealDOM.mealVideo.src = String(meal.strYoutube).replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    
    const listElement = document.createElement("ul");
    for(let i = 0; i <= 20; i++) {
        if(meal[`strIngredient${i}`] != undefined && String(meal[`strIngredient${i}`]).length > 0) {
            let listItem = document.createElement("li");
            listItem.innerHTML = (meal[`strIngredient${i}`]);
            
            listElement.appendChild(listItem);
        }
    }
    mealDOM.mealIngredients.outerHTML = listElement.outerHTML;
}

document.getElementById("generate-meal-button").addEventListener("click", getRandomMeal);