// ================= ROUTE GUARD =================

(function () {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const currentPage = window.location.pathname.split("/").pop();

  // Pages
  const authPages = ["login.html", "signup.html"];
  const protectedPages = ["complaint.html", "track.html"];
  const adminPages = ["admin.html"];

  // 🔒 If logged in → block login/signup
  if (token && authPages.includes(currentPage)) {
    window.location.href = "index.html";
  }

  // 🔒 If not logged in → block protected pages
  if (!token && protectedPages.includes(currentPage)) {
    window.location.href = "login.html";
  }

  // 🔒 Admin-only protection
  if (adminPages.includes(currentPage)) {
    if (!token || role !== "admin") {
      window.location.href = "login.html";
    }
  }
})();
