const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const staticParticles = []; // Always present particles
const dynamicParticles = []; // Mouse-created particles

const staticParticleCount = 100; // Always visible background particles
const dynamicParticleLimit = 50; // Max particles from mouse movement
const colors = ["#ffffff", "#00aaff", "#99ccff", "#66ccff", "#33bbff"]; // Blue-based color palette

class Particle {
    constructor(x, y, isStatic = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.speedX = (Math.random() - 0.5) * (isStatic ? 0.1 : 0.5); // Static moves slower
        this.speedY = (Math.random() - 0.5) * (isStatic ? 0.1 : 0.5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.5; // Varying brightness
        this.brightnessVariation = Math.random() * 0.03 + 0.01; // Flickering effect
        this.isStatic = isStatic;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Flickering effect (brightness variation)
        this.opacity += this.brightnessVariation;
        if (this.opacity > 1 || this.opacity < 0.3) {
            this.brightnessVariation *= -1;
        }

        // Keep particles within bounds
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Initialize static background particles
function initParticles() {
    staticParticles.length = 0;
    for (let i = 0; i < staticParticleCount; i++) {
        staticParticles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, true));
    }
}

// Mouse movement adds extra particles
window.addEventListener("mousemove", (event) => {
    for (let i = 0; i < 5; i++) {
        let spreadX = event.clientX + (Math.random() - 0.5) * 150; // Wider spread
        let spreadY = event.clientY + (Math.random() - 0.5) * 150;
        dynamicParticles.push(new Particle(spreadX, spreadY));
    }

    // Limit the number of dynamic particles
    if (dynamicParticles.length > dynamicParticleLimit) {
        dynamicParticles.splice(0, dynamicParticles.length - dynamicParticleLimit);
    }
});

// Particle animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Always keep background particles
    staticParticles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    // Draw mouse-generated particles
    dynamicParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size < 0.5) {
            dynamicParticles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

// Resize handler to keep particles correctly positioned
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start everything
initParticles();
animateParticles();




// Filtering by tag — moves matching projects to the top, hides the rest
document.addEventListener("DOMContentLoaded", function () {
    const tagFilter = document.getElementById("tag-filter");

    if (tagFilter) {
        tagFilter.addEventListener("change", function () {
            const selectedTag = this.value;
            const projectsList = document.querySelector(".projects-list");
            const allProjects = Array.from(document.querySelectorAll(".project"));

            // Reset: show all in original order
            if (selectedTag === "all") {
                allProjects.forEach(p => {
                    p.style.display = "flex";
                    projectsList.appendChild(p);
                });
                return;
            }

            const normalizeTag = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const filterWords = selectedTag.split('-').filter(w => w.length > 1);

            const matching = [];
            const nonMatching = [];

            allProjects.forEach(project => {
                const tagTexts = Array.from(project.querySelectorAll(".tag"))
                    .map(tag => normalizeTag(tag.textContent));

                const isMatch = tagTexts.some(t =>
                    t === selectedTag || filterWords.every(word => t.includes(word))
                );

                if (isMatch) {
                    matching.push(project);
                } else {
                    nonMatching.push(project);
                }
            });

            // Reorder DOM: matching first, non-matching after (hidden)
            [...matching, ...nonMatching].forEach(p => projectsList.appendChild(p));
            matching.forEach(p => p.style.display = "flex");
            nonMatching.forEach(p => p.style.display = "none");
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const readMoreToggles = document.querySelectorAll(".read-more-toggle");
    if (readMoreToggles.length > 0) {
        readMoreToggles.forEach((toggle) => { 
            toggle.addEventListener("click", function () {
                const fullDescription = this.nextElementSibling;
                if (!fullDescription) {
                    console.error("Full description not found for:", this);
                    return;
                }
                fullDescription.classList.toggle("active");
                this.innerHTML = fullDescription.classList.contains("active") ? "Read Less ▲" : "Read More ▼";
            });
        });
    } else {
        console.warn("No .read-more-toggle elements found on this page.");
    }
});

