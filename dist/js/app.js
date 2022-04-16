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
let allTodos = [];

//Retreiving available users and todos from localStorage
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("todos", JSON.stringify(allTodos));
} else {
    allUsers = JSON.parse(localStorage.getItem("users"));
    allTodos = JSON.parse(localStorage.getItem("todos"));
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

// Initial Empty todo list
class NewUserTodoList {
    constructor(handle, myTodoList) {
        this.handle = handle;
        this.myTodoList = myTodoList;
    }
}

//Creating an array of available user emails for login and registration validation
const allUserNames = [];
const allUserEmails = [];
allUsers.forEach((user) => {
    allUserNames.push(user.fullName);
    allUserEmails.push(user.userEmail);
});

// User creation function
let userCreation = () => {
    //Creating userHandle from the submitted email
    let userHandle = document.querySelector("#reg-email").value.split("@")[0];

    const newUser = new NewUser(
        `${document.querySelector("#reg-fullname").value}`,
        `${document.querySelector("#reg-email").value}`,
        `${document.querySelector("#job").value}`,
        `@${userHandle}`
    );

    const newUserTodoList = new NewUserTodoList(`@${userHandle}`, []);

    //Appending the new user and an empty array of todos to the list of available users and saving to locaStorage
    allUsers.push(newUser);
    allTodos.push(newUserTodoList);
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("todos", JSON.stringify(allTodos));
    document.querySelector(".auth-loader").style.width = "100%";
    location.reload();
};

//User Data Query Function for Successfully Loggedin Users
let queryUserData = () => {
    let userHandle = document.querySelector("#login-email").value.split("@")[0];
    let todos;
    let jobtitle;
    allTodos.forEach((userTodos) => {
        if (userTodos.handle === `@${userHandle}`) {
            todos = userTodos.myTodoList;
        }
    });
    allUsers.forEach((user) => {
        if (user.userHandle === `@${userHandle}`) {
            jobtitle = user.jobTitle;
        }
    });

    const loggedUserDetails = {
        fullname: document.querySelector("#login-fullname").value,
        jobTitle: jobtitle,
        handle: `@${userHandle}`,
        myTodos: todos,
    };

    return loggedUserDetails;
};

//Appending  new todo item to the list
let appendTodo = (todoTextContent) => {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("p");
    const todoItemStatus = document.createElement("p");
    todoItem.classList.add("task-item");
    todoText.classList.add("task-text");
    todoItemStatus.classList.add("task-status");
    todoText.textContent = todoTextContent;
    todoItemStatus.innerHTML = `<i class='bi bi-clock-history'></i>`;
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoItemStatus);
    document.querySelector(".all-tasks-list").appendChild(todoItem);
};

//Alert Message for Registration Form
let displayRegistrationStatusMessage = (color, msg) => {
    regFormAlert.textContent = msg;
    regFormAlert.style.color = color;
    regFormAlert.style.display = "block";
    regFormAlert.style.opacity = 1;
};

//Alert Message for Login Form
let displayLoginStatusMessage = (color, msg) => {
    loginFormAlert.textContent = msg;
    loginFormAlert.style.color = color;
    loginFormAlert.style.display = "block";
    loginFormAlert.style.opacity = 1;
};
//Alert Message for New Todo
let newTodoAlertMessage = (color, msg) => {
    document.querySelector(".todo-form .msg-alert").textContent = msg;
    document.querySelector(".todo-form .msg-alert").style.color = color;
    document.querySelector(".todo-form .msg-alert").style.display = "block";
    document.querySelector(".todo-form .msg-alert").style.opacity = 1;
};

//User Registration Process
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

//User Login Process
loginFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        document.querySelector("#login-fullname").value === "" ||
        document.querySelector("#login-email").value === ""
    ) {
        //Alert for Empty Fields Submitted
        displayLoginStatusMessage("red", fieldEmptyMsg);
        setTimeout(() => {
            loginFormAlert.style.display = "none";
        }, 3000);
    } else if (
        //Making sure the submitted details match what's in the localStorage
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
        //All Checks out, proceed to log the user in
        document.querySelector(".auth-loader").style.width = "100%";
        setTimeout(() => {
            authWindow.style.display = "none";
        }, 2100);

        //Query User Data for the Logged in User
        let userData = queryUserData();

        //INSERT USER DATA INTO DOM
        // 1. Profile Data
        setTimeout(() => {
            document.querySelector(".profile-card .user-name").textContent =
                userData.fullname;
            document.querySelector(".profile-card .job-title").textContent =
                userData.jobTitle;
            document.querySelector(".profile-card .user-handle").textContent =
                userData.handle;
        }, 2100);

        // 2. Task List
        userData.myTodos.forEach((todo) => {
            setTimeout(() => {
                appendTodo(todo);
            }, 2100);
        });

        //CREATION OF NEW TASKS
        const newTodoBtn = document.querySelector(".todo-form button");

        newTodoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (document.querySelector("#new-todo").value === "") {
                newTodoAlertMessage("red", fieldEmptyMsg);
                setTimeout(() => {
                    document.querySelector(
                        ".todo-form .msg-alert"
                    ).style.display = "none";
                }, 3000);
            } else {
                const newTodo =
                    document.querySelector("#new-todo").value +
                    ` - ${document.querySelector("#new-todo-desc").value}`;
                appendTodo(newTodo);

                document.querySelectorAll(".todo-form input").forEach((i) => {
                    i.value = "";
                });
                //Add the current tasks list to localStorage
                let userCurrentTodos = [];
                document
                    .querySelectorAll(".all-tasks-list li")
                    .forEach((item) => {
                        userCurrentTodos.push(item.textContent);
                    });
                console.log(userCurrentTodos);

                allTodos.forEach((u) => {
                    if (u.handle === userData.handle) {
                        u.myTodoList = userCurrentTodos;
                    }
                });
                localStorage.setItem("todos", JSON.stringify(allTodos));

                newTodoAlertMessage("green", "Task added successfully.");
                setTimeout(() => {
                    document.querySelector(
                        ".todo-form .msg-alert"
                    ).style.display = "none";
                }, 3000);
            }
        });
    } else {
        //Alert for Incorrect User Details
        displayLoginStatusMessage("red", loginFailedMsg);
        setTimeout(() => {
            loginFormAlert.style.display = "none";
        }, 3000);
    }
});
