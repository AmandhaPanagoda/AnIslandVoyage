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
const submitButton = document.getElementById('placeorderbutton');
const resetButton = document.getElementById('resetbutton');

//submit button disabled when loaded
submitButton.classList.add("disabled");
submitButton.disabled = true;

//fetching input fields
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

const correctSpans = document.querySelectorAll(".correct");
  
function checkAnswers() {
  //entered values
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

  if ( !name || /^\d+$/.test(name) || !/\S+@\S+\.\S+/.test(email) || district == "" || province == "" || contact.length !== 10 || !address || !postcode || !/^\d{5}$/.test(postcode) || !cardName || /^\d+$/.test(cardName) || !cardNumber || !/^\d{16}$/.test(cardNumber) || !cvv || !/^\d{3}$/.test(cvv) || expyear == "" || expmonth == "" ) {
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
    console.log("valid inputs");
  }
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Your order is submitted successfully!\nAwait your delivery!");
    const confirmed = confirm('Do you want to proceed to products catalogue?');

    if (confirmed) {
      window.location.href = 'buy_products.html';
    } else {
      window.location.href = 'home.html';
      localStorage.clear(); //clear the local storage
    }
});

resetButton.addEventListener("click", function() {
  for (let i = 0; i < correctSpans.length; i++) {
    correctSpans[i].innerHTML = ""; //remove the tick buttons
  }
  submitButton.disabled = true;
  submitButton.classList.add("disabled"); // disable the submit button
});

// Show error message when input is entered
//reference -> https://www.webmound.com/input-vs-change-vs-blur-vs-focus-javascript-events/#:~:text=In%20JavaScript%2C%20the%20focus%20and,and%20the%20field%20loses%20focus.

//name validation
nameInput.addEventListener('input', () => {
  const name = nameInput.value;
  if (!name || /^\d+$/.test(name)) {
    nameInput.nextElementSibling.textContent = 'Please enter your name';
    correctSpans[0].innerHTML = "";
  } else {
    nameInput.nextElementSibling.textContent = '';
    correctSpans[0].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//email validation
emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  if (!/\S+@\S+\.\S+/.test(email)) {
    emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
    correctSpans[1].innerHTML = "";
  } else {
    emailInput.nextElementSibling.textContent = '';
    correctSpans[1].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//contact validation
contactInput.addEventListener('input', () => {
  const contact = contactInput.value;
  if (contact.length !== 10) {
    contactInput.nextElementSibling.textContent = 'Please enter a valid phone number';
    correctSpans[2].innerHTML = "";
  } else {
    contactInput.nextElementSibling.textContent = '';
    correctSpans[2].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//address  validation
addressInput.addEventListener('input', () => {
  const address = addressInput.value;
  if (!address) {
    addressInput.nextElementSibling.textContent = 'Please enter the delivery address';
    correctSpans[3].innerHTML = "";
  } else {
    addressInput.nextElementSibling.textContent = '';
    correctSpans[3].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//district validation
districtInput.addEventListener('input', () => {
  const district = districtInput.options[districtInput.selectedIndex].value;
  if (district == "") {
    districtInput.nextElementSibling.textContent = 'Select your district';
    correctSpans[4].innerHTML = "";
  } else {
    districtInput.nextElementSibling.textContent = '';
    correctSpans[4].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//province validation
provinceInput.addEventListener('input', () => {
  const province = provinceInput.options[provinceInput.selectedIndex].value;
  if (province == "") {
    provinceInput.nextElementSibling.textContent = 'Select your province';
    correctSpans[5].innerHTML = "";
  } else {
    provinceInput.nextElementSibling.textContent = '';
    correctSpans[5].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//district validation  blur
districtInput.addEventListener('blur', () => {
  const district = districtInput.options[districtInput.selectedIndex].value;
  if (district == "") {
    districtInput.nextElementSibling.textContent = 'Select your district';
    correctSpans[4].innerHTML = "";
  } else {
    districtInput.nextElementSibling.textContent = '';
    correctSpans[4].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//province validation blur
provinceInput.addEventListener('blur', () => {
  const province = provinceInput.options[provinceInput.selectedIndex].value;
  if (province == "") {
    provinceInput.nextElementSibling.textContent = 'Select your province';
    correctSpans[5].innerHTML = "";
  } else {
    provinceInput.nextElementSibling.textContent = '';
    correctSpans[5].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//postcode validation
postcodeInput.addEventListener('input', () => {
  const postcode = postcodeInput.value;
  if (!postcode || !/^\d{5}$/.test(postcode)) {
    postcodeInput.nextElementSibling.textContent = 'Please enter a valid postcode';
    correctSpans[6].innerHTML = "";
  } else {
    postcodeInput.nextElementSibling.textContent = '';
    correctSpans[6].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//card name
cardNameInput.addEventListener('input', () => {
  const cardName = cardNameInput.value;
  if (!cardName || /^\d+$/.test(cardName)) {
    cardNameInput.nextElementSibling.textContent = 'Please enter the cardholder\'s name';
    correctSpans[7].innerHTML = "";
  } else {
    cardNameInput.nextElementSibling.textContent = '';
    correctSpans[7].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//card number
cardNumberInput.addEventListener('input', () => {
  const cardNumber = cardNumberInput.value;
  if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
    cardNumberInput.nextElementSibling.textContent = 'Please enter a valid card number';
    correctSpans[8].innerHTML = "";
  } else {
    cardNumberInput.nextElementSibling.textContent = '';
    correctSpans[8].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//cvv input
cvvInput.addEventListener('input', () => {
  const cvv = cvvInput.value;
  if (!cvv || !/^\d{3}$/.test(cvv)) {
    cvvInput.nextElementSibling.textContent = 'Please enter a valid security number';
    correctSpans[9].innerHTML = "";
  } else {
    cvvInput.nextElementSibling.textContent = '';
    correctSpans[9].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//exp month
expmonthInput.addEventListener('input', () => {
  const expmonth = expmonthInput.options[expmonthInput.selectedIndex].value;
  if (expmonth == "") {
    expmonthInput.nextElementSibling.textContent = 'Select expiry month';
    correctSpans[10].innerHTML = "";
  } else {
    expmonthInput.nextElementSibling.textContent = '';
    correctSpans[10].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//exp year
expyearInput.addEventListener('input', () => {
  const expyear = expyearInput.options[expyearInput.selectedIndex].value;
  if (expyear == "") {
    expyearInput.nextElementSibling.textContent = 'Select expiry year';
    correctSpans[11].innerHTML = "";
  } else {
    expyearInput.nextElementSibling.textContent = '';
    correctSpans[11].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//exp month blur event
expmonthInput.addEventListener('blur', () => {
  const expmonth = expmonthInput.options[expmonthInput.selectedIndex].value;
  if (expmonth == "") {
    expmonthInput.nextElementSibling.textContent = 'Select expiry month';
    correctSpans[10].innerHTML = "";
  } else {
    expmonthInput.nextElementSibling.textContent = '';
    correctSpans[10].innerHTML = "&#10003;";
  }
  checkAnswers();
});

//exp year blur event
expyearInput.addEventListener('blur', () => {
  const expyear = expyearInput.options[expyearInput.selectedIndex].value;
  if (expyear == "") {
    expyearInput.nextElementSibling.textContent = 'Select expiry year';
    correctSpans[11].innerHTML = "";
  } else {
    expyearInput.nextElementSibling.textContent = '';
    correctSpans[11].innerHTML = "&#10003;";
  }
  checkAnswers();
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


