const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;
const colors = ["#ffffff", "#ffd700", "#ffcc00", "#ff4500", "#ff6347"];

class Particle {
    constructor(x, y, isStatic = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.6 + 0.3;
        this.isStatic = isStatic; // Determines if the particle moves with the mouse
    }
    update() {
        if (!this.isStatic) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
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

function initParticles() {
    particles = [];
    // Create background static particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, true));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        if (!particle.isStatic) {
            particle.size *= 0.98; // Fade effect for mouse particles
            if (particle.size < 0.5) {
                particles.splice(index, 1);
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", (event) => {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(event.clientX, event.clientY));
    }
    if (particles.length > particleCount * 2) {
        particles.splice(0, particles.length - particleCount * 2);
    }
});

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
