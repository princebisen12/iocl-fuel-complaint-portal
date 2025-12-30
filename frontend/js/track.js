document.getElementById("trackBtn").addEventListener("click", trackComplaint);

async function trackComplaint() {
  const complaintId = document.getElementById("complaintId").value.trim();
  const statusEl = document.getElementById("status");

  if (!complaintId) {
    statusEl.style.color = "red";
    statusEl.innerText = "Please enter Complaint ID";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/complaints/track/${complaintId}`
    );

    const data = await response.json();

    console.log("Tracker response:", data); // 👈 DEBUG

    if (data.message) {
      statusEl.style.color = "red";
      statusEl.innerText = data.message;
    } else {
      statusEl.style.color = "green";
      statusEl.innerHTML = `
        <strong>Complaint Details</strong><br><br>
        <b>Complaint ID:</b> ${data.complaintId}<br>
        <b>Status:</b> ${data.status}<br>
        <b>Type:</b> ${data.type}<br>
        <b>Location:</b> ${data.location}<br>
        <b>Email:</b> ${data.email}
      `;
    }
  } catch (err) {
    statusEl.style.color = "red";
    statusEl.innerText = "Error connecting to server";
  }
}
