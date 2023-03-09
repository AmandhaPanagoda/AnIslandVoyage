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
  priceCell.textContent = total; 
  tableRow.appendChild(priceCell); 
  
  document.getElementById("cartItemTableBody").appendChild(tableRow); 
});

//calculating total
const c = qty.map((num, index) => num * price[index]);
const totalPriceAllItems = c.reduce((acc, val) => acc + val, 0);

console.log(totalPriceAllItems);
document.getElementById("totalPriceAllItems").textContent = totalPriceAllItems.toFixed(2);

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
  const cardNameInput = document.getElementById('cname');
  const cardNumberInput = document.getElementById('ccnum');
  const cvvInput = document.getElementById('cvv');
  
  form.addEventListener('submit', (event) => {
    let isValid = true;
    const name = nameInput.value;
    const email = emailInput.value;
    const contact = contactInput.value;
    const address = addressInput.value;
    const cardName = cardNameInput.value;
    const cardNumber = cardNumberInput.value;
    const cvv = cvvInput.value;
  
    // Validate name
    if (!name || /^\d+$/.test(name)) {
      nameInput.nextElementSibling.textContent = 'Please enter a valid name';
      isValid = false;
    } else {
      nameInput.nextElementSibling.textContent = '';
    }
  
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.nextElementSibling.textContent = '';
    }
  
    // Validate contact
    if (contact.length !== 10) {
      contactInput.nextElementSibling.textContent = 'Please enter a valid 10 digit phone number';
      isValid = false;
    } else {
      contactInput.nextElementSibling.textContent = '';
    }
  
    // Validate address
    if (!address) {
      addressInput.nextElementSibling.textContent = 'Please enter an address';
      isValid = false;
    } else {
      addressInput.nextElementSibling.textContent = '';
    }

    // Validate card name
    if (!cardName || /^\d+$/.test(cardName)) {
      cardNameInput.nextElementSibling.textContent = 'Please enter a valid card name';
      isValid = false;
    } else {
      cardNameInput.nextElementSibling.textContent = '';
    }

    // Validate card number
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      cardNumberInput.nextElementSibling.textContent = 'Please enter a valid 16 digit card number';
      isValid = false;
    } else {
      cardNumberInput.nextElementSibling.textContent = '';
    }

    // Validate CVV
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      cvvInput.nextElementSibling.textContent = 'Please enter a valid 3 digit CVV number';
      isValid = false;
    } else {
      cvvInput.nextElementSibling.textContent = '';
    }

    if (!isValid) {
      event.preventDefault();
    }
});
    
  // Show error message when input is blurred
  nameInput.addEventListener('blur', () => {
    const name = nameInput.value;
    if (!name || /^\d+$/.test(name)) {
      nameInput.nextElementSibling.textContent = 'Please enter a valid name';
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
      contactInput.nextElementSibling.textContent = 'Please enter a valid 10 digit phone number';
    } else {
      contactInput.nextElementSibling.textContent = '';
    }
  });
  
  addressInput.addEventListener('blur', () => {
    const address = addressInput.value;
    if (!address) {
      addressInput.nextElementSibling.textContent = 'Please enter an address';
    } else {
      addressInput.nextElementSibling.textContent = '';
    }
  });

  cardNameInput.addEventListener('blur', () => {
    const cardName = cardNameInput.value;
    if (!cardName || /^\d+$/.test(cardName)) {
      cardNameInput.nextElementSibling.textContent = 'Please enter a valid name';
    } else {
      cardNameInput.nextElementSibling.textContent = '';
    }
  });

  cardNumberInput.addEventListener('blur', () => {
    const cardNumber = cardNameInput.value;
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      cardNumberInput.nextElementSibling.textContent = 'Please enter a valid card number';
    } else {
      cardNumberInput.nextElementSibling.textContent = '';
    }
  });

  cvvInput.addEventListener('blur', () => {
    const cvv = cvvInput.value;
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      cvvInput.nextElementSibling.textContent = 'Please enter a valid cvv';
    } else {
      cvvInput.nextElementSibling.textContent = '';
    }
  });
  
