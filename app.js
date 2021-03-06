const food= document.getElementById('foods');
const foodDetail = document.getElementById('foodsDetail');

document.getElementById('searchButton').addEventListener('click',function(event) {
    event.preventDefault();
    const input = document.getElementById('searchInputBox').value;
    dataReload(input);
});

function dataReload(input) {
    if (input.length===1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
        food.innerHTML = null;
        foodDetail.innerHTML = null;
      }
     else {
         url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
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
        div.innerHTML= `
        <div class="card bg-light" style="width: 19rem;height:26rem">
        <img class="card-img-top" src="${element.strMealThumb}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${element.strMeal}</h5>
            <button onclick="displayFoodDetails('${element.strMeal}')" class="btn btn-dark">Details</button>            
        </div>
        </div>
        `;
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

                if (string===element.strMeal) {
                    div.innerHTML = `
                    <img class="card-img-top" src="${element.strMealThumb}">
                    <div class="card-body">
                    <h2 class="card-title">${element.strMeal}</h2>
                    <h5>Ingredients</h5>
                    <ul>                
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                    </ul>
                    </div>`;
                }
            }
            foodDetail.appendChild(div);
        });
}