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

    /* --- AJAX Form Submission (No Redirect) --- */
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const formStatus = document.getElementById('form-status');
    const resetBtn = document.getElementById('reset-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop standard redirect
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Change button text to indicate loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Tells Formspree to return JSON, not redirect
                    }
                });

                if (response.ok) {
                    // Success: Hide form, show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    contactForm.reset(); // Clear inputs for next time
                    formStatus.style.display = 'none';
                } else {
                    // Error from Formspree (e.g. spam filter or validation)
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form.";
                    }
                    formStatus.style.display = 'block';
                }
            } catch (error) {
                // Network error
                formStatus.textContent = "Oops! There was a network problem.";
                formStatus.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });

        // "Send another message" button logic
        if(resetBtn) {
            resetBtn.addEventListener('click', () => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
            });
        }
    }
});
