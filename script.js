// script.js
document.getElementById("loginButton").addEventListener("click", login);

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username && password) {
        // Redirect to the output page with the login result
        var loginResult = " Welcome, " + username + "!";
        window.location.href = `LOGINSUCCESS.html?result=${encodeURIComponent(loginResult)}`;
    } else {
        var loginResultElement = document.getElementById("loginResult");
        loginResultElement.innerHTML = "<p>Please enter both username and password.</p>";
        loginResultElement.style.backgroundColor = "#FF0000";
    }
}

// Check if there's a result parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const loginResult = urlParams.get('result');

// Display the login result if available
if (loginResult) {
    document.getElementById("loginResult").innerHTML = loginResult;
}
