console.log("signup.js loaded");

async function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !email || !password) {
    msg.innerText = "All fields are required";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Signup failed";
      msg.style.color = "red";
      return;
    }

    msg.innerText = "Signup successful! Redirecting to login...";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    console.error(error);
    msg.innerText = "Server not reachable";
    msg.style.color = "red";
  }
}
