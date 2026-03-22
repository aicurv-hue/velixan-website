// ===========================
// NAVBAR - Scroll & Mobile
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNav();
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('header, section');
    const navLinkEls = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const offset = navbar.offsetHeight + 16;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===========================
// SERVICE TABS
// ===========================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero elements immediately
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#home .reveal-up, #home .reveal-fade, #home .reveal-scale').forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), i * 150);
    });

    // Start counting stats when they come into view
    statsObserver();
});

// ===========================
// 3D CARD TILT EFFECT
// ===========================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotY = ((x - cx) / cx) * 8;
        const rotX = ((y - cy) / cy) * -8;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.transform = `translate(${x - 125}px, ${y - 125}px)`;
            glow.style.opacity = '1';
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        const glow = card.querySelector('.card-glow');
        if (glow) glow.style.opacity = '0';
    });
});

// ===========================
// ANIMATED STAT COUNTERS
// ===========================
function statsObserver() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                animateCount(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
}

function animateCount(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }

    requestAnimationFrame(update);
}

// ===========================
// TYPED TEXT ANIMATION
// ===========================
const typedEl = document.getElementById('typed-text');
const phrases = ['Building Your Vision', 'Launching Your Idea', 'Growing Your Business', 'Your Digital Future'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];

    if (!isDeleting && charIndex < current.length) {
        typedEl.textContent = current.substring(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, 75);
    } else if (isDeleting && charIndex >= 0) {
        typedEl.textContent = current.substring(0, charIndex);
        charIndex--;
        setTimeout(typeWriter, 45);
    } else if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeWriter, 2200);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        setTimeout(typeWriter, 400);
    }
}

setTimeout(typeWriter, 1000);

// ===========================
// INTERACTIVE PARTICLE CANVAS
// ===========================
const canvas = document.getElementById('live-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null, radius: 160 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.8 + 0.5;
        this.density = Math.random() * 25 + 5;
        this.dirX = (Math.random() - 0.5) * 0.5;
        this.dirY = (Math.random() - 0.5) * 0.5;

        const colors = [
            'rgba(112, 0, 255, 0.55)',
            'rgba(0, 212, 255, 0.55)',
            'rgba(0, 242, 96, 0.45)'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Boundary
        if (this.x < 0 || this.x > canvas.width) this.dirX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dirY *= -1;

        // Mouse repel
        if (mouse.x !== undefined) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 3;
                this.y -= (dy / dist) * force * 3;
            }
        }

        this.x += this.dirX;
        this.y += this.dirY;

        this.draw();
    }
}

function init() {
    particlesArray = [];
    const count = Math.min((canvas.width * canvas.height) / 10000, 180);
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    const maxDist = 130;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDist * maxDist) {
                const opacity = (1 - distSq / (maxDist * maxDist)) * 0.18;
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    connect();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
});

init();
animate();
