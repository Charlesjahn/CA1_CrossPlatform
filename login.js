
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
    console.log(json);
    allUsers = json;
  });

let loginSuccess = false;
let username;
let password;

form.onsubmit = (e) => {
  e.preventDefault();
  username = eInput.value;
  password = pInput.value;
  console.log("worrking");
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
    console.log(i);
    console.log(username);
    console.log(allUsers[i].username);
  }
  //loginSuccess = false;
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

// function Authorization() {
//   let user = allUsers[0];
//   console.log(allUsers[0]);
//   if (username === user["username"]) {
//     console.log("working");
//     if (password === user['password']) {
//       console.log("u successfully logged in : " + user["username"]);
//       const loginDiv = document.getElementById("loginDiv");
//       loginDiv.style.visibility = "hidden";
//     }
//     else {
//       console.log("wrong password");
//     }
//   } else {
//     console.log(user["username"]);
//     console.log("not working! wrong username!")
//   }
// }

// form.onsubmit = (e) => {
//   e.preventDefault(); //preventing from form submitting
//   //if email and password is blank then add shake class in it else call specified function
//   (eInput.value == "") ? eField.classList.add("shake", "error") : checkUsername();
//   (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
//   setTimeout(() => { //remove shake class after 500ms
//     eField.classList.remove("shake");
//     pField.classList.remove("shake");
//   }, 500);
//   eInput.onkeyup = () => { checkUsername(); } //calling checkEmail function on email input keyup
//   pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

//   function checkUsername() { //checkUsername function
//     let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate username
//     if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
//       eField.classList.add("error");
//       eField.classList.remove("valid");
//       let errorTxt = eField.querySelector(".error-txt");
//       //if email value is not empty then show please enter valid email else show Email can't be blank
//       (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
//     } else { //if pattern matched then remove error and add valid class
//       eField.classList.remove("error");
//       eField.classList.add("valid");
//     }
//   }
//   function checkPass() { //checkPass function
//     if (pInput.value == "") { //if pass is empty then add error and remove valid class
//       pField.classList.add("error");
//       pField.classList.remove("valid");
//     } else { //if pass is empty then remove error and add valid class
//       pField.classList.remove("error");
//       pField.classList.add("valid");
//     }
//   }
//   //if eField and pField doesn't contains error class that mean user filled details properly
//   if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
//     // window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
//     Authorization();
//   }
// } 