const myForm = document.getElementById("myForm");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open("POST", myForm.action);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Form submission successful!");
    } else {
      console.error("Form submission failed.");
    }
  };
  xhr.send(new FormData(myForm));
});
