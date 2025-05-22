const toggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Apply saved theme on page load
if (localStorage.getItem('dark-mode') === 'true') {
  body.classList.add('dark-mode');
  toggle.checked = true;
}

// Update theme on toggle
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'false');
  }
});
// Typing Effect
document.addEventListener("DOMContentLoaded", function () {
    const text = "Hi, I'm Rana Muhammad Awais!";
    const typedText = document.querySelector(".typed-text");
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting) {
            typedText.textContent = text.substring(0, index + 1);
            index++;

            if (index === text.length) {
                isDeleting = true;
                setTimeout(typeWriter, 1000);
                return;
            }
        } else {
            typedText.textContent = text.substring(0, index - 1);
            index--;

            if (index === 0) {
                isDeleting = false;
            }
        }

        setTimeout(typeWriter, isDeleting ? 50 : 75);
    }

    window.addEventListener("load", typeWriter);
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
  
    const isLight = localStorage.getItem('dark-mode') === 'false';
    if (isLight) {
        body.classList.add('light-mode');
        toggle.checked = true;
    }

    initVanta(isLight);

    toggle.addEventListener('change', () => {
        const light = toggle.checked;
        if (light) {
            body.classList.add('light-mode');
            localStorage.setItem('dark-mode', 'false');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('dark-mode', 'true');
        }
        initVanta(light);
    });
});

// Vanta.js Background
let vantaEffect;

function initVanta(isLightMode = false, primaryColor = '#00ff99') {
    if (vantaEffect) vantaEffect.destroy();

    vantaEffect = VANTA.NET({
        el: "#hero-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.5,
        scaleMobile: 1.0,
        color: isLightMode ? 0x555555 : parseInt(primaryColor.replace('#', '0x')),
        backgroundColor: isLightMode ? 0xffffff : 0x0a0a0a,
        points: 12.0,
        maxDistance: 22.00,
        spacing: 18.00
    });
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Close sidebar on link click
document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("active");
    });
});

// List Item Hover Effects
document.querySelectorAll('.list-section').forEach(section => {
    const container = section.querySelector('.list-container');
    const preview = section.querySelector('.preview-image');

    container.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.getAttribute('data-image');
            preview.style.backgroundImage = `url('${img}')`;
            preview.style.display = 'block';
        });

        item.addEventListener('mouseleave', () => {
            preview.style.display = 'none';
        });
    });
});

// Contact Form Animation
const contactBox = document.getElementById('contactBox');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactBox.classList.add('show');
            } else {
                contactBox.classList.remove('show');
            }
        });
    },
    { threshold: 0.3 }
);
if (contactBox) observer.observe(contactBox);

// Load dynamic content from Firebase
db.collection('portfolio').doc('content').onSnapshot(doc => {
    if (!doc.exists) return;
    
    const content = doc.data();
    
    // Update Home Section
    if (content.homeSection) {
        const typedText = document.querySelector('.typed-text');
        if (typedText) typedText.textContent = content.homeSection.title || "Hi, I'm Rana Muhammad Awais!";
        
        const heroDescription = document.getElementById('hero-description');
        if (heroDescription) heroDescription.textContent = content.homeSection.description || "I specialize in creating stunning, responsive websites and web applications.";
        
        const heroImage = document.getElementById('hero-image');
        if (heroImage && content.homeSection.image) heroImage.src = content.homeSection.image;
    }
    
    // Update About Section
    if (content.aboutSection) {
        const aboutName = document.getElementById('about-name');
        if (aboutName) aboutName.textContent = content.aboutSection.name ? `I'm ${content.aboutSection.name}` : "I'm Rana Muhammad Awais";
        
        const aboutTitle = document.getElementById('about-title');
        if (aboutTitle) aboutTitle.textContent = content.aboutSection.title || "Frontend Developer";
        
        const aboutDescription = document.getElementById('about-description');
        if (aboutDescription) aboutDescription.textContent = content.aboutSection.description || "As a passionate web developer...";
        
        const aboutEmail = document.getElementById('about-email');
        if (aboutEmail) aboutEmail.textContent = content.aboutSection.email || "ranaawais1112244@gmail.com";
        
        const aboutLocation = document.getElementById('about-location');
        if (aboutLocation) aboutLocation.textContent = content.aboutSection.location || "Islamabad, Pakistan";
        
        const aboutImage = document.getElementById('about-image');
        if (aboutImage && content.aboutSection.image) aboutImage.src = content.aboutSection.image;
    }
    
    // Update Skills
    if (content.skills && content.skills.length > 0) {
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            content.skills.forEach(skill => {
                skillsContainer.innerHTML += `
                    <div class="skill-item">
                        ${skill.image ? `<img src="${skill.image}" alt="${skill.name}">` : ''}
                        <p>${skill.name}</p>
                    </div>
                `;
            });
        }
    }
    
    // Update Color Scheme
    if (content.colorScheme) {
        document.documentElement.style.setProperty('--primary-color', content.colorScheme.primary || '#00ff99');
        document.documentElement.style.setProperty('--secondary-color', content.colorScheme.secondary || '#FFD700');
        document.documentElement.style.setProperty('--accent-color', content.colorScheme.accent || '#ffffff');
        
        // Update Vanta.js with new colors
        const isLight = document.body.classList.contains('light-mode');
        initVanta(isLight, content.colorScheme.primary);
    }
});
// Firebase Configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyAChATTlyrWuaS6fRlLMZGK-0G4_1cWcRY",
  authDomain: "portfolio-9b890.firebaseapp.com",
  projectId: "portfolio-9b890",
  storageBucket: "portfolio-9b890.firebasestorage.app",
  messagingSenderId: "544049035149",
  appId: "1:544049035149:web:585c0f2ca6990063bbefc4",
  measurementId: "G-4LQKD322ED"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    try {
        // Save to Firestore
        await db.collection('contacts').add({
            name,
            email,
            message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Show success message
        formMessage.textContent = 'Message sent successfully!';
        formMessage.className = 'message success';
        
        // Reset form
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error("Error sending message: ", error);
        formMessage.textContent = 'Error sending message. Please try again.';
        formMessage.className = 'message error';
    }
});