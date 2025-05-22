const dashboardData = JSON.parse(localStorage.getItem('dashboardData') || '{}');

// Load existing data
window.onload = () => {
  loadHome();
  loadSkills();
  loadProjects();
};

// ---------------- HOME ----------------
function saveHome() {
  const title = document.getElementById('homeTitle').value;
  const subtitle = document.getElementById('homeSubtitle').value;
  const description = document.getElementById('homeDescription').value;
  const image = document.getElementById('homeImage').value;

  dashboardData['homeSection.title'] = title;
  dashboardData['homeSection.subtitle'] = subtitle;
  dashboardData['homeSection.description'] = description;
  dashboardData['homeSection.image'] = image;

  saveData();
  loadHome();  // Reload to show updated content
}

function loadHome() {
  document.getElementById('homeTitle').value = dashboardData['homeSection.title'] || '';
  document.getElementById('homeSubtitle').value = dashboardData['homeSection.subtitle'] || '';
  document.getElementById('homeDescription').value = dashboardData['homeSection.description'] || '';
  document.getElementById('homeImage').value = dashboardData['homeSection.image'] || '';

  // Display the current Home section data
  document.getElementById('currentHomeTitle').textContent = dashboardData['homeSection.title'] || 'No title set';
  document.getElementById('currentHomeSubtitle').textContent = dashboardData['homeSection.subtitle'] || 'No subtitle set';
  document.getElementById('currentHomeDescription').textContent = dashboardData['homeSection.description'] || 'No description set';
  document.getElementById('currentHomeImage').textContent = dashboardData['homeSection.image'] || 'No image URL set';
}

// ---------------- SKILLS ----------------
function addSkill() {
  const name = document.getElementById('skillName').value;
  const image = document.getElementById('skillImage').value;

  if (!dashboardData.skills) dashboardData.skills = [];
  dashboardData.skills.push({ name, image });
  saveData();
  loadSkills();
}

function loadSkills() {
  const container = document.getElementById('skillsList');
  container.innerHTML = '';
  (dashboardData.skills || []).forEach((skill, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `${skill.name} <button onclick="deleteSkill(${i})">Delete</button>`;
    container.appendChild(div);
  });
}

function deleteSkill(index) {
  dashboardData.skills.splice(index, 1);
  saveData();
  loadSkills();
}

// ---------------- PROJECTS ----------------
function addProject() {
  const name = document.getElementById('projectName').value;
  const label = document.getElementById('projectLabel').value;
  const image = document.getElementById('projectImage').value;
  const time = document.getElementById('projectTime').value;

  if (!dashboardData.projects) dashboardData.projects = [];
  dashboardData.projects.push({ name, label, image, time });
  saveData();
  loadProjects();
}

function loadProjects() {
  const container = document.getElementById('projectsList');
  container.innerHTML = '';
  (dashboardData.projects || []).forEach((proj, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `${proj.name} <button onclick="deleteProject(${i})">Delete</button>`;
    container.appendChild(div);
  });
}

function deleteProject(index) {
  dashboardData.projects.splice(index, 1);
  saveData();
  loadProjects();
}

// ---------------- SAVE TO LOCAL STORAGE ----------------
function saveData() {
  localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
}
