import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((city) => {
      addCityToDOM(city.id, city.city, city.description, city.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const parentEl = document.getElementById("data");
  const cardEl = document.createElement("div");
  // cardEl.setAttribute("id", `${id}`);
  cardEl.classList.add("col-6", "col-md-4", "col-lg-3", "mb-3");
  const HTMLEl = `
      <a href=${`/pages/adventures/?city=${id}`} id=${id}>
        <div class="tile">
          <img
            src=${image}
            alt=${city}
          />
          <div class="tile-text">
            <h3>${city}</h3>
            <p>${description}</p>
          </div>
        </div>
      </a>
  `;
  cardEl.innerHTML = HTMLEl;
  parentEl.append(cardEl);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
}

export { init, fetchCities, addCityToDOM };
