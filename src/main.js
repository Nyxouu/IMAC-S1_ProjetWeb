const apiKey = 'c0da713fc0174e09b6af9ee5aea1ba8b';

let searchRecipesData = new Object();

function findRandomRecipe() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Requette AJAX
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
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

  //Balance l'affichage entre une recette complète et un ensemble de recette
  const resultElement = document.getElementById('result');
  if (resultElement.className === "recipe") {
    resultElement.classList.toggle("recipe");    
  }

  // Requette AJAX
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      //Récupération des IDs des recettes trouvées
      const recipesIDs = data.map(recipe => recipe.id).join(',');

      const recipesInfosAPI = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipesIDs}&apiKey=${apiKey}`
      //Parcours des recettes trouvées en détail
      fetch(recipesInfosAPI)
      .then(response => response.json())
      .then(datas => {
        const resultElement = document.getElementById('result');
        searchRecipesData = datas;

        let i = 0;
        resultElement.innerHTML = ` <ul id="food-result">${datas.map(recipe => `<li>
        <div class="food-result" onclick="displayRecipeFromSearch(${i++})">
        <h1 class="recipe-title">${recipe.title}</h1>
        <img src=${recipe.image} class="recipe-image" alt="food-image">
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

function displayRecipeFromSearch(id) {
  displayRecipe(searchRecipesData[id], 'result');
}

function displayRecipe(recipe, element) {
  const resultElement = document.getElementById(element);
  resultElement.classList.toggle("recipe");

  resultElement.innerHTML = ` <section id="recipe-presentation">
                              <h1 id="recipe-title">${recipe.title}</h1>
                              <img src=${recipe.image} class="recipe-image" alt=food-image>
                              <div>
                              <p>Servings : ${recipe.servings}</p>
                              <p>Estimated time : ${recipe.readyInMinutes}</p>
                              </div>
                              </section>
                              <hr>
                              <section class="recipe-informations">
                              <h2>Ingredients</h2>
                              <ul>${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>
                              </section>
                              <hr>
                              <section class="recipe-informations">
                              <h2>Instructions</h2>
                              <p>${recipe.instructions}</p>
                              </section>`;
}