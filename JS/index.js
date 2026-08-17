window.onload = function () {

    const welcome = document.getElementById("welcomeUser");
    const login = document.getElementById("loginLink");
    const register = document.getElementById("registerLink");


    // ================================
    // Check Logged-in User
    // ================================

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/me", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Authentication API failed");
        }

        return response.json();
    })

    .then(data => {

        // User is not logged in
        if (!data.loggedIn) {
            return;
        }


        // Show Welcome Message
        if (welcome) {

            welcome.style.display = "block";

            const name = data.username || data.name || "User";

            welcome.innerHTML =
                "Welcome, " + name + " 👋";
        }


        // Hide Login
        if (login) {
            login.style.display = "none";
        }


        // Change Register to Logout
        if (register) {

            register.innerHTML = "Logout";
            register.href = "#";


            // ================================
            // Logout
            // ================================

            register.onclick = function (event) {

                event.preventDefault();

                fetch(
                    "https://smart-attendance-backend-production-8d08.up.railway.app/auth/logout",
                    {
                        method: "POST",
                        credentials: "include"
                    }
                )

                .then(response => {

                    if (!response.ok) {
                        throw new Error("Logout failed");
                    }

                    return response.json();
                })

                .then(data => {

                    console.log(data.message);

                    // Reload page after logout
                    window.location.reload();

                })

                .catch(error => {

                    console.error(
                        "Logout error:",
                        error
                    );

                });

            };
        }

    })

    .catch(error => {

        console.error(
            "Authentication error:",
            error
        );

    });

};
