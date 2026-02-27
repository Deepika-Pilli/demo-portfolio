// script.js
document.addEventListener('DOMContentLoaded', () => {

    /* --- Core Interactions --- */
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item, .nav-btn');

    const toggleMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Navbar Scroll Effect (Glassmorphism)
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass');
        } else {
            navbar.classList.remove('glass');
        }
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for fixed navbar height
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* --- Micro-Animations --- */

    // 4. Custom Cursor Blob Tracker
    const cursorBlob = document.querySelector('.cursor-blob-bg');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth following using requestAnimationFrame
    const animateBlob = () => {
        const dx = mouseX - blobX;
        const dy = mouseY - blobY;
        
        // Easing factor (0.05 = slow lag, 0.2 = fast follow)
        blobX += dx * 0.05;
        blobY += dy * 0.05;
        
        if(cursorBlob) {
             cursorBlob.style.transform = `translate(calc(-50% + ${blobX}px), calc(-50% + ${blobY}px))`;
        }
        
        requestAnimationFrame(animateBlob);
    };
    
    // Disable on touch devices for performance
    if (window.matchMedia("(pointer: fine)").matches) {
       animateBlob();
    } else {
        if(cursorBlob) cursorBlob.style.display = 'none';
    }


    /* --- Intersection Observers for Scroll Reveals --- */

    // 5. Fade In Up Elements
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 6. Staggered Reveals (e.g., Grid items, Lists)
    const staggeredSections = document.querySelectorAll('.staggered-reveal');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to children with a delay
                const children = Array.from(entry.target.children);
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100); // 100ms stagger between elements
                });
                staggerObserver.unobserve(entry.target);
            } else {
                // Initialize state
                Array.from(entry.target.children).forEach(child => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                });
            }
        });
    }, {
        threshold: 0.1
    });

    staggeredSections.forEach(section => staggerObserver.observe(section));


    /* --- Parallax Effects --- */
    
    // 7. Hero Visual Parallax on scroll
    const heroVisual = document.querySelector('.scroll-parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
        }
    });

});
