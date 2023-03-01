const products = [
    {
      name: "Product 1",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 9.99,
    },
    {
      name: "Product 2",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 14.99,
    },
    {
      name: "Product 3",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 19.99,
    },
    {
      name: "Product 4",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 24.99,
    },
    {
      name: "Product 5",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 29.99,
    },
    {
      name: "Product 6",
      image: "https://dummyimage.com/300x200/000/fff",
      price: 34.99,
    },
  ];
  
  const cart = [];
  
  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  
  function renderProducts() {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
  
      const imageElement = document.createElement("img");
      imageElement.src = product.image;
      productElement.appendChild(imageElement);
  
      const nameElement = document.createElement("h3");
      nameElement.textContent = product.name;
      productElement.appendChild(nameElement);
  
      const priceElement = document.createElement("p");
      priceElement.classList.add("price");
      priceElement.textContent = `$${product.price.toFixed(2)}`;
      productElement.appendChild(priceElement);
  
      const quantityElement = document.createElement("input");
      quantityElement.type = "number";
      quantityElement.min = "1";
      quantityElement.max = "10";
      quantityElement.value = "1";
      productElement.appendChild(quantityElement);
  
      const buttonElement = document.createElement("button");
      buttonElement.classList.add("add-to-cart");
      buttonElement.textContent = "Add to cart";
      buttonElement.addEventListener("click", () => addToCart(product, quantityElement.value));
      productElement.appendChild(buttonElement);
  
      productList.appendChild(productElement);
    });
  }
  
  function renderCart() {
    cartList.innerHTML = "";
  
    cart.forEach((cartItem) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
  
      const imageElement = document.createElement("img");
      imageElement.src = cartItem.image;
      cartItemElement.appendChild(imageElement);
  
      const detailsElement = document.createElement("div");
      detailsElement.classList.add("cart-item-details");
  
      const nameElement = document.createElement("h4");
      nameElement.textContent = cartItem.name;
      detailsElement.appendChild(nameElement);
  
      const priceElement = document.createElement("p");
      priceElement.textContent = `$${cartItem.price.toFixed(2)}`;
      detailsElement.appendChild(priceElement);
  
      const quantityElement = document.createElement("p");
      quantityElement.textContent = `Quantity: ${cartItem.quantity}`;
      detailsElement.appendChild(quantityElement);
  
      cartItemElement.appendChild(detailsElement);
  
      cartList.appendChild(cartItemElement);
    });
  
    cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  }
  
  function addToCart(product, quantity) {
    let cartItem = cart.find(item => item.name === product.name);
    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
    } else {
      cart.push({
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: parseInt(quantity),
      });
    }
    renderCart();
  }
  
  
   