
const loginDiv = document.getElementById("loginDiv"); //login Div
const form = document.getElementById("login");
eField = form.querySelector(".email"),
  eInput = eField.querySelector("input"), //username input
  pField = form.querySelector(".password"),
  pInput = pField.querySelector("input"); //password input

let newAccountNav = document.getElementById("createNewAccount");

let content = document.querySelectorAll(".content");
hideContent();



function hideContent() {
  for (let i = 0; i < content.length; i++) {
    content[i].style.visibility = "hidden";
  }
  newAccountNav.style.display = 'inline-block';
};

function unhideContent() {
  for (let i = 0; i < content.length; i++) {
    content[i].style.visibility = "visible";
  }
  newAccountNav.style.display = 'none';
};
//unhide the password when user type it 
function myFunction() {
  let x = pInput;
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

//parsing users_db.json
let allUsers = [];
let url = "users_db.json";

fetch(url)
  .then(response => response.json())
  .then(json => {
    allUsers = json;
  });

let loginSuccess = false;
let username;
let password;

form.onsubmit = (e) => {
  e.preventDefault();
  username = eInput.value;
  password = pInput.value;
  lookForUser(username, password);
  if (loginSuccess === true) {
    loginDiv.style.display = "none";
    unhideContent();

  }
};
//function checks the user input and if the user exists, password and username are right then login is successful
function lookForUser(username, password) {

  for (let i = 0; i < allUsers.length; i++) {

    if (username == allUsers[i].username) {

      console.log(allUsers[i]);
      eField.classList.add("valid");
      eField.classList.remove("error");

      if (password == allUsers[i].password) {

        pField.classList.add("error");
        pField.classList.remove("valid");
        console.log(username, password);

        loginSuccess = true;


      } else {

        pField.classList.add("error");
        pField.classList.remove("valid");
        console.log('wrong password');
      }
    } else {
      eField.classList.add("error");
      eField.classList.remove("valid");
      console.log('wrong username');
    }
    
  }
}

function logOutFunc() {

  loginDiv.style.display = "block";
  hideContent();
  eInput.value = '';
  pInput.value = '';
  eField.classList.remove("error");
  pField.classList.remove("error");
  loginSuccess = false;
  ipcRenderer.send("logOut");

}

// Navbar functions 

function showAllServices() {
  ipcRenderer.send("showAllServices:clicked");
}

function makeNewServices() {
  ipcRenderer.send("makeNewServices:clicked");
}

function showThePriceList() {
  ipcRenderer.send("showThePriceList:clicked");
}

function createNewUser() {
  ipcRenderer.send("createNewUser:clicked");
}
