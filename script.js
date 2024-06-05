document.addEventListener("DOMContentLoaded", () => {
  let productsData = [];

  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      productsData = products;
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching the products:", error));

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
  });

  function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Type: ${product.product_type}</p>
                <p>Price: <span class="price">$${product.price}</span></p>
                <p>Colors: ${product.colors.join(", ")}</p>
                <p>Gender: ${product.gender}</p>
            `;
      container.appendChild(card);
    });
  }
});
