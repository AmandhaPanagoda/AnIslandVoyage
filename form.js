function validate()
{
  var firstname = document.getElementById("fname").value;
  var lastname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var yourfeedback = document.getElementById("yourfeedback").value;
  var error_message = document.getElementById("error_message");
  
  error_message.style.padding = "10px";
  
  var text;
  if(firstname.length < 3)
  {
    text = "Please enter your first name";
    error_message.innerHTML = text;
    window.scrollTo(0, 0);
    return false;
  }
  if(lastname.length < 3)
  {
    text = "Please enter your last name";
    error_message.innerHTML = text;
    window.scrollTo(0, 0);
    return false;
  }
  if(isNaN(phone) || phone.length != 10)
  {
    text = "Please enter a valid phone number";
    error_message.innerHTML = text;
    window.scrollTo(0, 0);
    return false;
  }
  if(email.indexOf("@") == -1 || email.length < 6)
  {
    text = "Please enter a valid email";
    error_message.innerHTML = text;
    window.scrollTo(0, 0);
    return false;
  }
  if(yourfeedback.length < 5)
  {
    text = "Please enter your feedback";
    error_message.innerHTML = text;
    window.scrollTo(0, 0);
    return false;
  }
  alert("Form Submitted Successfully!");
  return true;
}

$(':radio').change(function() {
  console.log('New star rating: ' + this.value);
});