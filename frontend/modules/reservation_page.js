import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try { 
    // CRIO_SOLUTION_START_MODULE_RESERVATIONS
    const result = await fetch(config.backendEndpoint + `/reservations/`);
    const data = await result.json();
    return data;
  }
    catch (e) {
    return null;
    }


  // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  
  const noReservationBanner = document.getElementById('no-reservation-banner');
  const reservationTableParent = document.getElementById('reservation-table-parent');
  if (reservations.length <= 0) {
    noReservationBanner.style.display = 'block';
    reservationTableParent.style.display = 'none';
  } else {
    noReservationBanner.style.display = 'none';
    reservationTableParent.style.display = 'block';
  }

  // Get the table element from the HTML DOM
  const table = document.getElementById('reservation-table');

  // Clear existing table rows
  table.innerHTML = '';

  // Iterate over reservations and add them to the table
  reservations.forEach(reservation => {
    // Create a new table row
    const row = document.createElement('tr');

    // Add reservation data to table cells
    const idCell = document.createElement('td');
    idCell.textContent = reservation.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = reservation.name;
    row.appendChild(nameCell);

    const adventureCell = document.createElement('td');
    adventureCell.textContent = reservation.adventure;
    row.appendChild(adventureCell);

    const personCell = document.createElement('td');
    personCell.textContent = reservation.person;
    row.appendChild(personCell);

    const dateCell = document.createElement('td');
    const formattedDate = new Date(reservation.date).toLocaleDateString('en-IN');
    dateCell.textContent = formattedDate;
    row.appendChild(dateCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = reservation.price;
    row.appendChild(priceCell);

    const timeCell = document.createElement('td');
    const formattedTime = new Date(reservation.time).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    timeCell.textContent = formattedTime;
    row.appendChild(timeCell);

    const actionCell = document.createElement('td');
    const visitButton = document.createElement('div');
    visitButton.className = 'reservation-visit-button';
    visitButton.id = reservation.id;
    const visitLink = document.createElement('a');
    visitLink.href = `../detail/?adventure=${reservation.adventure}`;
    visitLink.textContent = 'Visit Adventure';
    visitButton.appendChild(visitLink);
    actionCell.appendChild(visitButton);
    row.appendChild(actionCell);

    // Append the row to the table
    table.appendChild(row);
  });


}

export { fetchReservations, addReservationToTable };
