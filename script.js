// Smooth Scroll Navigation + Cursor
const transitionOverlay = document.querySelector('.transition-overlay');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');

        if (cursor && cursorDot) {
            const x = e.clientX || window.innerWidth / 2;
            const y = e.clientY || window.innerHeight / 2;

            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
        }

        if (transitionOverlay) {
            transitionOverlay.classList.add('active');
        }

        setTimeout(() => {
            const offset = 90;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (transitionOverlay) {
                transitionOverlay.classList.remove('active');
            }
        }, 120);
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Highlight active link on load
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks[0]) navLinks[0].classList.add('active');
});

// Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot && !window.matchMedia('(pointer: coarse)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.22;
        dotY += (mouseY - dotY) * 0.22;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactive = document.querySelectorAll('a, button, .social-circle, .game-card, .theme-toggle, .nav-link, .edu-card');

    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));
    document.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(section => {
        section.classList.add('active');
    });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    const isLight = theme === 'light';

    document.body.classList.toggle('light-mode', isLight);
    document.documentElement.classList.toggle('light-mode', isLight);
    document.body.setAttribute('data-theme', theme);

    if (themeToggle) {
        themeToggle.textContent = isLight ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }

    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(nextTheme);
        });
    }
});