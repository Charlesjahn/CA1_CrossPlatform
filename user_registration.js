const { ipcRenderer } = require('electron');
/*storing the variables */
let registrationForm = document.getElementById("registrationForm");
let usernameField = document.querySelector(".username");
let username = document.getElementById("username");
let firstnameField = document.querySelector(".firstname");
let firstname = document.getElementById("firstname");
let surnameField = document.querySelector(".surname");
let surname = document.getElementById("surname");

let passInput = document.getElementById("pass");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let speChar = document.getElementById("speChar");
let passLength = document.getElementById("passLength");
let formInput = document.querySelectorAll(".registrationInput");

let firstnameValid = false;
let surnameValid = false;
let usernameValid = false;
let passwordValid = false;

function checkNames(anyName) { //check Name function
    if (anyName.value == "" && anyName.value == "/[0-9]/g" ) { //if name is empty then add error and remove valid class
        anyName.classList.add("error");
        anyName.classList.remove("valid");
        return false;

    } else { //if name is empty then remove error and add valid class
        anyName.classList.remove("error");
        anyName.classList.add("valid");
        return true;
    }
}


function checkUsername() { //checkUsername function
    let pattern = /[a-zA-Z][a-zA-Z0-9]{6,31}/; //pattern for validate username
    if (!username.value.match(pattern)) { //if pattern not matched then add error and remove valid class
        usernameField.classList.add("error");
        usernameField.classList.remove("valid");
        let errorTxt = usernameField.querySelector(".error-txt");
        return false;
        //if username value is not empty then show please enter valid username else show username can't be blank
       // (username.value != "") ? errorTxt.innerText = "Enter a valid username address" : errorTxt.innerText = "Username can't be blank";
    } else { //if pattern matched then remove error and add valid class
        usernameField.classList.remove("error");
        usernameField.classList.add("valid");
        return true;
    }
};

username.onkeyup = () => { checkUsername(); } //calling checkUsername function on username input keyup

/*will show the password requirments or block them */
passInput.onfocus = function () {
    document.getElementById("checksField").style.display = "block";
};
passInput.onblur = function () {
    document.getElementById("checksField").style.display = "none";
};
/*will show if the user input matches  with the password requirments */
passInput.onkeyup = function () {
    const lowerCaseLetters = /[a-z]/g;
    if (passInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("wrong");
        letter.classList.add("correct");
    } else {
        letter.classList.remove("correct");
        letter.classList.add("wrong");
    }
    const upperCaseLetters = /[A-Z]/g;
    if (passInput.value.match(upperCaseLetters)) {
        capital.classList.remove("wrong");
        capital.classList.add("correct");
    } else {
        capital.classList.remove("correct");
        capital.classList.add("wrong");
    }
    const numbers = /[0-9]/g;
    if (passInput.value.match(numbers)) {
        number.classList.remove("wrong");
        number.classList.add("correct");
    } else {
        number.classList.remove("correct");
        number.classList.add("wrong");
    }
    const specialChars = /[^A-z\s\d][\\\^]?/g;
    if (passInput.value.match(specialChars)) {
        speChar.classList.remove("wrong");
        speChar.classList.add("correct");
    } else {
        speChar.classList.remove("correct");
        speChar.classList.add("wrong");
    }
    const validLength = 8;
    if (passInput.value.length >= 8) {
        passLength.classList.remove("wrong");
        passLength.classList.add("correct");
    } else {
        passLength.classList.remove("correct");
        passLength.classList.add("wrong");
    }

};

function checkPass() { //checkPass function
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passInput.value == "" && passInput.value.match(pattern)) { //if pass is not empty and mathcing the pattern then return true;
     //   alert("pass +")
        return true;
    } else { //otherwise return false
        return false;
    }
};

//shows user's input in password field
function myFunction() {
    let x = passInput;
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
};


function checkRegForm() {

    // let firstnameValid = checkNames(firstname.value);
    // console.log(firstnameValid);
    // let surnameValid = checkNames(surname.value);
    let usernameValid = checkUsername();
    let passwordValid = checkPass();
   // if (firstnameValid && surnameValid && usernameValid && passwordValid === true) {
    if (usernameValid && passwordValid === true) {
        const newUser = {
            "firstname": `${firstname.value}`,
            "surname": `${surname.value}`,
            "username": `${username.value}`,
            "password": `${passInput.value}`
        };
        alert('Registration successful! App will be restarted');
        console.log("sending newUser");
        ipcRenderer.send("registration:successful", newUser);
        window.close();
    }
    else{
        alert("Registration failed, try again!");
    }
}

registrationForm.onsubmit = (e) => {
    checkRegForm();
    // const newUser = {
    //     "firstname": `${firstname.value}`,
    //     "surname": `${surname.value}`,
    //     "username": `${username.value}`,
    //     "password": `${passInput.value}`
    // };
    // alert('Registration successful');
    // console.log("sending newUser");
    // ipcRenderer.send("registration:successful", newUser);
    // window.close();
};
