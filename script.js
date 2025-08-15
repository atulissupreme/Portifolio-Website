// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selections ---
    // Select all necessary DOM elements at once to improve performance.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

    // --- Mobile Menu Functionality ---
    // Toggles the visibility of the mobile navigation menu.
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Smooth Scrolling for Navigation ---
    // Implements smooth scrolling for all anchor links.
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after a link is clicked
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Header & Scroll-to-Top Button Visibility on Scroll ---
    // Manages UI changes based on the user's scroll position.
    const handleScroll = () => {
        // Add a shadow to the header when scrolling down
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        }

        // Show or hide the scroll-to-top button
        if (scrollToTopButton) {
            if (window.scrollY > 300) {
                scrollToTopButton.style.display = 'flex';
            } else {
                scrollToTopButton.style.display = 'none';
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- On-Scroll Animations ---
    // Uses IntersectionObserver to trigger animations when elements enter the viewport.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in view, add the 'in-view' class to trigger the animation.
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { 
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollAnimateElements.forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Submission ---
    // Provides feedback to the user upon form submission without a page reload.
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            if (formFeedback) {
                // Display a success message
                formFeedback.textContent = 'Thank you! Your message has been sent.';
                formFeedback.classList.remove('text-red-600'); // Ensure no error color
                formFeedback.classList.add('text-green-600');
            }
            
            // Reset the form fields
            contactForm.reset();

            // Clear the feedback message after 5 seconds
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.textContent = '';
                }
            }, 5000);
        });
    }
});
