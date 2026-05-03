document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "nada@gmail.com" && password === "1234"){
    document.getElementById("msg").textContent = "Login successful 🎉";
    window.location.href = "index.html"; // يرجع للصفحة الرئيسية
  } else {
    document.getElementById("msg").textContent = "Wrong email or password ❌";
  }
});