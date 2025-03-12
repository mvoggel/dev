const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let waveOffset = 0;

function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
            let y =
                Math.sin((x + waveOffset + i * 100) * 0.01) * 20 +
                canvas.height / 2 + i * 15;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    waveOffset += 1.5;
    requestAnimationFrame(drawWaves);
}

drawWaves();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
