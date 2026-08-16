window.onload = function () {

    const welcome = document.getElementById("welcomeUser");
    const login = document.getElementById("loginLink");
    const register = document.getElementById("registerLink");

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/me", {
        method: "GET",
        credentials: "include"
    })

    .then(response => response.json())

    .then(data => {

        if (!data.loggedIn) {
            return;
        }

        welcome.style.display = "block";

        let name = data.username || data.name;

        welcome.innerHTML = "Welcome, " + name + " 👋";

        login.style.display = "none";

        register.innerHTML = "Logout";
        register.href = "#";

        register.onclick = function () {

            fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/logout", {

                method: "POST",
                credentials: "include"

            })
            .then(() => {

                location.reload();

            });

        };

    })

    .catch(error => {

        console.error("Authentication error:", error);

    });

};
