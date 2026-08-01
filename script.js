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

/* Navbar moving indicator & interactions */
(function() {
    const nav = document.querySelector('.nav-links');
    const indicator = document.querySelector('.nav-indicator');
    if (!nav || !indicator) return;

    const links = Array.from(nav.querySelectorAll('.nav-link'));

    function moveIndicatorTo(linkEl, animate = true) {
        const rect = linkEl.getBoundingClientRect();
        const parentRect = nav.getBoundingClientRect();
        const left = rect.left - parentRect.left;
        const width = rect.width;
        if (!animate) indicator.style.transition = 'none';
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
        if (!animate) requestAnimationFrame(() => indicator.style.transition = '');
    }

    // init: place under active or first
    const active = nav.querySelector('.nav-link.active') || links[0];
    moveIndicatorTo(active, false);

    // click handlers: move & scroll
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moveIndicatorTo(link);
            // small focus feedback
            link.focus({preventScroll:true});
        });
    });

    // update on resize and scroll (recalculate positions)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const current = nav.querySelector('.nav-link.active') || links[0];
            moveIndicatorTo(current, false);
        }, 120);
    });

    window.addEventListener('scroll', () => {
        // update active link based on sections (reuse existing updateActiveNav if present)
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top <= 120) current = section.id;
        });
        if (current) {
            const targetLink = nav.querySelector(`.nav-link[href="#${current}"]`);
            if (targetLink) {
                links.forEach(l => l.classList.remove('active'));
                targetLink.classList.add('active');
                moveIndicatorTo(targetLink);
            }
        }
    });

    // search clear
    const searchInput = document.querySelector('.nav-search input[type="search"]');
    const clearBtn = document.querySelector('.search-clear');
    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => { searchInput.value = ''; searchInput.focus(); });
    }
})();

// Simple nav active handling (add to end of file)
(function() {
    const nav = document.querySelector('.navbar.simple-navbar');
    if (!nav) return;
    const links = nav.querySelectorAll('.nav-link');

    function setActive(el) {
        links.forEach(l => l.classList.remove('active'));
        el.classList.add('active');
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // keep default scrolling logic elsewhere; just update active style
            setActive(link);
        });
    });

    // Optional: set active based on current hash on load
    window.addEventListener('load', () => {
        const hash = location.hash || '#home';
        const target = nav.querySelector(`.nav-link[href="${hash}"]`);
        if (target) setActive(target);
    });

    // Optional: update active on scroll (lightweight)
    const sections = [...document.querySelectorAll('section[id]')];
    window.addEventListener('scroll', () => {
        const offset = 120;
        for (let i = sections.length - 1; i >= 0; i--) {
            const s = sections[i];
            if (window.scrollY >= s.offsetTop - offset) {
                const a = nav.querySelector(`.nav-link[href="#${s.id}"]`);
                if (a) setActive(a);
                break;
            }
        }
    });
})();
