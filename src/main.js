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
  const apiUrl = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick&apiKey=${apiKey}`;

  // Requette AJAX
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const resultElement = document.getElementById('result');
      resultElement.innerHTML = ` <ul>${data.map(recipe => `<li>
      <h2 id="recipe-title">${recipe.title}</h2>
      <img src=${recipe.image} id="recipe-image" alt=food-image>
      </li>`).join('')}</ul>`
      
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