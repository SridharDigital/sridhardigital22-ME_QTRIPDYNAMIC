import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations/`)
    const data = await response.json()
    return data
    
  } catch (error) {
    console.log(error)
    return null
  }


  // Place holder for functionality to work in the Stubs
}

function formatDateTime(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
  
  return `${day} ${month} ${year}, ${strTime}`;
}




//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  const reservationParentEl = document.getElementById("reservation-table-parent")
  const noReservationEl = document.getElementById("no-reservation-banner")
  if(reservations.length === 0) {
    noReservationEl.style.display = "block"
    reservationParentEl.style.display = "none"
  } else {
    reservationParentEl.style.display = "block"
    noReservationEl.style.display = "none"
    reservations.forEach(item => {
      const tableBodyEl = document.getElementById("reservation-table")
      const tableRowEl = document.createElement("tr")
      const date = new Date(item.date) 
      const time = new Date(item.time)
      console.log(formatDateTime(time));
      const option = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      tableRowEl.innerHTML = `
        <td id=${item.id}><a href=/pages/adventures/detail/?adventure=${item.adventure}>${item.id}</a></td>
        <td>${item.name}</td>
        <td>${item.adventureName}</td>
        <td>${item.person}</td>
        <td>${date.toLocaleDateString('en-IN')}</td>
        <td>${item.price}</td>
        <td>${formatDateTime(time)}</td>
        <td><a href="/pages/adventures/detail/?adventure=${item.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
      `
      tableBodyEl.append(tableRowEl)
    })
  }
}

export { fetchReservations, addReservationToTable };
