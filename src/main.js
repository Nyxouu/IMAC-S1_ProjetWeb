const apiKey = 'aedb95c7b4f74367aa196a1afa624848';

let searchRecipesData = new Object();

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
        searchRecipesData = datas;

        let i = 0;
        resultElement.innerHTML = ` <ul id="food-result">${datas.map(recipe => `<li>
        <div class="food-result" onclick="displayRecipeFromSearch(${i})">
        <img src=${recipe.image} class="recipe-image" alt="food-image">
        <h2 class="recipe-title">${recipe.title}</h2>
        </div>
        ${i++}
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

function displayRecipeFromSearch(id) {
  displayRecipe(searchRecipesData[id], 'result');
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