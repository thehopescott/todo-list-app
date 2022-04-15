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

class User {
    constructor(fullName, email, todos, jobTitle) {
        this.fullName = fullName;
        this.email = email;
        this.todos = todos;
        this.jobTitle = jobTitle;
    }
}
