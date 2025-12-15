document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Scroll Animations (Intersection Observer) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Select all elements with 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    /* --- Mobile Menu Toggle --- */
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            
            // Toggle icon between hamburger and close
            if(navLinks.classList.contains('mobile-open')) {
                toggleBtn.textContent = '✕';
            } else {
                toggleBtn.textContent = '☰';
            }
        });
    }

    /* --- Form Submission UX --- */
    const formBtn = document.querySelector('.contact-form button');
    if(formBtn) {
        formBtn.addEventListener('mouseenter', () => {
            formBtn.style.boxShadow = "0 8px 30px rgba(79, 70, 229, 0.4)";
        });
        formBtn.addEventListener('mouseleave', () => {
            formBtn.style.boxShadow = "";
        });
    }
});