const DATA = {
  "Body / Workouts": [
    "Morning warm-up",
    "Core routine",
    "Balance drills",
    "Lower body workout",
    "Upper body workout",
    "Cardio",
    "Stretching"
  ],
  "Diet / Hydration": [
    "Meal 1",
    "Meal 2",
    "Meal 3",
    "Meal 4",
    "Optional snack",
    "64–100 oz water"
  ],
  "Hair / 4C Care": [
    "Scalp massage",
    "Moisturize + seal",
    "Satin/durag"
  ],
  "Hygiene": [
    "Brush & floss",
    "Shower",
    "Deodorant",
    "Face care",
    "Hands & nails"
  ],
  "Mindset": [
    "Posture check",
    "Engage core",
    "Daily focus check-in"
  ]
};

const checklist = document.getElementById("checklist");
const todayKey = new Date().toDateString();

// Reset daily
if (localStorage.getItem("lastDay") !== todayKey) {
  localStorage.clear();
  localStorage.setItem("lastDay", todayKey);
}

// Render checklist
Object.entries(DATA).forEach(([section, items]) => {
  const sec = document.createElement("section");
  sec.innerHTML = `<h2>${section}</h2>`;
  
  items.forEach(item => {
    const id = `${section}-${item}`;
    const checked = localStorage.getItem(id) === "true";
    sec.innerHTML += `
      <label>
        <input type="checkbox" id="${id}" ${checked ? "checked" : ""}>
        ${item}
      </label>
    `;
  });

  checklist.appendChild(sec);
});

// Save progress
document.getElementById("saveDay").onclick = () => {
  let allChecked = true;

  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    localStorage.setItem(cb.id, cb.checked);
    if (!cb.checked) allChecked = false;
  });

  if (!allChecked) {
    alert("⚠️ You haven’t completed everything today.");
    return;
  }

  alert("🔥 Day completed. Discipline respected.");
};

// Notifications
if ("Notification" in window) {
  Notification.requestPermission();
}

setInterval(() => {
  const unchecked = [...document.querySelectorAll("input")].some(cb => !cb.checked);
  if (unchecked && Notification.permission === "granted") {
    new Notification("New Year / New Me", {
      body: "You haven’t completed today’s check-in.",
      icon: "icon.png"
    });
  }
}, 1000 * 60 * 60); // hourly reminder
