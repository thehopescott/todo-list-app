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
const regFormBtn = document.querySelector(".reg-form button");
const authFormAlert = document.querySelector(".msg-alert");
const fieldEmptyMsg = "Please fill all fields before submitting.";
const regFailedMsg = "Email already exists. Try again.";
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
}

function displayStatusMessage(color, msg) {
    authFormAlert.textContent = msg;
    authFormAlert.style.color = color;
    authFormAlert.style.display = "block";
    authFormAlert.style.opacity = 1;
}

regFormBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //User information validation/checking for resubmissions/double registrations
    const allUserEmails = [];
    allUsers.forEach((user) => {
        allUserEmails.push(user.userEmail);
    });
    if (
        document.querySelector("#reg-fullname").value === "" ||
        document.querySelector("#reg-email").value === "" ||
        document.querySelector("#job").value === ""
    ) {
        displayStatusMessage("red", fieldEmptyMsg);
        setTimeout(() => {
            authFormAlert.style.display = "none";
        }, 3000);
    } else if (
        allUserEmails.includes(document.querySelector("#reg-email").value)
    ) {
        displayStatusMessage("red", regFailedMsg);
        setTimeout(() => {
            authFormAlert.style.display = "none";
        }, 3000);
    } else {
        userCreation();
        document.querySelectorAll(".reg-form input").forEach((inputField) => {
            inputField.value = "";
        });
        displayStatusMessage("green", regSuccessMsg);
        setTimeout(() => {
            authFormAlert.style.display = "none";
        }, 3000);
    }
});
