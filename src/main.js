const apiKey = 'f9bc3e174f294092ba0e6deb7ba41f1f';

function searchRandomFood() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Make an AJAX request to the foodAPI
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        const resultElement = document.getElementById('recipe');
        resultElement.innerHTML = ` <h2 id="recipe-title">${data.recipes[0].title}</h2>
                                    <img src=${data.recipes[0].image} id="recipe-image" alt=food-image>
                                    <h3 id=recipe-ingredients>Ingrédients</h3>
                                    <ul>${data.recipes[0].extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}</ul>
                                    <p>${data.recipes[0].instructions}`
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }