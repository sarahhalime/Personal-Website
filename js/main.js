// Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Navigation
let isNavOpen = false;

navToggle.addEventListener('click', () => {
    isNavOpen = !isNavOpen;
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close nav when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isNavOpen) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            isNavOpen = false;
        }
    });
});

// Navbar scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.12, // Lower threshold for earlier detection
    rootMargin: '-50px 0px -50px 0px' // Less aggressive margin
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Typing animation
const phrases = [
    "Computer Science Student",
    "Data Science Enthusiast", 
    "AI/ML Explorer",
    "Problem Solver",
    "Aspiring Developer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation after loading
setTimeout(typeText, 2000);

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
            
            if (entry.target.classList.contains('skills-content')) {
                animateSkillBars();
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

const animatedElements = document.querySelectorAll('.about-content, .skills-content, .projects-grid, .contact-content');
animatedElements.forEach(el => {
    animationObserver.observe(el);
});

// Smooth scrolling
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

// Contact form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:sarahhalime55@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    this.reset();
    alert('Thank you for your message!');
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Terminal loading text animation
const terminalTexts = [
    'Initializing portfolio...',
    'Loading projects...',
    'Compiling skills...',
    'Ready to showcase!'
];

let terminalIndex = 0;
const terminalElement = document.querySelector('.terminal-text');

function updateTerminalText() {
    if (terminalElement && terminalIndex < terminalTexts.length) {
        terminalElement.textContent = `sarah@portfolio:~$ ${terminalTexts[terminalIndex]}`;
        terminalIndex++;
        setTimeout(updateTerminalText, 400);
    }
}

// Start terminal animation
updateTerminalText();

// Add click effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    let currentTheme = localStorage.getItem('theme') || 'dark';

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    function initTheme() {
        setTheme(currentTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    initTheme();
});

// Console message for devs
console.log(`
🚀 Welcome to Sarah Halime's Portfolio!
👩‍💻 Built with HTML, CSS, and JavaScript
📧 Contact: sarahhalime55@gmail.com
🔗 LinkedIn: https://linkedin.com/in/sarah-halime
💻 GitHub: https://github.com/sarahhalime

Thanks for checking out the code! 😊
`);
