const STORAGE_KEY = "gpa-ledger-grades-v1";

let grades = loadGrades();
let activeYear = 1;

const semesterKeys = [];
for (let y = 1; y <= 3; y++) {
  for (let s = 1; s <= 2; s++) semesterKeys.push(`${y}-${s}`);
}

function loadGrades() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Could not read saved grades", e);
    return {};
  }
}

function saveGrades() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
  } catch (e) {
    console.error("Could not save grades", e);
  }
  updateSavedStamp();
}

function gradeOptionsHTML(selected) {
  return Object.keys(GRADE_POINTS)
    .map((g) => `<option value="${g}" ${g === selected ? "selected" : ""}>${g}</option>`)
    .join("");
}

function calcSemesterGPA(year, semester) {
  const subs = SUBJECTS.filter((s) => s.year === year && s.semester === semester);
  let points = 0;
  let credits = 0;
  subs.forEach((s) => {
    const g = grades[s.code];
    const gp = GRADE_POINTS[g];
    if (gp !== null && gp !== undefined) {
      points += gp * s.credits;
      credits += s.credits;
    }
  });
  return credits > 0 ? points / credits : null;
}

function calcCGPA() {
  let points = 0;
  let credits = 0;
  SUBJECTS.forEach((s) => {
    const gp = GRADE_POINTS[grades[s.code]];
    if (gp !== null && gp !== undefined) {
      points += gp * s.credits;
      credits += s.credits;
    }
  });
  return credits > 0 ? points / credits : null;
}

function classFromCGPA(cgpa) {
  if (cgpa === null) return "—";
  if (cgpa >= 3.7) return "First Class";
  if (cgpa >= 3.3) return "Second Upper";
  if (cgpa >= 3.0) return "Second Lower";
  if (cgpa >= 2.0) return "Pass";
  return "Below Pass";
}

function renderYearTabs() {
  const tabWrap = document.getElementById("year-tabs");
  tabWrap.innerHTML = "";
  [1, 2, 3].forEach((y) => {
    const btn = document.createElement("button");
    btn.className = "year-tab" + (y === activeYear ? " active" : "");
    btn.textContent = `Year ${y}`;
    btn.addEventListener("click", () => {
      activeYear = y;
      render();
    });
    tabWrap.appendChild(btn);
  });
}

function subjectRow(s) {
  const current = grades[s.code] || "-";
  return `
    <div class="subject-row" data-code="${s.code}">
      <div class="subject-info">
        <span class="subject-code">${s.code}</span>
        <span class="subject-name">${s.name}</span>
      </div>
      <div class="subject-meta">
        <span class="credit-pill">${s.credits} cr</span>
        <select class="grade-select" data-code="${s.code}">
          ${gradeOptionsHTML(current)}
        </select>
      </div>
    </div>`;
}

function renderSemesterBlock(year, semester) {
  const subs = SUBJECTS.filter((s) => s.year === year && s.semester === semester);
  const gpa = calcSemesterGPA(year, semester);
  return `
    <div class="semester-block">
      <div class="semester-header">
        <h3>Semester ${semester}</h3>
        <span class="semester-gpa">GPA ${gpa !== null ? gpa.toFixed(2) : "—"}</span>
      </div>
      <div class="subject-list">
        ${subs.map(subjectRow).join("")}
      </div>
    </div>`;
}

function renderYearPanel() {
  const panel = document.getElementById("year-panel");
  panel.innerHTML = `
    <div class="semester-grid">
      ${renderSemesterBlock(activeYear, 1)}
      ${renderSemesterBlock(activeYear, 2)}
    </div>`;

  panel.querySelectorAll(".grade-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const code = e.target.dataset.code;
      const val = e.target.value;
      if (val === "-") {
        delete grades[code];
      } else {
        grades[code] = val;
      }
      saveGrades();
      render();
    });
  });
}

function renderSummary() {
  const cgpa = calcCGPA();
  const ring = document.getElementById("cgpa-value");
  ring.textContent = cgpa !== null ? cgpa.toFixed(2) : "—";
  document.getElementById("cgpa-class").textContent = classFromCGPA(cgpa);

  // const completed = Object.keys(grades).length;
  // const total = SUBJECTS.length;
  const completed = SUBJECTS.filter(
  s => GRADE_POINTS[grades[s.code]] != null
  ).length;
  const total = SUBJECTS.length;
  //I Add this 

  document.getElementById("progress-text").textContent = `${completed} / ${total} modules graded`;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById("progress-fill").style.width = pct + "%";

  const gaugePct = cgpa !== null ? Math.min(cgpa / 4, 1) : 0;
  const circumference = 2 * Math.PI * 54;
  const dash = circumference * gaugePct;
  document.getElementById("gauge-arc").style.strokeDasharray = `${dash} ${circumference}`;
}

function updateSavedStamp() {
  const el = document.getElementById("saved-stamp");
  const now = new Date();
  el.textContent = `Saved ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

function resetAll() {
  if (!confirm("Clear every saved grade? This cannot be undone.")) return;
  grades = {};
  saveGrades();
  render();
}

function render() {
  renderYearTabs();
  renderYearPanel();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  document.getElementById("reset-btn").addEventListener("click", resetAll);
});
