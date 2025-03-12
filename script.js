
document.addEventListener("DOMContentLoaded", function() {
    let background = document.getElementById("background");
    let colors = ["#111", "#222", "#333", "#444"];
    let i = 0;
    
    setInterval(() => {
        background.style.background = `radial-gradient(circle, ${colors[i]} 0%, #111 100%)`;
        i = (i + 1) % colors.length;
    }, 5000);
});
