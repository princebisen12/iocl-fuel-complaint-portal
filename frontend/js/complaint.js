document.getElementById("complaintForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    location: document.getElementById("location").value,
    type: document.getElementById("type").value,
    description: document.getElementById("description").value
  };

  const response = await fetch("http://localhost:5000/api/complaints/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  document.getElementById("result").innerHTML =
    `Complaint Registered.<br>Complaint ID: <b>${result.complaintId}</b>`;
});
