// --- Abstract Background Animation ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.3 + 0.1})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = '#0f0f11';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 * (1 - dist / 150)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animate();
