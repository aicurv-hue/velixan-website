// ===========================
// NAVBAR - Scroll & Mobile
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNav();
});

// Toggle mobile menu and manage accessibility state & scroll lock
hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('scroll-lock', isOpen);
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('scroll-lock');
    });
});

// Close menu when clicking outside it on mobile
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('mobile-open')) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('scroll-lock');
        }
    }
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
        const href = link.getAttribute('href');
        if (href === `#${current}` || href === `index.html#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        let targetId = this.getAttribute('href');
        if (targetId.startsWith('index.html#')) {
            const currentPage = window.location.pathname.split('/').pop();
            // If already on the home page, bypass navigation and smooth scroll
            if (currentPage === '' || currentPage === 'index.html') {
                e.preventDefault();
                targetId = targetId.substring(10); // Strip index.html prefix
            } else {
                return; // Normal browser navigation to index.html#hash
            }
        } else {
            e.preventDefault();
        }

        if (targetId === '#') return;

        // Check if the target is a tab category
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetId.substring(1)}"]`);
        if (tabBtn) {
            // Programmatically switch tabs
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));
            
            tabBtn.classList.add('active');
            tabBtn.setAttribute('aria-selected', 'true');
            const targetContent = document.getElementById(targetId.substring(1));
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Scroll directly to the active category content
                const offset = navbar.offsetHeight + 16;
                const top = targetContent.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            return;
        }

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
// Redundant global declarations removed (declared at top of file)


tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
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
let animationId;
let isMobile = window.innerWidth < 768;

const mouse = { x: null, y: null, radius: 160 };

if (!isMobile) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });
}

window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        if (!wasMobile && animationId) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
        if (wasMobile || !animationId) {
            animate();
        }
    }
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
        if (this.x < 0 || this.x > canvas.width) this.dirX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dirY *= -1;

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

function animate() {
    if (isMobile) return;
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    connect();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        if (!isMobile) {
            animate();
        }
    }
});

if (!isMobile) {
    init();
    animate();
}

// ===========================
// CONTACT MODAL LOGIC
// ===========================
const modal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const successCloseBtn = modal.querySelector('.btn-success-close');
const modalTriggers = document.querySelectorAll('.trigger-modal');

function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-lock');
    // Focus the first input field
    setTimeout(() => {
        const firstInput = document.getElementById('form-name');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-lock');
    // Reset form states after close animation completes
    setTimeout(() => {
        if (contactForm) contactForm.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';
        if (contactForm) contactForm.reset();
    }, 300);
}

// Attach event listeners to all trigger buttons
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Close triggers
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

// Escape key listener to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
    }
});

// Form submit handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success state
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
    });
}
