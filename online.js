const classes = [
  { title: "Butter Chicken Masterclass", chef: "Chef Priya Sharma", duration: "1.5 hrs", rating: 4.8, reviews: 324, price: 999, image: "Online class clips/butter-chicken.jpg", tint: ["#c8501a", "#6b240f"], video: "Online class clips/butter-chicken.mp4", quality: "1440p", credit: "Demo footage: Pexels" },
  { title: "South Indian Specialties", chef: "Chef Aravind", duration: "2 hrs", rating: 4.9, reviews: 210, price: 1199, image: "Online class clips/south-indian.jpg", tint: ["#d9a441", "#7a4a12"], video: "Online class clips/south-indian.mp4", quality: "1080p", credit: "Demo footage: Pexels" },
  { title: "Biryani Like a Pro", chef: "Chef Rehan", duration: "2 hrs", rating: 4.8, reviews: 187, price: 1299, image: "Online class clips/biryani.jpg", tint: ["#e0b24f", "#8a5a14"], video: "Online class clips/biryani.mp4", quality: "1080p", credit: "Demo footage: Pexels" },
  { title: "Indian Desserts", chef: "Chef Neha", duration: "1.5 hrs", rating: 4.7, reviews: 156, price: 999, image: "Online class clips/desserts.jpg", tint: ["#b3402a", "#4e1a10"], video: "Online class clips/indian-desserts.mp4", quality: "1080p", credit: "Demo footage: Pexels" }
];

const grid = document.getElementById("classGrid");
const emptyMsg = document.getElementById("emptyMsg");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const recordedAccess = document.getElementById("recordedAccess");
const recordingsDialog = document.getElementById("recordingsDialog");
const recordingList = document.getElementById("recordingList");
const recordingVideo = document.getElementById("recordingVideo");
const recordingName = document.getElementById("recordingName");
const recordingCredit = document.getElementById("recordingCredit");
const recordingQuality = document.getElementById("recordingQuality");
const recordingSource = document.getElementById("recordingSource");
const recordingError = document.getElementById("recordingError");
const closeRecordings = document.getElementById("closeRecordings");
const enrolledClasses = new Set();
const liveInteractive = document.getElementById("liveInteractive");
const liveQuestionDialog = document.getElementById("liveQuestionDialog");
const liveQuestionForm = document.getElementById("liveQuestionForm");
const liveQuestion = document.getElementById("liveQuestion");
const closeLiveQuestion = document.getElementById("closeLiveQuestion");
const certificateAccess = document.getElementById("certificateAccess");
const certificateDialog = document.getElementById("certificateDialog");
const closeCertificate = document.getElementById("closeCertificate");

const formatPrice = n => "₹" + n.toLocaleString("en-IN");

function renderClasses(list) {
  grid.innerHTML = list.map(c => `
    <article class="class-card recipe-card">
      <div class="card-img" style="background: linear-gradient(135deg, ${c.tint[0]}, ${c.tint[1]})">
        <img src="${c.image}" alt="${c.title}" loading="lazy" onerror="this.remove()">
      </div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <p class="chef">${c.chef}</p>
        <div class="meta">
          <span>🕒 ${c.duration}</span>
          <span class="rating"><span class="star">★</span> ${c.rating} (${c.reviews})</span>
        </div>
        <p class="price">${formatPrice(c.price)}</p>
        <button class="enroll${enrolledClasses.has(c.title) ? " enrolled" : ""}" data-title="${c.title}" aria-pressed="${enrolledClasses.has(c.title)}">${enrolledClasses.has(c.title) ? "Unenroll" : "Enroll Now"}</button>
      </div>
    </article>
  `).join("");
  emptyMsg.hidden = list.length > 0;
}

function filterClasses() {
  const q = searchInput.value.trim().toLowerCase();
  renderClasses(classes.filter(c => c.title.toLowerCase().includes(q) || c.chef.toLowerCase().includes(q)));
}

let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function selectRecording(classIndex) {
  const selectedClass = classes[classIndex];
  if (!selectedClass) return;

  recordingVideo.pause();
  recordingVideo.src = selectedClass.video;
  recordingVideo.load();
  recordingName.textContent = selectedClass.title;
  recordingCredit.textContent = selectedClass.credit;
  recordingQuality.textContent = selectedClass.quality;
  recordingSource.href = selectedClass.video;
  recordingError.hidden = true;

  recordingList.querySelectorAll(".recording-option").forEach((option, index) => {
    const selected = index === classIndex;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-pressed", selected);
  });
}

function renderRecordings() {
  recordingList.innerHTML = classes.map((c, index) => `
    <button class="recording-option${index === 0 ? " selected" : ""}" type="button" data-index="${index}" aria-pressed="${index === 0}">
      <span class="recording-option-title">${c.title}</span>
      <span class="recording-option-quality">${c.quality}</span>
    </button>
  `).join("");
  selectRecording(0);
}

// Events
searchForm.addEventListener("submit", e => { e.preventDefault(); filterClasses(); });
searchInput.addEventListener("input", filterClasses);

grid.addEventListener("click", e => {
  const btn = e.target.closest(".enroll");
  if (!btn) return;
  const title = btn.dataset.title;
  const isEnrolled = enrolledClasses.has(title);

  if (isEnrolled) {
    enrolledClasses.delete(title);
    btn.textContent = "Enroll Now";
    btn.classList.remove("enrolled");
    btn.setAttribute("aria-pressed", "false");
    showToast(`You're unenrolled from ${title}`);
  } else {
    enrolledClasses.add(title);
    btn.textContent = "Unenroll";
    btn.classList.add("enrolled");
    btn.setAttribute("aria-pressed", "true");
    showToast(`You're enrolled in ${title}`);
  }
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

liveInteractive.addEventListener("click", () => {
  liveQuestionDialog.showModal();
  liveQuestion.focus();
});

closeLiveQuestion.addEventListener("click", () => liveQuestionDialog.close());

liveQuestionForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!liveQuestionForm.reportValidity()) return;
  liveQuestionForm.reset();
  liveQuestionDialog.close();
  showToast("Your question is ready for the live session.");
  liveInteractive.focus();
});

certificateAccess.addEventListener("click", () => certificateDialog.showModal());

closeCertificate.addEventListener("click", () => certificateDialog.close());

certificateDialog.addEventListener("close", () => certificateAccess.focus());

recordedAccess.addEventListener("click", () => {
  renderRecordings();
  recordingsDialog.showModal();
});

recordingList.addEventListener("click", e => {
  const option = e.target.closest(".recording-option");
  if (option) selectRecording(Number(option.dataset.index));
});

recordingVideo.addEventListener("error", () => {
  recordingError.hidden = false;
});

recordingVideo.addEventListener("loadeddata", () => {
  recordingError.hidden = true;
});

closeRecordings.addEventListener("click", () => recordingsDialog.close());

recordingsDialog.addEventListener("close", () => {
  recordingVideo.pause();
  recordedAccess.focus();
});

renderClasses(classes);