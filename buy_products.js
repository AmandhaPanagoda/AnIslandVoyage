const addToCartButtons = document.querySelectorAll(".add-to-cart");
const totalElem = document.querySelector(".total");
const cartItemsElem = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");
const clearCartButton = document.querySelector(".clear-cart");

let cartItems = [];

// add to cart button functionality
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    const product = this.parentElement;
    const name = product.querySelector("h3").innerText;
    const price = product.querySelector(".price").innerText;
    const quantity = parseInt(product.querySelector("input").value);

    let existingItemIndex = -1;
    for (let j = 0; j < cartItems.length; j++) {
      if (cartItems[j].name === name) {
        existingItemIndex = j;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = quantity;
    } else {
      cartItems.push({ name, price, quantity });
    }

    let totalPrice = 0;
    let cartItemsHTML = "";
    for (let j = 0; j < cartItems.length; j++) {
      const itemPrice = parseFloat(cartItems[j].price.slice(1));
      const itemTotalPrice = itemPrice * cartItems[j].quantity;
      totalPrice += itemTotalPrice;

      if (cartItems[j].quantity != 0) {
        cartItemsHTML += `<div>${cartItems[j].name} - ${itemPrice.toFixed(2)} x ${cartItems[j].quantity} = ${itemTotalPrice.toFixed(2)}</div>`;
      }   
    }
    totalElem.innerText = `Total: $${totalPrice.toFixed(2)}`;
    cartItemsElem.innerHTML = cartItemsHTML;

    //check out button 
    if (totalPrice === 0) {
      document.querySelector(".checkout").setAttribute("disabled", true);
    } else {
      document.querySelector(".checkout").removeAttribute("disabled");
    }
  });
}


//clear button functionality
clearCartButton.addEventListener("click", function () {
  const quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].value = 0;
  }
  cartItems = []; //clear cart
  totalElem.innerText = "Total: $0.00";
  cartItemsElem.innerHTML = "";
  checkoutButton.disabled = true;
});
