const typeSwitch = document.getElementById("typeSwitch");
const typeLabel = document.getElementById("typeLabel");
const scoreField = document.getElementById("scoreField");

typeSwitch.addEventListener("change", () => {
  if (typeSwitch.checked) {
    typeLabel.textContent = "Bad";
    scoreField.style.display = "none";
  } else {
    typeLabel.textContent = "Good";
    scoreField.style.display = "flex";
  }
});
