const API = "http://127.0.0.1:5000/complaints"; 
let userLocation = "";

// LOCATION
function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    userLocation =
      pos.coords.latitude + "," + pos.coords.longitude;
    document.getElementById("locationText").innerText =
      "Location captured";
  });
}

// ADD COMPLAINT (🔥 IMPORTANT FIX)
function addComplaint() {
  console.log("Button clicked ✅");

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  if (!title || !description) {
    alert("Please fill all fields");
    return;
  }

  const complaint = {
    title,
    description,
    category,
    location: userLocation || "Not provided",
    status: "Pending"
  };

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(complaint)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Complaint Submitted ✅");
      window.location.href = "index.html";
    })
    .catch(err => {
      console.error(err);
      alert("Error ❌");
    });
}

// LOAD DATA + DASHBOARD
async function loadComplaints() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  let total = data.length;
  let resolved = data.filter(c => c.status === "Resolved").length;
  let pending = data.filter(c => c.status === "Pending").length;

  if (document.getElementById("total")) {
    document.getElementById("total").innerText = total;
    document.getElementById("resolved").innerText = resolved;
    document.getElementById("pending").innerText = pending;
  }

  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "complaint-card";

    div.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <p>Category: ${c.category}</p>
      <p>Location: ${c.location}</p>

      <span class="${c.status === "Pending" ? "pending" : "resolved"}">
        ${c.status}
      </span>

      ${
        c.status === "Pending"
          ? `<button onclick="updateStatus(${c.id})">Resolve</button>`
          : ""
      }
    `;

    list.appendChild(div);
  });
}

// UPDATE STATUS
function updateStatus(id) {
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Resolved" })
  }).then(() => loadComplaints());
}

// AUTO LOAD
loadComplaints();