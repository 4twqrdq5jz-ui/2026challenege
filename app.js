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
  const yesterday = localStorage.getItem("lastCompletedDay");
  const today = new Date().toDateString();

  if (yesterday === new Date(Date.now() - 86400000).toDateString()) {
    streak++;
  } else {
    streak = 1;
  }

  bestStreak = Math.max(bestStreak, streak);

  localStorage.setItem("streak", streak);
  localStorage.setItem("bestStreak", bestStreak);
  localStorage.setItem("lastCompletedDay", today);

  alert("🔥 Day completed. Streak maintained.");
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
let streak = Number(localStorage.getItem("streak") || 0);
let bestStreak = Number(localStorage.getItem("bestStreak") || 0);

document.getElementById("streak").textContent = streak;
document.getElementById("bestStreak").textContent = bestStreak;
const firebaseConfig = {
  apiKey: "AIzaSyDQwlDjIGA2whvBDhOeLrnseQB4EoP7EcA",
  authDomain: "mainsite-eb919.firebaseapp.com",
  databaseURL: "https://mainsite-eb919-default-rtdb.firebaseio.com",
  projectId: "mainsite-eb919",
  storageBucket: "mainsite-eb919.firebasestorage.app",
  messagingSenderId: "799554641103",
  appId: "1:799554641103:web:f23b774cbb08e03aebebba",
  measurementId: "G-SXQHBNGQBF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const user = await signInAnonymously(auth);
const uid = user.user.uid;

async function saveToCloud(data) {
  await setDoc(doc(db, "users", uid), data);
}

async function loadFromCloud() {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

saveToCloud({
  streak,
  bestStreak,
  completed: todayKey
});

document.getElementById("photoInput").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const week = `week-${new Date().getWeek?.() || Date.now()}`;
  const storageRef = ref(storage, `progress/${uid}/${week}.jpg`);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  document.getElementById("photoGallery").innerHTML += `<img src="${url}">`;
});

const notifModal = document.getElementById("notifModal");
const enableBtn = document.getElementById("enableNotif");
const skipBtn = document.getElementById("skipNotif");

// Only show if notifications not allowed
function checkNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    notifModal.classList.remove("notif-hidden");
  }
}

checkNotificationPermission();

// Enable button
enableBtn.onclick = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    notifModal.classList.add("notif-hidden");
  }
};

// Skip button (hide until next day)
skipBtn.onclick = () => {
  localStorage.setItem("notifSkipped", new Date().toDateString());
  notifModal.classList.add("notif-hidden");
};

// Prevent showing again same day if skipped
const skippedDay = localStorage.getItem("notifSkipped");
if (skippedDay === new Date().toDateString()) {
  notifModal.classList.add("notif-hidden");
}
