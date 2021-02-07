const food= document.getElementById('foods');
const foodDetail = document.getElementById('foodsDetail');

document.getElementById('searchButton').addEventListener('click',function(event) {
    event.preventDefault();
    const input = document.getElementById('searchInputBox').value;
    dataReload(input);
});

function dataReload(input) {
    if (input.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
        food.innerHTML = null;
        foodDetail.innerHTML = null;
      }
     else {
         url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
         food.innerHTML = null;
         foodDetail.innerHTML = null;
     }
    fetch(url)
        .then(res =>res.json())
        .then(data => {
            displayData(data)
        })   
}
const displayData = data => {
    data.meals.forEach(element => {
        const div = document.createElement('div');
        const foodsDetails = `
        <div class="col">
            <div>
                <img  src="${element.strMealThumb}"/>
                <div>
                    <h5>${element.strMeal}</h5>
                    <button class="btn btn-dark" onclick="displayFoodDetails('${element.strMeal}')">Details</button>
                </div>
            </div>
        </div> 
        `;
        div.innerHTML = foodsDetails;
        food.appendChild(div);
    });
}

const displayFoodDetails = (string) => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            foodDetail.style.display = "block"
            const div = document.createElement('div');

            let element;
            let foodInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];

                if (string === element.strMeal) {
                  foodInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                    </ul>
                    </div>
                     `;
                }
            }
            div.innerHTML =foodInfo;
            foodDetail.appendChild(div);
        });
}