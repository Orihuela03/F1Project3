let bicycles = [];

function initialize() {
  const BICYCLE_FORM = document.getElementById("bicycle-form");
  BICYCLE_FORM.addEventListener("submit", addBicycle);
  showBicycles();

  if (localStorage.getItem("bicycles")) {
    bicycles = JSON.parse(localStorage.getItem("bicycles"));
    showBicycles();
  }
}

function addBicycle(event) {
  event.preventDefault();
  const BRAND = event.target.brand.value;
  const MODEL = event.target.model.value;

  bicycles.push({
    brand: BRAND,
    model: MODEL
  });

  localStorage.setItem("bicycles", JSON.stringify(bicycles));

  event.target.reset();
  hideErrors();
  showBicycles();
}

function showBicycles() {
  const BICYCLE_LIST = document.getElementById("bicycle-list");

  let allBicycles = "";
  for (let i = 0; i < bicycles.length; i++) {
    allBicycles += `<li>${bicycles[i].brand} ${bicycles[i].model} 
                    <button onclick="updateBicycle(${i})">Update</button>
                    <button onclick="deleteBicycle(${i})">Delete</button></li>`;
  }
  BICYCLE_LIST.innerHTML = allBicycles;
}

function deleteBicycle(bicycleIndex) {
  bicycles.splice(bicycleIndex, 1);

  localStorage.setItem("bicycles", JSON.stringify(bicycles));

  showBicycles();
}

function updateBicycle(bicycleIndex) {
  const newBrand = prompt("Ingrese la nueva marca:");
  const newModel = prompt("Ingrese el nuevo modelo:");

  if (newBrand !== null && newModel !== null) {
    bicycles[bicycleIndex].brand = newBrand;
    bicycles[bicycleIndex].model = newModel;

    localStorage.setItem("bicycles", JSON.stringify(bicycles));

    showBicycles();
  }
}

function displayError(errorId, errorMessage) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessage;
  errorElement.style.visibility = "visible";
}

function hideErrors() {
  const brandError = document.getElementById("brand-error");
  const modelError = document.getElementById("model-error");
  brandError.style.visibility = "hidden";
  modelError.style.visibility = "hidden";
}

initialize();