const display = document.getElementById("display");

function appendToDisplay(value) {
  // Si l'affichage est vide ou contient seulement "0", on remplace
  if (display.value === "0" || display.value === "") {
    display.value = value;
  } else {
    display.value += value;
  }
}

// Fonction pour reset la valeur
function clearDisplay() {
  document.getElementById("display").value = "0";
}

// Fonction pour calculer le résultat de l'expression mathématique
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
