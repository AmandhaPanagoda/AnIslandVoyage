// Retrieving data from the previous page
const itemNameJSON = localStorage.getItem("itemNameArray");
const itemNameArray = JSON.parse(itemNameJSON);

const quantityJSON = localStorage.getItem("quantityArray");
const qty = JSON.parse(quantityJSON).map(Number);

const priceJSON = localStorage.getItem("priceArray");
const price = JSON.parse(priceJSON).map(str => parseFloat(str.substring(1)));

itemNameArray.forEach((element, index) => {
  const tableRow = document.createElement("tr"); 
  
  const itemNameCell = document.createElement("td"); 
  itemNameCell.textContent = element; 
  tableRow.appendChild(itemNameCell); 
  
  const qtyCell = document.createElement("td"); 
  qtyCell.textContent = qty[index]; 
  tableRow.appendChild(qtyCell); 

  const priceCell = document.createElement("td"); 
  const total = qty[index] * price[index];
  priceCell.textContent = "$"+total; 
  tableRow.appendChild(priceCell); 
  
  document.getElementById("cartItemTableBody").appendChild(tableRow); 
});

//calculating total
const c = qty.map((num, index) => num * price[index]);
const totalPriceAllItems = c.reduce((acc, val) => acc + val, 0);

console.log(totalPriceAllItems);
document.getElementById("totalPriceAllItems").textContent = totalPriceAllItems.toFixed(2);
document.getElementById("referenceNum").innerHTML = Math.floor(Math.random() * 90000847512) + 10000847512;
document.getElementById("date-time").innerHTML=new Date();

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
  
  // Function to initialize form
function initializeForm() {
    const userName = getParameterByName('user-name');
    const email = getParameterByName('email');
    const contact = getParameterByName('contact');  
    setInputValueById('user-name', userName);
    setInputValueById('email', email);
    setInputValueById('contact', contact);
  }

  const form = document.getElementById('billing-info-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('email');
  const contactInput = document.getElementById('contact');
  const addressInput = document.getElementById('address');
  const postcodeInput = document.getElementById('postcode');
  const cardNameInput = document.getElementById('cname');
  const cardNumberInput = document.getElementById('ccnum');
  const cvvInput = document.getElementById('cvv');
  
  form.addEventListener('submit', (event) => {
    let isValid = true;
    const name = nameInput.value;
    const email = emailInput.value;
    const contact = contactInput.value;
    const address = addressInput.value;
    const postcode = postcodeInput.value;
    const cardName = cardNameInput.value;
    const cardNumber = cardNumberInput.value;
    const cvv = cvvInput.value;
  

    event.preventDefault();

    // Validate name
    if (!name || /^\d+$/.test(name)) {
      nameInput.nextElementSibling.textContent = 'Please enter your name';
      isValid = false;
    } else {
      nameInput.nextElementSibling.textContent = '';
      isValid = true;
    }
  
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.nextElementSibling.textContent = '';
      isValid = true;
    }
  
    // Validate contact
    if (contact.length !== 10) {
      contactInput.nextElementSibling.textContent = 'Please enter a valid phone number';
      isValid = false;
    } else {
      contactInput.nextElementSibling.textContent = '';
      isValid = true;
    }
  
    // Validate address
    if (!address) {
      addressInput.nextElementSibling.textContent = 'Please enter the delivery address';
      isValid = false;
    } else {
      addressInput.nextElementSibling.textContent = '';
      isValid = true;
    }

    // Validate Postcode
    if (!postcode || !/^\d{5}$/.test(postcode)) {
      postcodeInput.nextElementSibling.textContent = 'Please enter a valid postcode';
      isValid = false;
    } else {
      postcodeInput.nextElementSibling.textContent = '';
      isValid = true;
    }

    // Validate card name
    if (!cardName || /^\d+$/.test(cardName)) {
      cardNameInput.nextElementSibling.textContent = 'Please enter the card holder name';
      isValid = false;
    } else {
      cardNameInput.nextElementSibling.textContent = '';
      isValid = true;
    }

    // Validate card number
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      cardNumberInput.nextElementSibling.textContent = 'Please enter a valid card number';
      isValid = false;
    } else {
      cardNumberInput.nextElementSibling.textContent = '';
      isValid = true;
    }

    // Validate CVV
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      cvvInput.nextElementSibling.textContent = 'Please enter the 3 digit security number';
      isValid = false;
    } else {
      cvvInput.nextElementSibling.textContent = '';
      isValid = true;
    }

    if (!isValid) {
      console.log(10);
      event.preventDefault();
    } else {
      console.log("valid inputs");
      alert("Your order is submitted successfully! Await your delivery!");
      const confirmed = confirm('Do you want to proceed to products catalogue?');

      if (confirmed) {
        window.location.href = 'buy_products.html';
      } else {
        window.location.href = 'index.html';
      }
    }
});
    
  // Show error message when input is blurred
  nameInput.addEventListener('blur', () => {
    const name = nameInput.value;
    if (!name || /^\d+$/.test(name)) {
      nameInput.nextElementSibling.textContent = 'Please enter your name';
    } else {
      nameInput.nextElementSibling.textContent = '';
    }
  });

  emailInput.addEventListener('blur', () => {
    const email = emailInput.value;
    if (!/\S+@\S+\.\S+/.test(email)) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
    } else {
      emailInput.nextElementSibling.textContent = '';
    }
  });
  
  contactInput.addEventListener('blur', () => {
    const contact = contactInput.value;
    if (contact.length !== 10) {
      contactInput.nextElementSibling.textContent = 'Please enter a valid phone number';
    } else {
      contactInput.nextElementSibling.textContent = '';
    }
  });
  
  addressInput.addEventListener('blur', () => {
    const address = addressInput.value;
    if (!address) {
      addressInput.nextElementSibling.textContent = 'Please enter the delivery address';
    } else {
      addressInput.nextElementSibling.textContent = '';
    }
  });

  postcodeInput.addEventListener('blur', () => {
    const postcode = postcodeInput.value;
    if (!postcode || !/^\d{5}$/.test(postcode)) {
      postcodeInput.nextElementSibling.textContent = 'Please enter a valid postcode';
    } else {
      postcodeInput.nextElementSibling.textContent = '';
    }
  });

  cardNameInput.addEventListener('blur', () => {
    const cardName = cardNameInput.value;
    if (!cardName || /^\d+$/.test(cardName)) {
      cardNameInput.nextElementSibling.textContent = 'Please enter the cardholder\'s name';
    } else {
      cardNameInput.nextElementSibling.textContent = '';
    }
  });

  cardNumberInput.addEventListener('blur', () => {
    const cardNumber = cardNumberInput.value;
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      cardNumberInput.nextElementSibling.textContent = 'Please enter a valid card number';
    } else {
      cardNumberInput.nextElementSibling.textContent = '';
    }
  });

  cvvInput.addEventListener('blur', () => {
    const cvv = cvvInput.value;
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      cvvInput.nextElementSibling.textContent = 'Please enter a valid security number';
    } else {
      cvvInput.nextElementSibling.textContent = '';
    }
  });
  
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