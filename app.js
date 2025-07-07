const loadAllMeal = () => {
    searchText = document.getElementById("input").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            displayFood(data);
        });
    document.getElementById("input").value = "";
};

const displayFood = (food) => {
    const foodContainer = document.getElementById("foodContainer");
    foodContainer.innerHTML = "";
    const meals = food.meals;
    if (meals) {
        meals.forEach((meal) => {
            const div = document.createElement("div");
            div.classList.add("foodCard");
            console.log(meal);
            div.innerHTML = `
            <div class="card" onclick="displayDetails(${meal.idMeal})" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${meal.strMeal}</p>
                </div>
            </div>
            `;
            foodContainer.appendChild(div);
        });
    } else {
        const div = document.createElement("div");
        div.innerHTML = "<h3>No Items Found!</h3>";
        foodContainer.appendChild(div);
    }
};

document.getElementById("search").addEventListener("click", loadAllMeal);

const displayDetails = (id) => {
    const displaySpace = document.getElementById("displaySpace");
    displaySpace.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            food = data.meals[0];
            displaySpace.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${food.strMeal}</h5>
                        <p class="card-text">Ingredients</p>
                        <ul>
                            <li>${food.strIngredient1}</li>
                            <li>${food.strIngredient2}</li>
                            <li>${food.strIngredient3}</li>
                            <li>${food.strIngredient4}</li>
                            <li>${food.strIngredient5}</li>
                        </ul>
                    </div>
                </div>`;
        });
};
