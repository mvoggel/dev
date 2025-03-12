const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;
const colors = ["#ffffff", "#00aaff", "#99ccff", "#66ccff", "#33bbff"];

class Particle {
    constructor(x, y, isStatic = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5; // Smaller particles
        this.speedX = (Math.random() - 0.5) * 0.2; // Slow movement
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.5; // Varying brightness
        this.isStatic = isStatic;
        this.brightnessVariation = Math.random() * 0.05 + 0.02; // Subtle flickering effect
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.brightnessVariation;
        if (this.opacity > 1 || this.opacity < 0.3) {
            this.brightnessVariation *= -1;
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
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, true));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", (event) => {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(event.clientX, event.clientY));
    }
    if (particles.length > particleCount * 3) {
        particles.splice(0, particles.length - particleCount * 3);
    }
});

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
