console.log("complaint.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("complaintForm");
  const result = document.getElementById("result");

  if (!form) {
    console.error("❌ complaintForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("✅ Submit button clicked");

    const data = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      location: document.getElementById("location").value,
      type: document.getElementById("type").value,
      description: document.getElementById("description").value
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        result.innerHTML = `<span style="color:red;">${resData.message}</span>`;
        return;
      }

      result.innerHTML = `
        <span style="color:green;font-weight:bold;">
          Complaint Registered Successfully!<br>
          Your Complaint ID: <b>${resData.complaintId}</b>
        </span>
      `;

      form.reset();

    } catch (error) {
      console.error("❌ Error:", error);
      result.innerHTML =
        "<span style='color:red;'>Server not reachable</span>";
    }
  });
});
