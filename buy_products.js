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
  } else {
    checkoutButton.classList.remove("disabled");
    checkoutButton.disabled = false;
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
  
  // Clear the cart array and update the cart
  cartItems = [];
  updateCart();
}

// Add event listener to checkout button
checkoutButton.addEventListener("click", checkout);

// Function to handle checkout
function checkout() {
  // Get the total price
  const totalPrice = parseFloat(totalElem.innerText.slice(7));

  // Verify that the total price is greater than 0 and a delivery method is selected
  if (totalPrice > 0 && deliveryMethod) {
    // Navigate to the checkout details page with the selected delivery method
    window.location.href = `checkout_details.html?delivery=${deliveryMethod}`;
  }
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


// Function to get the value of a URL parameter by name
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to set the value of an input element by ID
function setInputValueById(id, value) {
  document.getElementById(id).value = value;
}

// Function to initialize form1
function initializeForm1() {
  const form1 = document.querySelector('#checkout-form');
  form1.addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = document.querySelector('#user-name').value;
    const email = document.querySelector('#email').value;
    const contact = document.querySelector('#contact').value;
    window.location.href = `checkout-details.html?userName=${userName}&email=${email}&contact=${contact}`;
  });
}

// Function to initialize form2
function initializeForm2() {
  const userName = getParameterByName('user-name');
  const email = getParameterByName('email');
  const contact = getParameterByName('contact');
  setInputValueById('user-name', userName);
  setInputValueById('email', email);
  setInputValueById('contact', contact);
}
