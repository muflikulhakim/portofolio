// ===========================
// Navigation Functionality
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Intersection Observer for Fade-in Animations
// ===========================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
            
            // Animate stats counter
            if (entry.target.classList.contains('stat-item')) {
                const statNumber = entry.target.querySelector('.stat-number');
                animateCounter(statNumber);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.about-content, .skill-card, .project-card, .contact-content, .stat-item').forEach(el => {
    observer.observe(el);
});

// ===========================
// Counter Animation for Stats
// ===========================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// Typing Effect for Hero Subtitle
// ===========================

const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===========================
// Parallax Effect for Hero Section
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===========================
// Project Card Hover Effect
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Cursor Glow Effect (Optional - Advanced)
// ===========================

const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Enlarge cursor glow on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '20px';
        cursorGlow.style.height = '20px';
    });
});

// ===========================
// Skill Progress Animation on Scroll
// ===========================

const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const progress = progressBar.getAttribute('data-progress');
            
            // Delay untuk efek berurutan
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ===========================
// Back to Top - Smooth Scroll
// ===========================

const backToTopLink = document.querySelector('.footer-links a[href="#home"]');
if (backToTopLink) {
    backToTopLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// Add Active State to Navigation Links
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// ===========================
// Console Welcome Message
// ===========================

console.log('%c👋 Welcome to My Portfolio!', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Muflikhul Hakim', 'color: #b400ff; font-size: 14px;');
console.log('%cTech Stack: HTML5, CSS3, JavaScript', 'color: #a0a0b0; font-size: 12px;');

// ===========================
// Performance Optimization
// ===========================

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Easter Egg - Konami Code
// ===========================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        
        // Easter egg message
        alert('🎉 Selamat! Kamu menemukan Easter Egg! 🚀');
    }
});

// Add rainbow animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);