function storePassword() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hash the password using SHA-256
    sha256(password).then(hashedPassword => {
        const user = { username, password: hashedPassword };
        if(username!=""&& password!=""){
            localStorage.setItem(username, JSON.stringify(user));
            alert("Password stored in local storage.");
        }
        else{
            alert("Please provide the username and password");
        }
    });
    document.getElementById("username").value="";
    document.getElementById("password").value="";

}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve the user from local storage
    const userString = localStorage.getItem(username);

    if (userString) {
        const user = JSON.parse(userString);

        // Hash the entered password and compare
        sha256(password).then(enteredHashedPassword => {
            if (enteredHashedPassword === user.password) {
                alert("Login successful");
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("username", username);
                window.location.href = 'index.html';
            } else {
                alert("Incorrect password");
            }
        });
    } else {
        alert("User not found");
    }
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    
}

// Simulated SHA-256 hashing function (for demonstration purposes only)
function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return crypto.subtle.digest("SHA-256", data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}
