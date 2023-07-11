
import config from "../conf/index.js";

//Implementation to extract city from query params
async function getCityFromURL(search) {

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try{
 const urlpars = new URLSearchParams(search);
 const city = urlpars.get("city");
 return city;
  }
  catch(error)
  {
    return null;
  }

  

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data4
  try{
    let responce = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    //config.backendEndpoint+`/adventures?city=${city}`
    let data = await responce.json();
  
    return data;
    }catch(error){
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  //
  adventures.forEach(({ id, category, image, name, costPerHead, duration }) => {
  let element = document.createElement("div");
  element.className = "col-6 col-lg-3 mb-4"
  element.innerHTML =
  `<a href="detail/?adventure=${id}" id=${id}>
  <div class="activity-card">
  <div class="category-banner">${category}</div>
  <img
  class="img-responsive"
  src=${image}
   />
   
<div class="activity-card-text text-md-center w-100 mt-3 px-2">
<div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
<h5 class="text-left">${name}</h5>
<p>${costPerHead}</p>
</div>
<div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
<h5 class="text-left">Duration</h5>
<p>${duration} Hours</p>
</div>
</div>
</div>
</a> 
`;
document.getElementById("data").appendChild(element);

});
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter((adventure)=> {
    if(adventure.duration > low && adventure.duration <=high){
      return adventure;
    }
  })
  return filteredList;
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(adventure => categoryList.includes(adventure.category));

  // Return the filtered list
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const duration = filters["duration"];

  const low = duration.split("-")[0]
  const high = duration.split("-")[1]

  const filteredListByDuration = filterByDuration(list, low, high);
  
  const filteredListByCategory = filterByCategory(list, filters['category'])

  // Return the appropriate filtered list based on the filters applied
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    return filteredListByDuration.filter(adventure => filteredListByCategory.includes(adventure));
  } else if (filters["duration"].length > 0) {
    return filteredListByDuration;
  } else if (filters["category"].length > 0) {
    return filteredListByCategory;
  } else {
    return list; // Return the original list if no filters applied
  }
}


// function filterFunction(list, filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
//   // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
//   const duration = filters["duration"];

//   const low = duration.split("-")[0]
//   const high = duration.split("-")[1]

//   const filteredListByduration = filterByDuration(list, low, high);
  

//   const filteredListByCategory = filterByCategory(list, filters ['category'])

//   return filteredList;



  // if(filters["duration"].length> 0 && filters["category"].length> 0)
  // {
  //   filteredList = filterByDuration()
  //   filteredList = filterByCategory()

  // }else if(filters["duration"].length> 0){
  //   filteredList = filterByDuration()
  // }else if(filters["category"].length> 0){
  //   filteredList = filterByCategory()
  // }else{

  // }


  // // Place holder for functionality to work in the Stubs
  // return list;


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to  localStorage
  
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categories = filters ['category'];
  console.log(categories)
  categories.forEach((key)=> {
  let el = document.createElement("div");
  el.className = "category-filter";
  el.innerHTML = `<div>${key}</div>`
  document.getElementById('category-list').appendChild()

})

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
