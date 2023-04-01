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

console.log(totalPriceAllItems); //bug fixing - to check if total works
document.getElementById("totalPriceAllItems").textContent = totalPriceAllItems.toFixed(2);
const referenceNum = Math.floor(Math.random() * 90000847512) + 10000847512;
document.getElementById("referenceNum").innerHTML = referenceNum;
document.getElementById("date-time").innerHTML=new Date();

document.getElementById("download").addEventListener("click", PDFquote);

// download invoice feature using jsPDF 
function PDFquote() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let name = "Name: "+ getParameterByName('user-name');
  let ref = "Reference number: #"+referenceNum.toString();
  let tot = "Total = $"+totalPriceAllItems.toString();

  doc.setTextColor(28,58,179); //set color of the next texts
  doc.text(name, 10, 20);
  doc.text(ref, 10, 30);
  doc.text(tot, 10, 40);
  doc.text("Your Item List", 10, 60);

  doc.setTextColor(0,0,0); //reset the color
  doc.setFontSize(12);
  let coordinate = 70;
  for (let i = 0; i < itemNameArray.length; i++) {
    let itemName = itemNameArray[i];
    let itemQty = qty[i];
    let itemPrice = price[i];
    let lineText = `${itemName} x ${itemQty} = $${itemPrice}`;
    doc.text(lineText, 10, coordinate + (i * 10));
  }

  doc.text("Thank you for shopping with us!",70,150);
  doc.save("invoice.pdf");
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
  
// Function to add existing data to fields
function initializeForm() {
    const userName = getParameterByName('user-name');
    const email = getParameterByName('email');
    const contact = getParameterByName('contact');  
    setInputValueById('user-name', userName);
    setInputValueById('email', email);
    setInputValueById('contact', contact);
  }

// Function to set the value of an input element by ID
function setInputValueById(id, value) {
  document.getElementById(id).value = value;
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
const expyearInput = document.getElementById('expyear');
const expmonthInput = document.getElementById('expmonth');
const districtInput = document.getElementById('district');
const provinceInput = document.getElementById('province');
  
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
    const expyear = expyearInput.options[expyearInput.selectedIndex].value;
    const expmonth = expmonthInput.options[expmonthInput.selectedIndex].value;
    const district = districtInput.options[districtInput.selectedIndex].value;
    const province = provinceInput.options[provinceInput.selectedIndex].value;

    event.preventDefault();

    // Validate expyear
    if (expyear == "") {
      expyearInput.nextElementSibling.textContent = 'Select expiry year';
      isValid = false;
    } else {
      expyearInput.nextElementSibling.textContent = '';
    }

    // Validate expmonth
    if (expmonth == "") {
      expmonthInput.nextElementSibling.textContent = 'Select expiry month';
      isValid = false;
    } else {
      expmonthInput.nextElementSibling.textContent = '';
    }

    // Validate district
    if (district == "") {
      districtInput.nextElementSibling.textContent = 'Select your district';
      isValid = false;
    } else {
      districtInput.nextElementSibling.textContent = '';
    }

    // Validate province
    if (province == "") {
      provinceInput.nextElementSibling.textContent = 'Select your province';
      isValid = false;
    } else {
      provinceInput.nextElementSibling.textContent = '';
    }

    // Validate name
    if (!name || /^\d+$/.test(name)) {
      nameInput.nextElementSibling.textContent = 'Please enter your name';
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
      contactInput.nextElementSibling.textContent = 'Please enter a valid phone number';
      isValid = false;
      console.log("invalid contact");
    } else {
      contactInput.nextElementSibling.textContent = '';
    }
  
    // Validate address
    if (!address) {
      addressInput.nextElementSibling.textContent = 'Please enter the delivery address';
      isValid = false;
    } else {
      addressInput.nextElementSibling.textContent = '';
    }

    // Validate Postcode
    if (!postcode || !/^\d{5}$/.test(postcode)) {
      postcodeInput.nextElementSibling.textContent = 'Please enter a valid postcode';
      isValid = false;
    } else {
      postcodeInput.nextElementSibling.textContent = '';
    }

    // Validate card name
    if (!cardName || /^\d+$/.test(cardName)) {
      cardNameInput.nextElementSibling.textContent = 'Please enter the card holder name';
      isValid = false;
    } else {
      cardNameInput.nextElementSibling.textContent = '';
    }

    // Validate card number
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      cardNumberInput.nextElementSibling.textContent = 'Please enter a valid card number';
      isValid = false;
    } else {
      cardNumberInput.nextElementSibling.textContent = '';
    }

    // Validate CVV
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      cvvInput.nextElementSibling.textContent = 'Please enter the 3 digit security number';
      isValid = false;
    } else {
      cvvInput.nextElementSibling.textContent = '';
    }

    if (!isValid) {
      console.log("not valid");
      event.preventDefault();
    } else {
      console.log("valid inputs");
      alert("Your order is submitted successfully! Await your delivery!");
      const confirmed = confirm('Do you want to proceed to products catalogue?');

      if (confirmed) {
        window.location.href = 'buy_products.html';
      } else {
        window.location.href = 'home.html';
      }
    }
});
    
// Show error message when input is blurred
//reference -> https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
expyearInput.addEventListener('blur', () => {
  const expyear = expyearInput.options[expyearInput.selectedIndex].value;
  if (expyear == "") {
    expyearInput.nextElementSibling.textContent = 'Select expiry year';
  } else {
    expyearInput.nextElementSibling.textContent = '';
  }
});

expmonthInput.addEventListener('blur', () => {
  const expmonth = expmonthInput.options[expmonthInput.selectedIndex].value;
  if (expmonth == "") {
    expmonthInput.nextElementSibling.textContent = 'Select expiry month';
  } else {
    expmonthInput.nextElementSibling.textContent = '';
  }
});

districtInput.addEventListener('blur', () => {
  const district = districtInput.options[districtInput.selectedIndex].value;
  if (district == "") {
    districtInput.nextElementSibling.textContent = 'Select your district';
  } else {
    districtInput.nextElementSibling.textContent = '';
  }
});

provinceInput.addEventListener('blur', () => {
  const province = provinceInput.options[provinceInput.selectedIndex].value;
  if (province == "") {
    provinceInput.nextElementSibling.textContent = 'Select your province';
  } else {
    provinceInput.nextElementSibling.textContent = '';
  }
});

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


