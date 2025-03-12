const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 200;
const colors = ["#ffffff", "#ffd700", "#ffcc00", "#ff4500", "#ff6347"];

class Particle {
    constructor(x, y) {
        this.x = x;  // Ensure it starts exactly at the cursor
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2; // Small random movement
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = "white"; // Force white for now to test visibility
    }
    update() {
        this.x += this.speedX; // Small movement over time
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Fade out particles by gradually decreasing size
        particle.size *= 0.98;
        if (particle.size < 0.5) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}


window.addEventListener("mousemove", (event) => {
    console.log("Mouse moving at:", event.clientX, event.clientY);
    
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
