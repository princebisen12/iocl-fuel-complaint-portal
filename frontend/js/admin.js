// ---- PROTECT ADMIN PAGE ----
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  alert("Access denied. Admin only.");
  window.location.href = "login.html";
}

// ---- LOAD COMPLAINTS ----
async function loadComplaints() {
  const response = await fetch(
    "http://localhost:5000/api/admin/complaints",
    {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );

  if (response.status === 401 || response.status === 403) {
    alert("Session expired. Please login again.");
    logout();
    return;
  }

  const complaints = await response.json();
  const table = document.getElementById("complaintTable");
  table.innerHTML = "";

  complaints.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.complaintId}</td>
      <td>${c.name}</td>
      <td>${c.type}</td>
      <td>${c.location}</td>
      <td>
        <select id="status-${c.complaintId}">
          <option ${c.status === "Submitted" ? "selected" : ""}>Submitted</option>
          <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
        </select>
      </td>
      <td>
        <button onclick="updateStatus('${c.complaintId}')">Update</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// ---- UPDATE STATUS ----
async function updateStatus(id) {
  const newStatus = document.getElementById(`status-${id}`).value;

  await fetch(
    `http://localhost:5000/api/admin/complaints/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ status: newStatus })
    }
  );

  alert("Status updated");
  loadComplaints();
}

// ---- LOGOUT ----
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

loadComplaints();
