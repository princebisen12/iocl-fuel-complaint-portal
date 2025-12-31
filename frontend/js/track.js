console.log("track.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trackForm");
  const result = document.getElementById("trackResult");

  if (!form || !result) {
    console.error("Track form or result element missing");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("complaintId").value.trim();

    if (!id) {
      result.innerHTML =
        "<span class='status error'>Please enter Complaint ID</span>";
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/complaints/track/${id}`
      );

      const data = await res.json();

      if (data.message) {
        result.innerHTML =
          `<p class="status error">${data.message}</p>`;
        return;
      }

      // ✅ SHOW REAL STATUS
      result.innerHTML = `
        <div class="glass-card">
          <p><b>Complaint ID:</b> ${data.complaintId}</p>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Location:</b> ${data.location}</p>
          <p><b>Type:</b> ${data.type}</p>
          <p class="status success">
            Status: ${data.status || "Under Review"}
          </p>
        </div>
      `;
    } catch (err) {
      console.error(err);
      result.innerHTML =
        "<p class='status error'>Server not reachable</p>";
    }
  });
});
