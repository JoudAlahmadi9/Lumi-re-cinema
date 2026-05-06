document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msgElement = document.getElementById("msg");

    // Connect to the server to verify credentials
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // 1. Store user data in localStorage for the Contact Us page linkage
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('userName', data.user.name);
            
            // 2. Show success message (using your custom modal function)
            if (typeof showLumiereMessage === "function") {
                showLumiereMessage("Login successful 🎉");
            } else {
                msgElement.textContent = "Login successful 🎉";
            }

            // 3. Redirect to the home page after a short delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
            
        } else {
            // Show error message if login fails
            if (typeof showLumiereMessage === "function") {
                showLumiereMessage("Wrong email or password ❌");
            } else {
                msgElement.textContent = "Wrong email or password ❌";
            }
        }
    })
    .catch(err => {
        console.error("Login Error:", err);
        msgElement.textContent = "Server error. Please make sure the server is running.";
    });
});
