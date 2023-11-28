function searchFood() {
    const foodInput = document.getElementById('foodInput');
    const foodName = foodInput.value;

    if (!foodName) {
      alert('Please enter a food name.');
      return;
    }

    // Replace 'YOUR_API_KEY' with the actual API key for foodAPI
    const apiKey = 'f9bc3e174f294092ba0e6deb7ba41f1f';
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    // Make an AJAX request to the foodAPI
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<p>${data.recipes[0].title}</p>`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }