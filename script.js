let drops = [];
let W, H;
let canvas = null;
let ctx = null;

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById('rain-canvas');
    if (!canvas) {
        return;
    }

    ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    resize();
    initDrops();
    draw();

    window.addEventListener('resize', () => {
        resize();
        initDrops();
    });
});

function resize() {
    if (!canvas) {
        return;
    }

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initDrops() {
    if (!ctx) {
        return;
    }

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
    if (!ctx) {
        return;
    }

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

function mouseOver(x) {
    x.style.color = "white";
    x.style.textDecoration = "underline";
    x.style.textUnderlinePosition = "under";
}

function mouseOut(x) {
    x.style.color = "#a9a9a9";
    x.style.textDecoration = "none";
}