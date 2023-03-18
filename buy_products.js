const addToCartButtons = document.querySelectorAll(".add-to-cart");
const totalElem = document.querySelector(".total");
const cartItemsElem = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");
const clearCartButton = document.querySelector(".clear-cart");

// array to store the items in the cart
let cartItems = [];

//checkout button disabled when loaded
checkoutButton.classList.add("disabled");
checkoutButton.disabled = true;

clearCartButton.addEventListener("click", clearCart); //clear cart event listener

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addToCart);
}

// Function to handle adding an item to the cart
function addToCart(event) {
  const product = event.target.parentElement;
  const name = product.querySelector("h3").innerText;
  const price = product.querySelector(".price").innerText;
  const quantity = parseInt(product.querySelector("input").value);

  let existingItemIndex = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      existingItemIndex = i;
      break;
    }
  }

  if (quantity === 0 && existingItemIndex !== -1) {
    cartItems.splice(existingItemIndex, 1);
  }

  else if (quantity > 0) {
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = quantity;
    } else {
      cartItems.push({ name, price, quantity });
    }
  }
  updateCart();
}

function updateCart() {
  let totalPrice = 0;
  let cartItemsString = "";
  
  for (let i = 0; i < cartItems.length; i++) {
    const itemPrice = parseFloat(cartItems[i].price.slice(1));
    const itemQuantity = cartItems[i].quantity;
    const itemTotalPrice = itemPrice * itemQuantity;

    //creates a new div and display cart items in the side panel
    cartItemsString += `<div>${cartItems[i].name} x ${itemQuantity} = $${itemTotalPrice.toFixed(2)}</div>`;
    
    totalPrice += itemTotalPrice;
  }
  
  totalElem.innerText = `Total: $${totalPrice.toFixed(2)}`; //updates the total
  cartItemsElem.innerHTML = cartItemsString;
  
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

function clearCart() {
  cartItems = [];
  updateCart();
  const quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].value = 0;
  }
  document.getElementById("checkout-form").reset();
}

// form elements
const userNameInput = document.getElementById("user-name");
const contactInput = document.getElementById("contact");
const emailInput = document.getElementById("email");
const errorSpans = document.querySelectorAll(".error");

//event listeners for blur event
userNameInput.addEventListener("blur", validateUserName);
contactInput.addEventListener("blur", validateContact);
emailInput.addEventListener("blur", validateEmail);

//validate the user name input
function validateUserName() {
  const userName = userNameInput.value.trim();
  if (userName === "") {
    setError(errorSpans[0], "Please enter your name");
  } else {
    clearError(errorSpans[0]);
  }
}

//validate the contact input
function validateContact() {
  const contact = contactInput.value.trim();
  const contactPattern = /^07[1,2,5,6,7,8][0-9]{7}$/;
  if (!contactPattern.test(contact)) {
    setError(errorSpans[1], "Please enter a valid contact number");
  } else {
    clearError(errorSpans[1]);
  }
}

//validate the email input
function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError(errorSpans[2], "Please enter a valid email address");
  } else {
    clearError(errorSpans[2]);
  }
}

//set an error message in the error span
function setError(errorSpan, errorMessage) {
  errorSpan.textContent = errorMessage;
  errorSpan.style.display = "block";
}

//clear the error message in the error span
function clearError(errorSpan) {
  errorSpan.textContent = "";
  errorSpan.style.display = "none";
}

//slides control
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// image controls
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

//back to top button functionality
let backToTopButton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
