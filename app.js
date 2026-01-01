document.addEventListener("DOMContentLoaded", () => {
  // --- DATA ---
  const DATA = {
  // Body / Workouts
  "Body / Workouts": [
    {
      title: "Morning warm-up",
      details: ["5–7 min: jumping jacks, high knees, hip circles", "🔁 Daily"]
    },
    {
      title: "Core routine",
      details: ["Plank 60s ×3", "Side plank 30s ×3", "Dead bugs 3×20", "Hollow holds 20–30s ×3", "🔁 Daily"]
    },
    {
      title: "Balance drills",
      details: ["Single-leg stand 1–2 min each leg", "Heel-toe walk 2–3 min", "🔁 Daily"]
    },
    {
      title: "Squats",
      details: ["300–500 reps (mix regular, sumo, pulse, split)", "🔁 Mon–Sat"]
    },
    {
      title: "Glute bridges",
      details: ["4×30 reps", "🔁 Mon–Sat"]
    },
    {
      title: "Wall sits",
      details: ["2–3 min", "🔁 Mon–Sat"]
    },
    {
      title: "Lunges",
      details: ["100 total", "🔁 Mon–Sat"]
    },
    {
      title: "Dips (chairs/bench)",
      details: ["3–5×10–20 reps", "🔁 Mon–Fri"]
    },
    {
      title: "Arm curls (weighted items)",
      details: ["3–5×12–20 each arm", "🔁 Mon–Fri"]
    },
    {
      title: "Chest fly (weighted)",
      details: ["3–4×12–15 reps", "🔁 Mon–Fri"]
    },
    {
      title: "Reverse flies / rows / shrugs for shoulders/back",
      details: ["3–5×12–20 reps", "🔁 Mon–Fri"]
    },
    {
      title: "HIIT / Brisk walking / Jogging / Stairs",
      details: ["20–45 min", "🔁 Tue, Thu, Sat (adjust if needed)"]
    },
    {
      title: "Stretching / Flexibility",
      details: [
        "Hip flexor stretch 60s each side",
        "Hamstring stretch 60–90s each leg",
        "Adductor/straddle stretch 60–90s",
        "Half splits hold 30–60s ×2–3",
        "Front splits practice 20–45s ×2–3 each leg",
        "Middle splits prep 60–90s",
        "🔁 Daily"
      ]
    }
  ],

  // Diet / Meals
  "Diet / Meals": [
    { title: "Meal 1", details: ["Protein + carb (eggs, yogurt, oatmeal, toast, fruit)", "🔁 Daily"] },
    { title: "Meal 2", details: ["Protein + carb + veggie (chicken, fish, rice, potato, frozen veggies)", "🔁 Daily"] },
    { title: "Meal 3", details: ["Post-workout protein (protein shake, yogurt, eggs, leftover meat) + optional carb", "🔁 Daily"] },
    { title: "Meal 4", details: ["Dinner protein + light carb or veggies (fish, chicken, potato, vegetables)", "🔁 Daily"] },
    { title: "Optional snack", details: ["Yogurt (2 tbsp max), fruit, peanut butter, protein shake", "🔁 Daily"] },
    { title: "Hydration", details: ["Drink water (64–100 oz daily)", "🔁 Daily"] }
  ],

  // Hair / 4C Buzz Cut Care
  "Hair / 4C Buzz Cut Care": [
    { title: "Scalp massage", details: ["3–5 min (with/without oil)", "🔁 Daily"] },
    { title: "Moisturize & seal", details: ["With water or leave-in + seal with oil", "🔁 Daily"] },
    { title: "Sleep care", details: ["Sleep on satin pillowcase / wear durag", "🔁 Daily"] },
    { title: "Deep cleanse scalp", details: ["Gentle shampoo or co-wash", "🔁 Weekly"] },
    { title: "Protein / strengthening treatment", details: ["Every 3–4 weeks"] },
    { title: "Trim split ends", details: ["If grown 2–3 inches", "🔁 Monthly"] },
    { title: "Adjust products/oils", details: ["If scalp is too dry/oily", "🔁 Monthly"] }
  ],

  // Hygiene / Personal Care
  "Hygiene / Personal Care": [
    { title: "Brush teeth + floss", details: ["2–3 min", "🔁 Daily"] },
    { title: "Mouthwash", details: ["Optional", "🔁 Daily"] },
    { title: "Shower", details: ["With soap & shampoo/conditioner", "🔁 Daily"] },
    { title: "Deodorant / antiperspirant", details: ["🔁 Daily"] },
    { title: "Face wash + moisturizer", details: ["With SPF in morning", "🔁 Daily"] },
    { title: "Comb/brush hair", details: ["Trim facial hair", "🔁 Daily"] },
    { title: "Trim nails & wash hands", details: ["🔁 Daily"] },
    { title: "Deep hair exfoliation", details: ["🔁 Weekly"] },
    { title: "Foot care", details: ["Soak & scrub", "🔁 Weekly"] },
    { title: "Haircut", details: ["🔁 Monthly"] },
    { title: "Facial mask / deep clean", details: ["🔁 Monthly"] },
    { title: "Teeth whitening", details: ["🔁 Monthly"] }
  ],

  // Microwave Yogurt Strategy
  "Microwave-Yogurt Strategy": [
    { title: "Measure yogurt", details: ["2 tbsp Greek yogurt per day", "🔁 Daily"] },
    { title: "Mix yogurt", details: ["Into oatmeal, eggs, fruit, or use as dip/sauce", "🔁 Daily"] }
  ],

  // Daily Reminders / Mindset
  "Daily Reminders / Mindset": [
    { title: "Engage core", details: ["Throughout day", "🔁 Daily"] },
    { title: "Posture check", details: ["Chest up, shoulders back", "🔁 Daily"] },
    { title: "Track weekly progress photos", details: ["Abs, arms, ass, splits", "🔁 Weekly"] },
    { title: "Adjust meals / protein", details: ["Based on activity level", "🔁 Daily"] }
  ]
};

const NOTIF_SCHEDULE = [
  // Workouts
  {
    items: ["Morning warm-up", "Core routine", "Balance drills"],
    hour: 6
  },
  {
    items: ["Squats", "Glute bridges", "Wall sits", "Lunges"],
    hour: 7
  },
  {
    items: ["Dips (chairs/bench)", "Arm curls (weighted items)", "Chest fly (weighted)", "Reverse flies / rows / shrugs for shoulders/back"],
    hour: 8
  },
  {
    items: ["HIIT / Brisk walking / Jogging / Stairs"],
    hour: 9
  },
  {
    items: [
      "Hip flexor stretch 60s each side",
      "Hamstring stretch 60–90s each leg",
      "Adductor/straddle stretch 60–90s",
      "Half splits hold 30–60s ×2–3",
      "Front splits practice 20–45s ×2–3 each leg",
      "Middle splits prep 60–90s"
    ],
    hour: 10
  },

  // Meals
  { items: ["Meal 1: Protein + carb (eggs, yogurt, oatmeal, toast, fruit)"], hour: 7, minute: 30 },
  { items: ["Meal 2: Protein + carb + veggie (chicken, fish, rice, potato, frozen veggies)"], hour: 12, minute: 15 },
  { items: ["Meal 3: Post-workout protein + optional carb"], hour: 14, minute: 0 },
  { items: ["Meal 4: Dinner protein + light carb or veggies (fish, chicken, potato, vegetables)"], hour: 20, minute: 30 }
];


  const todayKey = new Date().toDateString();

  const isPWA =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.body.classList.add("pwa-mode");
}


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
    const id = `${section}-${item.title}`;
    const checked = localStorage.getItem(id) === "true";

    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <label>
        <input type="checkbox" id="${id}" ${checked ? "checked" : ""}>
        ${item.title}
      </label>
      <ul class="details">
        ${item.details.map(d => `<li>${d}</li>`).join("")}
      </ul>
    `;
    sec.appendChild(itemDiv);
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

function scheduleNotifications() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const now = new Date();

  NOTIF_SCHEDULE.forEach(group => {
    group.items.forEach(item => {
      const notifTime = new Date();
      notifTime.setHours(group.hour || 0, group.minute || 0, 0, 0); // hour + optional minute

      // Skip if time already passed
      if (notifTime <= now) return;

      const timeout = notifTime.getTime() - now.getTime();

      setTimeout(() => {
        new Notification("⏰ Reminder", {
          body: item,
          icon: "" // optional: path to icon
        });
      }, timeout);
    });
  });
}

if (Notification.permission === "granted") {
  scheduleNotifications();
}

enableBtn.onclick = () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      notifModal.remove();
      scheduleNotifications();
    }
  });
};

if ("Notification" in window) {
  // existing notification logic
} else {
  console.log("Notifications not supported");
}



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

const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

if (!isStandalone) {
  document.body.classList.add("website-mode");
}
