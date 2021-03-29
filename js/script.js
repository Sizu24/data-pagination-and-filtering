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
   Select student list ul
   Find the number of students in data list, and divide them into pages of maximum 9 students
   Add student info for every 9 students per page into page content
   Put page content into HTML
*/

const searchUser = ()=>{
   const searchBar = 
   `
      <label>
         <input type="search" id="search" placeholder="Search By Name"></input>
         <button></button>
      </label>
   `
}

const showPage = (list, page)=>{

   const studentList = document.querySelector(".student-list");
   const itemsPerPage = 9;
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   studentList.innerHTML = "";
   let pageContent = "";

   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         pageContent +=
         `
         <li class="studen-item cf">
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list)=>{

   let numOfButtons = Math.ceil(list.length / 9);
   let linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   let buttons = "";

   for(i = 0; i < numOfButtons; i++){
      buttons += 
         `
            <li>
               <button class="button">${i + 1}</button>
            </li>
         `
   }
   linkList.innerHTML = buttons;

   // Add active class to first pagination button
   const buttonOne = linkList.firstElementChild;
   buttonOne.firstElementChild.classList.add("active");

   linkList.addEventListener("click", e =>{
      if(e.target.tagName === "BUTTON"){
         for(let i = 0; i < numOfButtons; i++){
            let buttonList = linkList.children[i];
            let buttonClasses = buttonList.children[0];
            buttonClasses.classList.remove("active");
         }
         e.target.classList.add("active");
         let page = parseInt(e.target.textContent);
         showPage(data, page);
      }
   });
}

// Call functions

showPage(data, 1);
addPagination(data);
