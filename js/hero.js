// ===== HERO SECTION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 0.7 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Wait for fade animation to complete
    }, 700);
    
    // ===== TYPING ANIMATION =====
    const roles = [
        'Web Developer',
        'AI Enthusiast', 
        'Python Developer',
        'UI/UX Designer'
    ];
    
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typeSpeed = 150;
    let deleteSpeed = 100;
    let pauseTime = 1500;
    
    const typedTextElement = document.getElementById('typed-text');
    
    function typeRole() {
        const currentText = roles[currentRole];
        
        if (isDeleting) {
            // Deleting characters
            typedTextElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
            
            if (currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                setTimeout(typeRole, 500);
                return;
            }
            setTimeout(typeRole, deleteSpeed);
        } else {
            // Typing characters
            typedTextElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
            
            if (currentChar === currentText.length) {
                isDeleting = true;
                setTimeout(typeRole, pauseTime);
                return;
            }
            setTimeout(typeRole, typeSpeed);
        }
    }
    
    // Start typing animation
    setTimeout(typeRole, 1000);
    
    // ===== NETWORK PARTICLE SYSTEM (Large screens only) =====
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Check if we should show particles (large screens only)
    let shouldShowParticles = window.innerWidth >= 768;
    let particles = [];
    let animationId;
    
    function initParticles() {
        if (shouldShowParticles && canvas) {
            canvas.style.display = 'block';
            
            // Set canvas size
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', () => {
                shouldShowParticles = window.innerWidth >= 768;
                if (shouldShowParticles) {
                    resizeCanvas();
                } else {
                    canvas.style.display = 'none';
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                }
            });
            
            // Mouse position
            let mouse = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };
            
            // Track mouse movement
            canvas.addEventListener('mousemove', function(e) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
            
            // Network particle class
            class NetworkParticle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = (Math.random() - 0.5) * 0.8;
                    this.speedY = (Math.random() - 0.5) * 0.8;
                    this.opacity = Math.random() * 0.5 + 0.3;
                }
                
                update() {
                    // Movement
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    // Mouse attraction
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        const force = (150 - distance) / 150 * 0.5;
                        this.x += dx * force * 0.005;
                        this.y += dy * force * 0.005;
                    }
                    
                    // Boundary bounce
                    if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                    if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
                    
                    // Keep within bounds
                    this.x = Math.max(0, Math.min(canvas.width, this.x));
                    this.y = Math.max(0, Math.min(canvas.height, this.y));
                }
                
                draw() {
                    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                    const baseColor = isDarkTheme ? '0, 255, 0' : '0, 179, 0';
                    
                    ctx.fillStyle = `rgba(${baseColor}, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Create particles
            particles = [];
            const particleCount = 80;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new NetworkParticle());
            }
            
            // Draw connections between particles
            function drawConnections() {
                const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                const baseColor = isDarkTheme ? '0, 255, 0' : '0, 179, 0';
                
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 120) {
                            const opacity = (120 - distance) / 120 * 0.2;
                            ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            // Animation loop
            function animate() {
                if (!shouldShowParticles) {
                    canvas.style.display = 'none';
                    return;
                }
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                // Draw connections
                drawConnections();
                
                animationId = requestAnimationFrame(animate);
            }
            
            // Start animation
            animate();
        } else if (canvas) {
            // Hide canvas on small screens
            canvas.style.display = 'none';
        }
    }
    
    // Initialize particles
    initParticles();
    
    // ===== SCROLL INDICATOR =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLLING FOR HERO BUTTONS =====
    const heroButtons = document.querySelectorAll('.hero-btn[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== PARALLAX EFFECT FOR HERO CONTENT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe hero elements
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-role, .hero-description, .hero-buttons, .hero-social, .hero-image, .scroll-indicator');
    heroElements.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
    
    // ===== THEME CHANGE PARTICLE UPDATE =====
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Small delay to allow theme change to complete
            setTimeout(() => {
                // Particles will automatically use new theme colors on next frame
            }, 100);
        });
    }
    
    // ===== FLOATING BADGES INTERACTION =====
    const floatingBadges = document.querySelectorAll('.floating-badge');
    floatingBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
