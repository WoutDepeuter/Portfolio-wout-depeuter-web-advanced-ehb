let registerBtn = document.getElementById('register');
let loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', registerHandler);
loginBtn.addEventListener('click', loginHandler);

function loginHandler() {
    let storedRegistrationInfo = localStorage.getItem('registrationInfo');
    if (storedRegistrationInfo) {
        let registrationInfo = JSON.parse(storedRegistrationInfo);
        let users = registrationInfo.users || []; 

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let usernameError = document.getElementById('usernameerror');
        let passwordError = document.getElementById('passwoorderror');
        usernameError.innerHTML = "";
        passwordError.innerHTML = "";

        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            console.log("Login gelukt");
            window.location.href = "home.html";
        } else {
            usernameError.innerHTML = "Username or password is incorrect";
        }
    } else {
        console.log("No registration data found");
    }
}


function registerHandler() {
    let storedRegistrationInfo = localStorage.getItem('registrationInfo');
    let users = [];

    if (storedRegistrationInfo) {
        users = JSON.parse(storedRegistrationInfo).users;
    }

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let usernameError = document.getElementById('usernameerror');
    let passwordError = document.getElementById('passwoorderror');
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    let userExists = users.some(user => user.username === username);

    if (userExists) {
        usernameError.innerHTML = "Username bestaat all";
    } else {
        let newUser = {
            username: username,
            password: password
        };
        users.push(newUser);
        localStorage.setItem('registrationInfo', JSON.stringify({ users: users }));
        document.getElementById('msg').innerHTML = "Registration successful";
    }
}
