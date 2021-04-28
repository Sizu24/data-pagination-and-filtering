/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
   Display profiles on page using array of profiles, and number of pages
   If array contains 0 profiles, then display no result message
   Otherwise loop through array and display maximum 9 profiles per page
*/

const showPage = (list, page)=>{
   const studentList = document.querySelector(".student-list");
   const itemsPerPage = 9;
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   studentList.innerHTML = "";
   let pageContent = "";

   if(list.length === 0){
      const noMatchesMessage = '<p class="no-results">Sorry, there are no matches</p>';
      studentList.innerHTML = noMatchesMessage;
   }else{
      for(let i = 0; i < list.length; i++){
         if(i >= startIndex && i < endIndex){
            pageContent +=
            `
            <li class="student-item cf">
               <div class="student-details">
                  <img src="${list[i].picture.thumbnail}" class="avatar">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
            `;
         }
      }
      studentList.innerHTML = pageContent;
   }
};

/*
   If profiles in array exist, function will create and insert/append the elements needed for the pagination buttons
   Sets number of pages by dividing number of profiles in array by 9, since each page will have 9 profiles
   Add active class to highlight button of page number that is active
   If no profiles exist, no buttons will show
*/

const addPagination = (list)=>{
   let linkList = document.querySelector(".link-list");

   if(list.length < 0){
      linkList.innerHTML = "";
   }else{
      let numOfButtons = Math.ceil(list.length / 9);
      linkList.innerHTML = "";
      let buttons = "";
   
      for(let i = 0; i < numOfButtons; i++){
         buttons += 
            `
               <li>
                  <button class="button">${i + 1}</button>
               </li>
            `;
      }
      linkList.innerHTML = buttons;
   
      // Add active class to first pagination button
      if(list.length > 0){
         const buttonOne = linkList.firstElementChild;
         buttonOne.firstElementChild.classList.add("active");
      }

   
      linkList.addEventListener("click", e =>{
         if(e.target.tagName === "BUTTON"){
            for(let i = 0; i < numOfButtons; i++){
               let buttonList = linkList.children[i];
               let buttonClasses = buttonList.firstElementChild;
               buttonList.firstElementChild.classList.remove("active");
            }
            e.target.classList.add("active");
            let page = parseInt(e.target.textContent);
            showPage(list, page); 
         }
      });
   }
};

/*
   Display searchbar on HTML page
*/
const showSearchBar = ()=>{

   const headerSection = document.querySelector(".header");
   const searchBarCode = 
   `
      <label for="search" class="student-search">
         <span class="student-span">Search Student</span>
         <input id="search" placeholder="Search By Name"></input>
         <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   // Add searchbar to header, before end of header
   headerSection.insertAdjacentHTML("beforeend", searchBarCode);
};
/*
   Function that loops through data array to see if names match user input
   Pushes matched results from data array into "searchResults" array if data doesn't already exist
*/
const searchMatch = (input)=>{
   let searchResults = [];
   for(let i = 0; i < data.length; i++){
      let firstName  = data[i].name.first.toLowerCase();
      let lastName = data[i].name.last.toLowerCase();

      if(firstName.indexOf(input) !== -1 || lastName.indexOf(input) !== -1 || `${firstName} ${lastName}`.indexOf(input) !== -1){
         if(searchResults.indexOf(input) === -1){
            searchResults.push(data[i]);
         }
      }
   }
   return searchResults;
};
/*
   Get user input from search bar on keyup
   Check for match between user input and names from data array
   Display profiles from seach results
   Show the number of pages of search results
   Event listener for search button next to search bar
*/
const searchUser = ()=>{

   const searchBar = document.querySelector("#search");
   let matches = [];

   // Get input in searchbar
   searchBar.addEventListener("keyup", ()=>{
      // find name match for user input from data object
      let userInput = searchBar.value.toLowerCase();
      matches = searchMatch(userInput);
      showPage(matches, 1);
      addPagination(matches);
   });

   // search using button
   const searchButton = document.getElementById("search-button");
   searchButton.addEventListener("click", ()=>{

      let searchBarValue = searchBar.value.toLowerCase();
      searchMatch(searchBarValue);
      addPagination(matches);
   });
};

// Call functions that display items on page

showPage(data, 1);
showSearchBar();
addPagination(data);
searchUser();
