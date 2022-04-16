//Authentication Form Switch
const formSwitches = document.querySelectorAll(".form-switch p");
const loginForm = document.querySelector(".login-form");
const regForm = document.querySelector(".reg-form");
const switchedClass = "switched";

formSwitches.forEach(
    (c) =>
        (c.onclick = (e) => {
            formSwitches.forEach((c) =>
                c.classList[e.target == c ? "toggle" : "remove"](switchedClass)
            );
            if (e.target.classList[0] === "reg-switch") {
                regForm.style.display = "block";
                loginForm.style.display = "none";
            } else {
                regForm.style.display = "none";
                loginForm.style.display = "block";
            }
        })
);

// AUTHENTICATION PROCESS
//User Registration
const authWindow = document.querySelector(".auth-container");
const regFormBtn = document.querySelector(".reg-form button");
const loginFormBtn = document.querySelector(".login-form button");
const regFormAlert = document.querySelector(".reg-form .msg-alert");
const loginFormAlert = document.querySelector(".login-form .msg-alert");
const fieldEmptyMsg = "Please fill all fields before submitting.";
const regFailedMsg = "Email already exists. Try again.";
const loginFailedMsg = "User details are incorrect. Try again";
const regSuccessMsg = "Registration Successful! You can now proceed to login.";
let allUsers = [];

//Retreiving available users from localStorage
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(allUsers));
} else {
    allUsers = JSON.parse(localStorage.getItem("users"));
}

//The NewUser class
class NewUser {
    constructor(name, email, job, userHandle) {
        this.fullName = name;
        this.userEmail = email;
        this.jobTitle = job;
        this.userHandle = userHandle;
    }
}

//Creating an array of available user emails for login and registration validation
const allUserNames = [];
const allUserEmails = [];
allUsers.forEach((user) => {
    allUserNames.push(user.fullName);
    allUserEmails.push(user.userEmail);
});

function userCreation() {
    //Creating userHandle from the submitted email
    let userHandle = document.querySelector("#reg-email").value.split("@")[0];

    const newUser = new NewUser(
        `${document.querySelector("#reg-fullname").value}`,
        `${document.querySelector("#reg-email").value}`,
        `${document.querySelector("#job").value}`,
        `@${userHandle}`
    );

    //Appending the new user to the list of available users and saving to locaStorage
    allUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allUsers));
    document.querySelector(".auth-loader").style.width = "100%";
    location.reload();
}

function displayRegistrationStatusMessage(color, msg) {
    regFormAlert.textContent = msg;
    regFormAlert.style.color = color;
    regFormAlert.style.display = "block";
    regFormAlert.style.opacity = 1;
}
function displayLoginStatusMessage(color, msg) {
    loginFormAlert.textContent = msg;
    loginFormAlert.style.color = color;
    loginFormAlert.style.display = "block";
    loginFormAlert.style.opacity = 1;
}

regFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        document.querySelector("#reg-fullname").value === "" ||
        document.querySelector("#reg-email").value === "" ||
        document.querySelector("#job").value === ""
    ) {
        displayRegistrationStatusMessage("red", fieldEmptyMsg);
        setTimeout(() => {
            regFormAlert.style.display = "none";
        }, 3000);
    } else if (
        allUserEmails.includes(document.querySelector("#reg-email").value)
    ) {
        displayRegistrationStatusMessage("red", regFailedMsg);
        setTimeout(() => {
            regFormAlert.style.display = "none";
        }, 3000);
    } else {
        userCreation();
        document.querySelectorAll(".reg-form input").forEach((inputField) => {
            inputField.value = "";
        });
        displayRegistrationStatusMessage("green", regSuccessMsg);
        setTimeout(() => {
            regFormAlert.style.display = "none";
        }, 3000);
    }
});

//User Login
loginFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        document.querySelector("#login-fullname").value === "" ||
        document.querySelector("#login-email").value === ""
    ) {
        displayLoginStatusMessage("red", fieldEmptyMsg);
        setTimeout(() => {
            loginFormAlert.style.display = "none";
        }, 3000);
    } else if (
        allUserEmails.includes(document.querySelector("#login-email").value) &&
        allUserNames.includes(
            document.querySelector("#login-fullname").value
        ) &&
        allUserEmails.indexOf(
            document.querySelector("#login-email").value ===
                allUserNames.indexOf(
                    document.querySelector("#login-fullname").value
                )
        )
    ) {
        document.querySelector(".auth-loader").style.width = "100%";
        setTimeout(() => {
            authWindow.style.display = "none";
        }, 3000);
    } else {
        displayLoginStatusMessage("red", loginFailedMsg);
        setTimeout(() => {
            loginFormAlert.style.display = "none";
        }, 3000);
    }
});
