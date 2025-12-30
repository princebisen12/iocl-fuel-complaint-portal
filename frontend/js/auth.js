document.addEventListener("DOMContentLoaded", () => {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  if (!token) {
    authArea.innerHTML = `<a href="login.html" class="btn">Login</a>`;
    return;
  }

  if (role === "admin") {
    authArea.innerHTML = `
      <a href="admin.html" class="btn">Dashboard</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    authArea.innerHTML = `
      <span class="user-name">Hi, ${name ? name : "User"}</span>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
