document.addEventListener("DOMContentLoaded", () => {
  // --- DATA ---
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

  const todayKey = new Date().toDateString();

  // --- DAILY RESET ---
  if (localStorage.getItem("lastDay") !== todayKey) {
    localStorage.setItem("lastDay", todayKey);
    localStorage.setItem("completedToday", "false");
    // Uncheck all checkboxes (done after render)
  }

  // --- STREAK ---
  let streak = Number(localStorage.getItem("streak") || 0);
  let bestStreak = Number(localStorage.getItem("bestStreak") || 0);
  document.getElementById("streak").textContent = streak;
  document.getElementById("bestStreak").textContent = bestStreak;

  // --- RENDER CHECKLIST ---
  const checklist = document.getElementById("checklist");
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

  // --- CHECKBOX SAVE ---
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      localStorage.setItem(cb.id, cb.checked);
    });
  });

  // --- COMPLETE DAY BUTTON ---
  document.getElementById("saveDay").onclick = () => {
    const allChecked = [...document.querySelectorAll("input[type=checkbox]")].every(cb => cb.checked);
    if (!allChecked) return alert("⚠️ You haven’t completed everything today.");

    const yesterday = localStorage.getItem("lastCompletedDay");
    if (yesterday === new Date(Date.now() - 86400000).toDateString()) streak++;
    else streak = 1;

    bestStreak = Math.max(bestStreak, streak);
    localStorage.setItem("streak", streak);
    localStorage.setItem("bestStreak", bestStreak);
    localStorage.setItem("lastCompletedDay", todayKey);
    localStorage.setItem("completedToday", "true");

    document.getElementById("streak").textContent = streak;
    document.getElementById("bestStreak").textContent = bestStreak;

    alert("🔥 Day completed! Streak maintained.");
  };

  // --- NOTIFICATION MODAL ---
  const notifModal = document.getElementById("notifModal");
const enableBtn = document.getElementById("enableNotif");
const skipBtn = document.getElementById("skipNotif");

// Show modal only if notifications not granted and not skipped today
function checkNotificationPermission() {
  if (!("Notification" in window)) return;

  const skippedDay = localStorage.getItem("notifSkipped");

  if (Notification.permission === "granted") {
    // Notifications already allowed — remove modal permanently
    notifModal.remove();
    return;
  }

  // Only show if not skipped today
  if (Notification.permission === "default" && skippedDay !== todayKey) {
    notifModal.classList.remove("notif-hidden");

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (!localStorage.getItem("notifSkipped")) {
        notifModal.remove();
      }
    }, 10000);
  }
}

checkNotificationPermission();

// Enable notifications
enableBtn.onclick = () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      // Remove modal permanently
      notifModal.remove();
    }
  });
};

// Skip for today
skipBtn.onclick = () => {
  // Save skip for today
  localStorage.setItem("notifSkipped", todayKey);
  // Remove modal immediately
  notifModal.remove();
};

  // --- WEEKLY PHOTO UPLOAD ---
  const photoInput = document.getElementById("photoInput");
  const photoGallery = document.getElementById("photoGallery");
  const photos = JSON.parse(localStorage.getItem("photos") || "[]");

  photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    photoGallery.appendChild(img);
  });

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      photos.push(src);
      localStorage.setItem("photos", JSON.stringify(photos));

      const img = document.createElement("img");
      img.src = src;
      photoGallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});
