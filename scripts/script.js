document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
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
