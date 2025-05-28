document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with improved functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Function to handle menu state
    function toggleMenu() {
        const isOpen = navLinks.classList.contains('active');
        
        // Toggle classes
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        body.style.overflow = isOpen ? '' : 'hidden';
        
        // Add/remove event listener for escape key
        if (!isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('keydown', handleEscapeKey);
        }
    }

    // Handle escape key press
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            toggleMenu();
        }
    }

    // Handle click outside menu
    function handleClickOutside(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    }

    // Event listeners
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', handleClickOutside);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Smooth scroll for anchor links
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

    // Add scroll-based navbar background
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background based on scroll position
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(13, 15, 16, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Hero slider functionality
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slides = [
        {
            title: 'WEB DEVELOPMENT',
            description: 'Creating innovative digital experiences that inspire and engage'
        },
        {
            title: 'CREATIVE DESIGN',
            description: 'Bringing your vision to life with stunning visuals'
        },
        {
            title: 'DIGITAL MARKETING',
            description: 'Reaching your audience with strategic digital solutions'
        }
    ];

    function updateSlide(index) {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        
        setTimeout(() => {
            heroContent.querySelector('h1').textContent = slides[index].title;
            heroContent.querySelector('p').textContent = slides[index].description;
            heroContent.style.opacity = '1';
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }, 300);
    }

    // Event listeners for slider controls
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 5000);
});
