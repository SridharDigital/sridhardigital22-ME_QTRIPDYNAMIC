
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  return search.split("=")[1]
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const response  = await fetch(config.backendEndpoint + `/adventures?city=${city}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
  

  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

function createCard(adventure) {
  const {id, name, image, category, costPerHead, duration} = adventure
  const cardEl = document.createElement("div")
    cardEl.classList.add("col-6", 'col-md-4', 'col-lg-3', 'position-relative', "mb-3")
    cardEl.innerHTML = `
      <p class="category-banner shadow-lg">${name}</p>
      <a class="activity-card" href="detail/?adventure=${id}" id=${id}>
          <img src=${image} alt=""/>
          <div class="activity-content">
              <div class="d-flex justify-content-between">
                  <p>${category}</p>
                  <p>₹${costPerHead}</p>
              </div>
              <div class="d-flex justify-content-between">
                  <p>Duration</p>
                  <p>${duration} Hours</p>
              </div>
          </div>
      </a> 
    `
    return cardEl
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
    const parentEl = document.getElementById("data")
    adventures.forEach(adventure => {
      const cardEl = createCard(adventure)
      parentEl.append(cardEl)
    })
    
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  const filteredList = list.filter(item => item.duration >= low && item.duration <= high)
  console.log(filteredList)
  return filteredList

  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  
  if(categoryList.length) {
    const filteredList = list.filter(item => categoryList.includes(item.category))
    return filteredList
  }
  return list
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  const {duration, category} = filters
  console.log(filters)
  if(!duration && category.length) {
    return filterByCategory(list, category)
  } else if (duration && !category.length) {
    const splitDuration = duration.split("-")
    const low = parseInt(splitDuration[0])
    const high = parseInt(splitDuration[1])
    return filterByDuration(list, low, high)
  } else if (duration && category.length) {
    const splitDuration = duration.split("-")
    const low = parseInt(splitDuration[0])
    const high = parseInt(splitDuration[1])
    let filteredList = filterByDuration(list, low, high)
    return filterByCategory(filteredList, category)
  } else {
    return list
  }
  

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  const stringifiedFilters = JSON.stringify(filters)
  localStorage.setItem("filters", stringifiedFilters)
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
  const stringifiedFilters = localStorage.getItem("filters")
  const filters = JSON.parse(stringifiedFilters)
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const {duration, category} = filters
  const categoryListEl = document.getElementById("category-list")
  category.forEach(item => {
    const listEl = document.createElement("p")
    listEl.classList.add("category-filter")
    listEl.innerText = item
    categoryListEl.append(listEl)
  })

  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
