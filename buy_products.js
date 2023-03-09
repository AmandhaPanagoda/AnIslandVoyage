const addToCartButtons = document.querySelectorAll(".add-to-cart");
const totalElem = document.querySelector(".total");
const cartItemsElem = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");
const clearCartButton = document.querySelector(".clear-cart");

// array to store the items in the cart
let cartItems = [];

checkoutButton.classList.add("disabled");
checkoutButton.disabled = true;

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
  
    cartItemsString += `<div>${cartItems[i].name} x ${itemQuantity} = $${itemTotalPrice.toFixed(2)}</div>`;
    
    totalPrice += itemTotalPrice;
  }
  
  totalElem.innerText = `Total: $${totalPrice.toFixed(2)}`;
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

clearCartButton.addEventListener("click", clearCart);

function clearCart() {
  const quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].value = 0;
  }
  document.getElementById("checkout-form").reset();
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