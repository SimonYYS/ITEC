window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const navLogo = document.querySelector('.nav-logo');
navLogo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    navLinkItems.forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-link[href="#hero"]').classList.add('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

function animateNumbers() {
    const advantageNumbers = document.querySelectorAll('.advantage-number');
    
    advantageNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const originalText = num.innerHTML;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                const result = target < 10 ? `0${target}` : target;
                const display = target === 100 ? `10<span>0</span>` : 
                               target === 24 ? `2<span>4</span>` :
                               target === 8 ? `0<span>8</span>` :
                               target === 3 ? `0<span>3</span>` :
                               target === 1 ? `0<span>1</span>` : result;
                num.innerHTML = display;
                clearInterval(timer);
            } else {
                const currentInt = Math.floor(current);
                const result = currentInt < 10 ? `0${currentInt}` : currentInt;
                const display = currentInt === 100 ? `10<span>0</span>` : 
                               currentInt === 24 ? `2<span>4</span>` :
                               currentInt === 8 ? `0<span>8</span>` :
                               currentInt === 3 ? `0<span>3</span>` :
                               currentInt === 1 ? `0<span>1</span>` : result;
                num.innerHTML = display;
            }
        }, duration / steps);
    });
}

const advantagesSection = document.querySelector('.advantages-section');
const advantagesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateNumbers, 300);
            advantagesObserver.unobserve(advantagesSection);
        }
    });
}, {
    threshold: 0.3
});

advantagesObserver.observe(advantagesSection);

const galleryItems = document.querySelectorAll('.gallery-item');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        
        modalImage.src = img.src;
        modalCaption.textContent = title;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

const spareImages = document.querySelectorAll('.spare-image-item');
spareImages.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('span');
        
        modalImage.src = img.src;
        modalCaption.textContent = caption ? caption.textContent : img.alt;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

const equipmentImages = document.querySelectorAll('.equipment-card img');
equipmentImages.forEach(img => {
    img.addEventListener('click', () => {
        modalImage.src = img.src;
        modalCaption.textContent = img.alt;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelector('.modal-overlay').addEventListener('click', () => {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const sectionCards = document.querySelectorAll('.company-card, .product-item, .category-item, .spare-part-card, .on-site-card, .project-item, .advantage-card');

sectionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
});

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

sectionCards.forEach(card => {
    cardObserver.observe(card);
});

const mapLines = document.querySelectorAll('.map-line');
mapLines.forEach((line, index) => {
    line.style.width = '0';
    line.style.transition = `width 1s ease ${index * 0.3}s`;
});

const networkSection = document.querySelector('.global-network');
const networkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            mapLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.width = line.dataset.width || line.style.width;
                }, index * 200);
            });
            networkObserver.unobserve(networkSection);
        }
    });
}, {
    threshold: 0.3
});

networkObserver.observe(networkSection);

document.querySelectorAll('.map-line').forEach(line => {
    const computedStyle = window.getComputedStyle(line);
    const width = computedStyle.width;
    line.dataset.width = width;
    line.style.width = '0';
});

if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    const clickableElements = document.querySelectorAll('a, button, .company-card, .product-item, .category-item, .spare-part-card, .on-site-card, .project-item, .advantage-card, .gallery-item');
    clickableElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        el.addEventListener('touchend', () => {
            el.style.transform = 'scale(1)';
        });
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
}, 100));

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});