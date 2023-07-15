import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
    const urlParams = new URLSearchParams(search);
    const adventureId = urlParams.get("adventure");
    return adventureId;
  }


  // Place holder for functionality to work in the Stubs
  catch(error){
return null;
  }

}
//Implementation of fetch call with a paramterized input based on adventure ID

    async function fetchAdventureDetails(adventureId) {
      try {
        const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return null;
      }
    }


  // Place holder for functionality to work in the Stubs

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML= adventure.name;
  document.getElementById("adventure-subtitle").innerHTML= adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;

  const photoGalleryElement = document.getElementById("photo-gallery");

  // Clear the photo gallery
  photoGalleryElement.innerHTML = "";
  adventure.images.forEach((image) => {
    const imageElement = document.createElement("div");
    imageElement.className = "activity-card-image";
    imageElement.style.backgroundImage = `url(${image})`;
    photoGalleryElement.appendChild(imageElement);
  });


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  const photoGalleryElement = document.getElementById("photo-gallery");

  // Clear the photo gallery
  photoGalleryElement.innerHTML = "";

  // Create the carousel structure
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel slide";
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  // Loop through the images and create carousel items
  images.forEach((image, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";

    // Set the first item as active
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    // Create the image element
    const imageElement = document.createElement("img");
    imageElement.className = "d-block w-100";
    imageElement.src = image;
    imageElement.alt = "Adventure Image";

    // Append the image to the carousel item
    carouselItem.appendChild(imageElement);

    // Append the carousel item to the carousel inner container
    carouselInner.appendChild(carouselItem);
  });

  // Append the carousel inner container to the carousel container
  carouselContainer.appendChild(carouselInner);

  // Create carousel control buttons
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#photo-gallery");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-control-next";
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#photo-gallery");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  // Append the carousel control buttons to the carousel container
  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);

  // Append the carousel container to the photo gallery element
  photoGalleryElement.appendChild(carouselContainer);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // Get the element representing the reservation panel
  
    // TODO: MODULE_RESERVATIONS
    // 1. If the adventure is already reserved, display the sold-out message.
  
    // Get the element representing the reservation panel
    const reservationPanelSoldOut = document.getElementById('reservation-panel-sold-out');
    const reservationPanelAvailable = document.getElementById('reservation-panel-available');

  
    // Check if the adventure is available
    if (adventure.available) {
      // If available, show the reservation panel and hide the sold-out message
      reservationPanelAvailable.style.display = 'block';
      reservationPanelSoldOut.style.display = 'none';
    } else {
      // If not available, hide the reservation panel and show the sold-out message
      reservationPanelAvailable.style.display = 'none';
      reservationPanelSoldOut.style.display = 'block';
    }
  
    // Set the cost per head value
    const reservationPersonCost = document.getElementById('reservation-person-cost');
    reservationPersonCost.innerHTML = adventure.costPerHead;
  }



//Implementation of reservation cost calculation based on persons
// function calculateReservationCostAndUpdateDOM(adventure, persons) {
//   // TODO: MODULE_RESERVATIONS
//   // 1. Calculate the cost based on number of persons and update the reservation-cost field
//   const Totalcostof = document.getElementById('reservation-cost');
//   const totalCost = adventure.costPerHead * persons;
//   Totalcostof.style.display = totalCost ;
//   // let totalcost = adventure.costPerHead * persons ;



// }
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // Calculate the total cost
  const totalCost = adventure.costPerHead * persons;

  // Get the element representing the reservation cost
  const reservationCost = document.getElementById('reservation-cost');

  // Update the DOM with the total cost
  reservationCost.textContent = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {


  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');

  // Add event listener for form submission
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the form data
    // const formData = new FormData(form);
    // formData.append('adventure', adventure.id);
    let formData = form.elements;

    let bodystring = JSON.stringify({
      name: formData["name"].value,
      date: formData["date"].value,
      person: formData["person"].value,
      adventure: adventure.id,
    });


    try {
      // Make the POST API call using fetch()
      let url = config.backendEndpoint + "/reservations/new";
      //const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
      const response = await fetch(url, {
        method: 'POST',
        body: bodystring,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the reservation is successful
      if (response.ok) {
        // Reservation successful
        alert('Success!');
        location.reload(); // Refresh the page to update the reservation status
      } else {
        // Reservation failed
        alert('Failed!');
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error:', error);
      alert('mb!');
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {

  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }else{
    document.getElementById("reserved-banner").style.display= "none";
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
