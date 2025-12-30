// TEST IF JS IS LOADING
console.log("login.js loaded");

async function login() {
  console.log("Login button clicked");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailInput || !passwordInput) {
    alert("Input fields not found");
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    msg.innerText = "Please enter email and password";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("Server response:", data);

    if (!res.ok) {
      msg.innerText = data.message || "Login failed";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);

    window.location.href = "index.html";

  } catch (error) {
    console.error("Login error:", error);
    msg.innerText = "Server not reachable";
  }
}
