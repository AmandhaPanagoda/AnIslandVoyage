// Get the necessary elements from the HTML
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const totalElem = document.querySelector(".total");
const cartItemsElem = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");
const clearCartButton = document.querySelector(".clear-cart");

// Define an array to store the items in the cart
let cartItems = [];

// Disable the checkout button initially
checkoutButton.classList.add("disabled");
checkoutButton.disabled = true;

// Add event listeners to the add to cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addToCart);
}

// Function to handle adding an item to the cart
function addToCart(event) {
  // Get the product details from the HTML
  const product = event.target.parentElement;
  const name = product.querySelector("h3").innerText;
  const price = product.querySelector(".price").innerText;
  const quantity = parseInt(product.querySelector("input").value);

  // Check if the item already exists in the cart
  let existingItemIndex = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      existingItemIndex = i;
      break;
    }
  }

  // Remove the item from the cart if the quantity is 0
  if (quantity === 0 && existingItemIndex !== -1) {
    cartItems.splice(existingItemIndex, 1);
  }

  // Add or update the item in the cart if the quantity is greater than 0
  else if (quantity > 0) {
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = quantity;
    } else {
      cartItems.push({ name, price, quantity });
    }
  }

  // Update the cart
  updateCart();
}

// Function to update the cart
function updateCart() {
  // Initialize variables to store the total price and cart items HTML
  let totalPrice = 0;
  let cartItemsString = "";
  
  // Loop through the items in the cart
  for (let i = 0; i < cartItems.length; i++) {
    // Get the price and quantity of the item
    const itemPrice = parseFloat(cartItems[i].price.slice(1));
    const itemQuantity = cartItems[i].quantity;
    
    // Calculate the total price of the item
    const itemTotalPrice = itemPrice * itemQuantity;
    
    // Add the item's HTML to the cart items HTML
    cartItemsString += `<div>${cartItems[i].name} - ${itemPrice.toFixed(2)} x ${itemQuantity} = ${itemTotalPrice.toFixed(2)}</div>`;
    
    // Add the item's total price to the total price
    totalPrice += itemTotalPrice;
  }
  
  // Set the total and cart items HTML in the HTML
  totalElem.innerText = `Total: $${totalPrice.toFixed(2)}`;
  cartItemsElem.innerHTML = cartItemsString;
  
  // Disable the checkout button if the total is 0
  if (totalPrice === 0) {
    checkoutButton.classList.add("disabled");
    checkoutButton.disabled = true;
    alert("Your cart is empty! Please choose some items.");
  } else {
    checkoutButton.classList.remove("disabled");
    checkoutButton.disabled = false;
    const nameArray = cartItems.map(item => item.name);
    localStorage.setItem("itemNameArray", JSON.stringify(nameArray));

    const quantityArray = cartItems.map(item => item.quantity);
    localStorage.setItem("quantityArray", JSON.stringify(quantityArray));

    const priceArray = cartItems.map(item => item.price);
    localStorage.setItem("priceArray", JSON.stringify(priceArray));
  }
}

// Event listener for clear cart button
clearCartButton.addEventListener("click", clearCart);

// Clear the cart including the quantity
function clearCart() {
  // Set the quantity of all input fields to 0
  const quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].value = 0;
  }
  document.getElementById("checkout-form").reset();
  // Clear the cart array and update the cart
  cartItems = [];
  updateCart();
}

//slides control
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex-1].style.display = "block";

}




