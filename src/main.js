const apiKey = 'cd75985f60ac4866b671832f3009dc74';

let searchRecipesData;

function findRandomRecipe() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Requette AJAX
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.recipes[0]);
        displayRecipe(data.recipes[0], 'recipe')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

function searchRecipe() {
  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value;
  const apiUrl = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${searchValue}&apiKey=${apiKey}`;

  // Requette AJAX
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      //Récupération des IDs des recettes trouvées
      let recipesIDs = data.map(recipe => recipe.id).join(',');

      const recipesInfosAPI = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipesIDs}&apiKey=${apiKey}`
      //Parcours des recettes trouvées en détail
      fetch(recipesInfosAPI)
      .then(response => response.json())
      .then(datas => {
        const resultElement = document.getElementById('result');
        searchRecipesData = datas.map(recipe => ).join('');

        resultElement.innerHTML = ` <ul>${datas.map(recipe => `<li>
        <div class="food-result" data-recipe='${JSON.stringify(recipe)}' onclick="displayRecipeFromSearch()">
        <img src=${recipe.image} class="recipe-image" alt="food-image">
        <h2 class="recipe-title">${recipe.title}</h2>
        </div>
        </li>`).join('')}</ul>`
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayRecipeFromSearch() {
  const recipeData = JSON.parse(element.getAttribute('data-recipe'));
  displayRecipe(recipeData, 'result')
}

function displayRecipe(recipe, element) {
  const resultElement = document.getElementById(element);
  resultElement.innerHTML = ` <h1 id="recipe-title">${recipe.title}</h1>
                              <img src=${recipe.image} id="recipe-image" alt=food-image>
                              <p>Servings : ${recipe.servings}</p>
                              <p>Estimated time : ${recipe.readyInMinutes}</p>
                              <hr>
                              <h2 id="recipe-ingredients-title">Ingredients</h2>
                              <ul>${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>
                              <hr>
                              <h2 id="recipe-instructions-title">Instructions</h2>
                              <p>${recipe.instructions}</p>`
}