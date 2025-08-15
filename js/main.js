// ===== THEME TOGGLE & NAVBAR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Set default theme to dark
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // ===== FACEBOOK-STYLE NAVBAR SCROLL BEHAVIOR =====
    let lastScrollTop = 0;
    let isScrolling = false;
    let isNavigating = false; // Flag to prevent hiding during navigation
    
    window.addEventListener('scroll', function() {
        if (!isScrolling && !isNavigating) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down - hide navbar
                    navbar.style.transform = 'translateY(-100%)';
                    navbar.style.transition = 'transform 0.3s ease';
                } else if (scrollTop < lastScrollTop) {
                    // Scrolling up - show navbar
                    navbar.style.transform = 'translateY(0)';
                    navbar.style.transition = 'transform 0.3s ease';
                }
                
                // Add background blur on scroll with theme awareness
                if (scrollTop > 50) {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    if (currentTheme === 'dark') {
                        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
                    } else {
                        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    }
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.backgroundColor = 'var(--bg-secondary)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = 'none';
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // ===== THEME TOGGLE =====
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update navbar background based on theme and scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            if (newTheme === 'dark') {
                navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            navbar.style.backgroundColor = 'var(--bg-secondary)';
        }
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // ===== MOBILE MENU TOGGLE =====
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== NAVIGATION FUNCTIONALITY =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Set navigation flag to prevent navbar hiding
            isNavigating = true;
            
            // Close mobile menu
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update corresponding link in other menu
            const href = this.getAttribute('href');
            navLinks.forEach(l => {
                if (l.getAttribute('href') === href) {
                    l.classList.add('active');
                }
            });
            
            // Smooth scroll to section
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 60; // Account for reduced navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Reset navigation flag after scroll completes
                    setTimeout(() => {
                        isNavigating = false;
                    }, 1500); // Increased timeout to ensure smooth scrolling completes
                }
            }
        });
    });
    
    // ===== CLOSE MOBILE MENU ON OUTSIDE CLICK =====
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== HANDLE WINDOW RESIZE =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== HIRE ME BUTTON FUNCTIONALITY =====
    const hireBtns = document.querySelectorAll('.hire-btn');
    hireBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#hire') {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                    // Scroll to contact section
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 1000);
            }
        });
    });
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Toggle theme with Ctrl + Shift + T
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            themeToggle.click();
        }
        
        // Toggle mobile menu with Escape
        if (e.key === 'Escape') {
            if (mobileMenu.classList.contains('active')) {
                hamburger.click();
            }
        }
    });
    
    // ===== SECTION VISIBILITY DETECTION =====
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});
