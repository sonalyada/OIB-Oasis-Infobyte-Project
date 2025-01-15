document.getElementById("show-register").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .catch((err) => console.error(err));
});

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                document.getElementById("auth-section").style.display = "none";
                document.getElementById("secured-page").style.display = "block";
            } else {
                alert(data.message);
            }
        })
        .catch((err) => console.error(err));
});

document.getElementById("logout-button").addEventListener("click", () => {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("secured-page").style.display = "none";
});
