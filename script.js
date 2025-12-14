/* ============================================
   ARTH PORTFOLIO - JAVASCRIPT
   ============================================ */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ============================================
// NAVIGATION
// ============================================

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// PORTFOLIO FILTER
// ============================================

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// MODALS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
}

// Close modal on background click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const modalId = modal.id.replace('-modal', '');
            closeModal(modalId);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const modalId = modal.id.replace('-modal', '');
            closeModal(modalId);
        });
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe
document.querySelectorAll('.portfolio-card, .about-content, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ============================================
// PRELOADER (Optional)
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .btn-primary');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// ============================================
// PORTFOLIO CARD HOVER EFFECT
// ============================================

document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// SCROLL TO TOP
// ============================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Style for scroll to top button
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #7B2D8E 0%, #E91E8C 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(123, 45, 142, 0.4);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 25px rgba(123, 45, 142, 0.5);
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// TYPING EFFECT FOR HERO (Optional Enhancement)
// ============================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎨 Arth Portfolio', 'font-size: 24px; font-weight: bold; color: #7B2D8E;');
console.log('%cDesigned with creativity and passion', 'font-size: 14px; color: #E91E8C;');
