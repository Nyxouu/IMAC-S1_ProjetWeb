const apiKey = 'f9bc3e174f294092ba0e6deb7ba41f1f';

function searchRandomFood() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Make an AJAX request to the foodAPI
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        const resultElement = document.getElementById('result');
        const ingredients = data.extendedIngredients.map(ingredient => ingredient.originalString);
        resultElement.innerHTML = ` <h2>${data.recipes[0].title}</h2>
                                    <img src=${data.recipes[0].image} alt=food-image>
                                    <h3>Ingrédients</h3>
                                    <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }