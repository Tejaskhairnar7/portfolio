// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Update button icon based on current theme
    updateThemeToggleIcon();
    
    // Toggle theme when button is clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Set the new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save theme preference
            localStorage.setItem('theme', newTheme);
            
            // Update button icon
            updateThemeToggleIcon();
        });
    }
    
    // Function to update theme toggle button icon
    function updateThemeToggleIcon() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.querySelector('.fa-moon').style.display = 'none';
            document.querySelector('.fa-sun').style.display = 'inline-block';
        } else {
            document.querySelector('.fa-moon').style.display = 'inline-block';
            document.querySelector('.fa-sun').style.display = 'none';
        }
    }

    // Navigation toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', function() {
        // Add scrolled class to header when scrolling down
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.add('active');
            }
        } else {
            header.classList.remove('scrolled');
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.remove('active');
            }
        }

        // Activate nav links based on scroll position
        activateNavOnScroll();
        
        // Reveal elements on scroll
        revealElements();
    });

    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                
                // Add a small delay for a smoother transition
                setTimeout(() => {
                    card.classList.add('show');
                }, 100);
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Function to activate nav links based on scroll position
    function activateNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Function to reveal elements on scroll
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initialize reveal elements on page load
    revealElements();

    // Typing effect for hero section
    const typingElement = document.querySelector('.hero h1');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.innerHTML = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }

    // Progress bar animation for skills
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(progress => {
            const value = progress.style.width;
            progress.style.width = '0';
            
            setTimeout(() => {
                progress.style.width = value;
            }, 500);
        });
    }

    // Trigger progress bar animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a simple preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Add preloader styles
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}); 