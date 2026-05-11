let drops = [];
let W, H;
const canvas = document.getElementById('rain-canvas');

// Only run the animation if the canvas actually exists on the current page
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function initDrops() {
        drops = [];
        const count = Math.floor(W * 0.06);
        for (let i = 0; i < count; i++) {
            drops.push({
                x: Math.random() * W,
                y: Math.random() * H,
                len: 8 + Math.random() * 18,
                speed: 6 + Math.random() * 10,
                opacity: 0.15 + Math.random() * 0.45,
                width: 0.5 + Math.random() * 0.8
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        drops.forEach(d => {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x - 1, d.y + d.len);
            ctx.strokeStyle = `rgba(200, 230, 210, ${d.opacity})`;
            ctx.lineWidth = d.width;
            ctx.stroke();
            d.y += d.speed;
            if (d.y > H) {
                d.y = -d.len;
                d.x = Math.random() * W;
            }
        });
        requestAnimationFrame(draw);
    }

    // Initial run
    resize();
    initDrops();
    draw();

    window.addEventListener('resize', () => {
        resize();
        initDrops();
    });
}

// These functions are safe to leave outside because they don't use the canvas
function mouseOver(x) {
    x.style.color = "white";
    x.style.textDecoration = "underline";
    x.style.textUnderlinePosition = "under";
}

function mouseOut(x) {
    x.style.color = "#a9a9a9";
    x.style.textDecoration = "none";
}