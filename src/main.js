const apiKey = 'f9bc3e174f294092ba0e6deb7ba41f1f';

function findRandomRecipe() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Requette AJAX
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayRecipe(data, 'recipe')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

function searchRecipe() {
  //const searchInput = document.getElementById('result').value;
  const apiUrl = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick&apiKey=${apiKey}`;

  // Requette AJAX
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      //Récupération des IDs des recettes trouvées
      let recipesIDs = data.map(recipe => recipe.id).join(',');

      const recipesInfosAPI = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipesIDs}&apiKey=${apiKey}`
      //Parcours des recettes trouvées en détail
      fetch(recipesInfosAPI)
      .then(response => response.json(recipesInfosAPI))
      .then(datas => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = ` <ul>${datas.map(recipe => `<li>
        <img src=${recipe.image} class="recipe-image" alt="food-image">
        <h2 class="recipe-title">${recipe.title}</h2>
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

function displayRecipe(data, element) {
  const resultElement = document.getElementById(element);
  resultElement.innerHTML = ` <h2 id="recipe-title">${data.recipes[0].title}</h2>
                              <img src=${data.recipes[0].image} id="recipe-image" alt=food-image>
                              <p>Servings : ${data.recipes[0].servings}</p>
                              <p>Estimated time : ${data.recipes[0].readyInMinutes}</p>
                              <hr>
                              <h3 id="recipe-ingredients-title">Ingredients</h3>
                              <ul>${data.recipes[0].extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>
                              <hr>
                              <h3 id="recipe-instructions-title">Instructions</h3>
                              <p>${data.recipes[0].instructions}</p>`
}