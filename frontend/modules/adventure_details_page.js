import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  return (search.split("=")[1])
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null;
  }


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // console.log(adventure)
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {id, name, subtitle, images, content} = adventure
  const adventureNameEl = document.getElementById("adventure-name")
  const adventureSubTitleEl = document.getElementById("adventure-subtitle")
  const adventurePhotoGalleryEl = document.getElementById("photo-gallery")
  const adventureContentEl = document.getElementById("adventure-content")

  adventureNameEl.innerHTML = name
  adventureSubTitleEl.innerHTML = subtitle
  images.forEach(image => {
    const imageEl = document.createElement("div")
    imageEl.innerHTML = `
      <img src=${image} alt="image" class="activity-card-image"/>
    `
    adventurePhotoGalleryEl.append(imageEl)
  })
  adventureContentEl.innerText = content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const adventurePhotoGalleryEl = document.getElementById("photo-gallery")
  adventurePhotoGalleryEl.innerHTML =""

  const bootstrapGalleryEl = document.createElement("div")
  bootstrapGalleryEl.id = "bootstrapGallery"
  bootstrapGalleryEl.classList.add("carousel", "slide")
  bootstrapGalleryEl.setAttribute("data-bs-ride", "carousel")

  const carouselInnerEl = document.createElement("div")
  carouselInnerEl.classList.add("carousel-inner")

  const carouselIndicatorParentEl = document.createElement("div")
  carouselIndicatorParentEl.classList.add("carousel-indicators")
  
  images.forEach((image, index) => {
    const imageEl = document.createElement("div")
    imageEl.classList.add('carousel-item')
    imageEl.innerHTML = `
      <img src=${image} alt="image" class="d-block w-100 activity-card-image"/>
    `
    carouselInnerEl.append(imageEl)

    const indicatorEl = document.createElement("div")
    indicatorEl.innerHTML = `
    <button type="button" data-bs-target="#bootstrapGallery" data-bs-slide-to=${index} aria-label="Slide ${index + 1}"></button>

    `
    carouselIndicatorParentEl.append(indicatorEl)
  })
  bootstrapGalleryEl.append(carouselInnerEl)
  adventurePhotoGalleryEl.append(bootstrapGalleryEl)

  const firstItem = document.getElementsByClassName("carousel-item")[0]
  firstItem.classList.add("active")

  const NavigationBtnEls = `
    <button class="carousel-control-prev" type="button" data-bs-target="#bootstrapGallery" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#bootstrapGallery" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `

  
  const firstIndicator = carouselIndicatorParentEl.firstElementChild.firstElementChild
  firstIndicator.setAttribute("aria-current", "true")
  firstIndicator.setAttribute("class", "active")
  bootstrapGalleryEl.innerHTML = bootstrapGalleryEl.innerHTML + NavigationBtnEls
  bootstrapGalleryEl.append(carouselIndicatorParentEl)

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  console.log(adventure)
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanelEl = document.getElementById("reservation-panel-sold-out")
  const availablePanelEl = document.getElementById("reservation-panel-available")
  const reservationCostEl = document.getElementById("reservation-person-cost")
  if(adventure.available) {
    availablePanelEl.style.display = "block"
    soldOutPanelEl.style.display = "none"
    reservationCostEl.innerHTML = adventure.costPerHead
  } else {
    availablePanelEl.style.display = "none"
    soldOutPanelEl.style.display = "block"
    
  }
  
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const totalCost = adventure.costPerHead * persons
  const totalCostEl = document.getElementById("reservation-cost")
  totalCostEl.innerHTML = totalCost
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

async function submitForm(data) {
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations/new`, options)
    const data = await response.json()
    alert("Success!")
  } catch (error) {
    console.log(error)
    alert("Failed!")
  }
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let data = {name: "", person: "", date: "", adventure: adventure.id};
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations/new`, options)
    const data = await response.json()
  } catch (error) {
    console.log(error)
  }
  const myForm = document.getElementById("myForm")
  
  myForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const name = event.target["name"]?.value
    const date = event.target["date"]?.value
    const person = event.target["person"]?.value
    data = {name, date, person, adventure: adventure.id}
    submitForm(data)
    location.reload()
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBannerEl = document.getElementById("reserved-banner")
  if(adventure.reserved) {
  reservedBannerEl.style.display = "block"
  } else {
    reservedBannerEl.style.display = "none"
  }
  

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
