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
    
    // Load saved theme from localStorage, default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Always default to dark mode if no theme is saved
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
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
    
    // Calculate and set dynamic age
    const calculateAge = () => {
        const birthDate = new Date(2007, 4, 3); // May 3, 2007 (month is 0-indexed)
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        const ageElement = document.getElementById('dynamic-age');
        if (ageElement) {
            ageElement.textContent = age;
        }
    };
    
    // Set dynamic age on page load
    calculateAge();

    // Counter animation function
    const animateCounter = (element) => {
        if (!element || element.classList.contains('counted')) return;
        
        let target = parseInt(element.getAttribute('data-count'));
        
        // Handle dynamic year calculation for experience
        const startYear = element.getAttribute('data-start-year');
        if (startYear) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            // Experience increases from January 1st of the following year
            let yearsOfExperience;
            if (currentYear >= parseInt(startYear) + 1) {
                yearsOfExperience = currentYear - parseInt(startYear);
            } else {
                yearsOfExperience = 1; // First year
            }
            target = yearsOfExperience;
            element.setAttribute('data-count', target);
        }
        
        // Smooth counter animation duration (slower)
        const totalDuration = 2500; // 2.5 seconds for all counters
        
        // Check for + sign and % suffix
        const hasPlus = element.getAttribute('data-plus') === 'true';
        const statItem = element.closest('.stat-item');
        const suffix = statItem.querySelector('.stat-suffix');
        
        // Use easing function for smooth animation
        const startTime = Date.now();
        const startValue = 0;
        
        // Easing function for smooth acceleration and deceleration
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            
            // Apply easing
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(startValue + (target - startValue) * easedProgress);
            
            // Smooth opacity transition for number changes
            element.style.transition = 'opacity 0.1s ease';
            element.style.opacity = '0.7';
            
            setTimeout(() => {
                if (suffix) {
                    element.textContent = current;
                } else {
                    element.textContent = current + (hasPlus ? '+' : '');
                }
                
                element.style.opacity = '1';
            }, 50);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.classList.add('counted');
                // Final cleanup
                setTimeout(() => {
                    element.style.transition = '';
                    element.style.opacity = '';
                }, 100);
            }
        };
        
        // Start animation with a small delay to sync with fade-in
        setTimeout(() => {
            animate();
        }, 300);
    };
    
    // Set dynamic age on page load
    calculateAge();

    // ===== BOOKMARK NAVIGATION FUNCTIONALITY =====
    const bookmarkNav = document.getElementById('bookmark-nav');
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    const bookmarkSections = document.querySelectorAll('section[id]');
    let bookmarkShouldBeVisible = false;
    
    // Check if screen is large enough for full bookmark navigation
    function shouldShowFullBookmark() {
        return window.innerWidth >= 1200;
    }
    
    // Show bookmark navigation based on screen size
    function toggleBookmarkVisibility() {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight * 0.3;
        const isLargeScreen = shouldShowFullBookmark();
        
        bookmarkShouldBeVisible = scrollY > heroHeight && isLargeScreen;
        
        if (isLargeScreen) {
            // On screens 1100px+, always show bookmark after hero section
            if (scrollY > heroHeight) {
                bookmarkNav.classList.add('force-visible');
                bookmarkNav.classList.remove('navbar-hidden');
            } else {
                bookmarkNav.classList.remove('force-visible');
                bookmarkNav.classList.add('navbar-hidden');
            }
        } else {
            // On screens below 1100px, hide bookmark completely
            bookmarkNav.classList.remove('visible', 'force-visible');
            bookmarkNav.classList.add('navbar-hidden');
        }
    }
    
    // Update active bookmark based on current section
    function updateActiveBookmark() {
        let currentSection = '';
        const scrollY = window.scrollY;
        
        bookmarkSections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active bookmark
        bookmarkItems.forEach(item => {
            const targetSection = item.getAttribute('data-section');
            if (targetSection === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll to section when bookmark is clicked
    bookmarkItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add subtle visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // ===== GO TO TOP BUTTON (MOBILE & MEDIUM SCREENS) =====
    const goToTopBtn = document.getElementById('go-to-top');
    let lastScrollY = 0;
    let scrollDirection = 'down';
    
    function toggleGoToTopVisibility() {
        const scrollY = window.scrollY;
        const showAfter = window.innerHeight * 0.3;
        const windowWidth = window.innerWidth;
        const isLargeScreen = shouldShowFullBookmark();
        
        // Detect scroll direction
        if (scrollY > lastScrollY) {
            scrollDirection = 'down';
        } else if (scrollY < lastScrollY) {
            scrollDirection = 'up';
        }
        
        let shouldShowGoToTop = false;
        
        // Show on mobile (≤768px)
        if (windowWidth <= 768) {
            shouldShowGoToTop = scrollY > showAfter && scrollDirection === 'up';
        }
        // Show on medium screens (769px-1199px) where bookmark is not available
        else if (windowWidth >= 769 && windowWidth < 1200) {
            shouldShowGoToTop = scrollY > showAfter && scrollDirection === 'up';
            goToTopBtn.classList.add('show-for-medium');
        }
        // Hide on large screens (≥1200px) where bookmark is available
        else if (isLargeScreen) {
            shouldShowGoToTop = false;
            goToTopBtn.classList.remove('show-for-medium');
        }
        
        // Show/hide button with navbar-like behavior
        if (shouldShowGoToTop) {
            // Show when scrolling up
            if (!goToTopBtn.classList.contains('visible')) {
                goToTopBtn.classList.remove('hide');
                goToTopBtn.classList.add('visible');
            }
        } else {
            // Hide when scrolling down or conditions not met
            if (goToTopBtn.classList.contains('visible')) {
                goToTopBtn.classList.remove('visible');
                goToTopBtn.classList.add('hide');
            }
        }
        
        lastScrollY = scrollY;
    }
    
    // Go to top functionality
    goToTopBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Hide button after clicking
        setTimeout(() => {
            this.classList.remove('visible');
            this.classList.add('hide');
        }, 300);
    });
    
    // Combined scroll listener for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            toggleBookmarkVisibility();
            updateActiveBookmark();
            toggleGoToTopVisibility();
        }, 50);
    });
    
    // Window resize listener to re-evaluate space
    window.addEventListener('resize', () => {
        toggleBookmarkVisibility();
        toggleGoToTopVisibility();
    });
    
    // Initialize both navigation systems
    toggleBookmarkVisibility();
    updateActiveBookmark();
    toggleGoToTopVisibility();

    // ===== FADE-IN ANIMATIONS ON SCROLL =====
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: Stop observing once animated to improve performance
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    // Observe all elements with fade animation classes
    const fadeElements = document.querySelectorAll(
        '.fade-section, .fade-left, .fade-right, .fade-up, .scale-in'
    );
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Add special handling for staggered animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in class to parent and all children with delays
                const parent = entry.target;
                parent.classList.add('fade-in');
                
                // Find child elements with delay classes and trigger them
                const delayedElements = parent.querySelectorAll('[class*="delay-"]');
                delayedElements.forEach(element => {
                    element.classList.add('fade-in');
                });
                
                // Special handling for stats container - trigger counter animations
                if (parent.classList.contains('stats-container')) {
                    const statNumbers = parent.querySelectorAll('.stat-number');
                    statNumbers.forEach((statNumber, index) => {
                        // Delay counter animation based on scale-in delay
                        setTimeout(() => {
                            animateCounter(statNumber);
                        }, (index + 1) * 200); // 200ms between each counter
                    });
                }
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    // Observe container elements that have children with delays
    const staggerContainers = document.querySelectorAll(
        '.skills-grid, .stats-container, .about-top-row'
    );
    
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
});
