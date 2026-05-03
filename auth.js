const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem("cinemaUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";
  });
}
// SIGN IN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // نجيب المستخدم المخزن
    const savedUser = JSON.parse(localStorage.getItem("cinemaUser"));

    // إذا ما فيه حساب
    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    // تحقق من الإيميل والباسورد
    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      window.location.href = "index.html";
    } else {
      alert("Wrong email or password ❌");
    }
  });
}