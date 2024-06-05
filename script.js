//We create an event listener for the DOMContentLoaded event, which is triggered when the HTML document has been completely loaded and parsed.
document.addEventListener("DOMContentLoaded", () => {
  //We create an empty array to store the products data.
  let productsData = [];

  //We fetch the products.json file using the fetch API.
  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      productsData = products;
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching the products:", error));

  //We add an event listener for the input event on the search input field.
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (event) => {
    //We get the value of the search input field and convert it to lowercase.
    const searchQuery = event.target.value.toLowerCase();

    //We filter the products based on the search query. We check if the product name includes the search query.
    const filteredProducts = productsData.filter((product) =>
      //We convert the product name to lowercase before checking if it includes the search query.
      product.name.toLowerCase().includes(searchQuery)
    );

    //We call the displayProducts function with the filtered products as an argument to display the filtered products.
    displayProducts(filteredProducts);
  });

  //We create a displayProducts function that takes an array of products as an argument and displays them in the DOM.
  function displayProducts(products) {
    const container = document.getElementById("products-container");

    //We clear the container before displaying the products.
    container.innerHTML = "";

    //We loop through the products array and create a card for each product.
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      //We set the innerHTML of the card element with the product data.
      card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Type: ${product.product_type}</p>
                <p>Price: <span class="price">$${product.price}</span></p>
                <p>Colors: ${product.colors.join(", ")}</p>
                <p>Gender: ${product.gender}</p>
            `;

      //We append the card to the container element.
      container.appendChild(card);
    });
  }
});
