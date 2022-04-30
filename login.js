const form = document.getElementById("login");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"), //username input
pField = form.querySelector(".password"),
pInput = pField.querySelector("input"); //password input
let logOutNav = document.getElementById("logOut");
logOutNav.style.display = "none"; 
let username = eInput.value;
let password = pInput.value;

let allUsers = [];

let url = "users_db.json";

fetch(url)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    allUsers = json;
  });



// form.onsubmit = (event) => {
//   event.preventDefault();
//   let userName = eInput.value;
//   let userPass = pInput.value;
//   ipcRenderer.send('login', userName, userPass);


//}
form.onsubmit = (e) => {
  e.preventDefault();
  const loginDiv = document.getElementById("loginDiv");
  console.log("worrking")
  let username = eInput.value;
  let password = pInput.value;
  lookForUser(username, password);
};

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
        loginDiv.style.display = "none";
        logOutNav.style.display = "inline-block";

      }
      pField.classList.add("error");
      pField.classList.remove("valid");
      console.log('wrong password');
    } else {
      eField.classList.add("error");
      eField.classList.remove("valid");
      console.log('wrong username');
    }
    console.log(i);
    console.log(username);
    console.log(allUsers[i].username);
  }
}

function logOutFunc(){
  
  loginDiv.style.display = "block";
  logOutNav.style.display = "none";
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