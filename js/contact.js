// Simple Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    initContactForm();
    initContactEffects();
    initFormValidation();
});

// Initialize EmailJS
function initEmailJS() {
    // You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    // Sign up at https://www.emailjs.com/ and get your keys
    if (typeof emailjs !== 'undefined') {
        emailjs.init('rBq5nDmnXR8nmiqju'); // Replace with your EmailJS public key
    }
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            const formData = new FormData(contactForm);
            
            // Email to you (main message)
            const mainTemplateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_email: 'aashishadhikari220@gmail.com'
            };
            
            // Auto-reply email to sender
            const autoReplyParams = {
                to_name: formData.get('name'),
                to_email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Send main email first
            emailjs.send('service_1abkgq6', 'template_jkwztom', mainTemplateParams)
                .then(function(response) {
                    console.log('Main email sent!', response.status, response.text);
                    
                    // Send auto-reply email
                    return emailjs.send('service_1abkgq6', 'template_auto_reply', autoReplyParams);
                })
                .then(function(response) {
                    console.log('Auto-reply sent!', response.status, response.text);
                    contactForm.reset();
                    hideLoadingState();
                    showNotification('Message sent successfully! Check your email for confirmation.', 'success');
                    
                    // Simple success animation
                    contactForm.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        contactForm.style.transform = 'scale(1)';
                    }, 200);
                })
                .catch(function(error) {
                    console.log('Email failed...', error);
                    hideLoadingState();
                    showNotification('Failed to send message. Please try again.', 'error');
                });
        } else {
            // Fallback - just show success message
            setTimeout(() => {
                contactForm.reset();
                hideLoadingState();
                showNotification('EmailJS not loaded. Please set up EmailJS for email functionality.', 'warning');
            }, 1000);
        }
    });
}

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name) {
        showError('nameError', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.length < 5) {
        showError('messageError', 'Message must be at least 5 characters');
        isValid = false;
    }
    
    // Validate Google reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        showNotification('Please complete the reCAPTCHA verification', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

// Loading state management
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Contact effects and animations
function initContactEffects() {
    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Form validation setup
function initFormValidation() {
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const mediaInput = document.getElementById('media');
    
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField('name'));
        nameInput.addEventListener('input', () => clearFieldError('nameError'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateField('email'));
        emailInput.addEventListener('input', () => clearFieldError('emailError'));
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => validateField('message'));
        messageInput.addEventListener('input', () => clearFieldError('messageError'));
    }
    
    if (mediaInput) {
        mediaInput.addEventListener('change', () => validateField('media'));
    }
}

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    
    switch (fieldName) {
        case 'name':
            const nameValue = field.value.trim();
            if (!nameValue) {
                showError('nameError', 'Name is required');
            } else if (nameValue.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            const emailValue = field.value.trim();
            if (!emailValue) {
                showError('emailError', 'Email is required');
            } else if (!isValidEmail(emailValue)) {
                showError('emailError', 'Please enter a valid email address');
            }
            break;
            
        case 'message':
            const messageValue = field.value.trim();
            if (!messageValue) {
                showError('messageError', 'Message is required');
            } else if (messageValue.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
            }
            break;
            
        case 'media':
            const file = field.files[0];
            if (file && file.size > 200 * 1024 * 1024) {
                showError('mediaError', 'File size must be less than 200MB');
            }
            break;
    }
}

// Clear field error
function clearFieldError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style notification
    const bgColor = type === 'success' ? 'var(--brand-color)' : 
                    type === 'error' ? '#ff4757' : 
                    '#3498db';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});

// File input styling
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('media');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
            const fileSize = this.files[0] ? (this.files[0].size / (1024 * 1024)).toFixed(2) + ' MB' : '';
            
            // Update file input display
            let fileDisplay = document.querySelector('.file-display');
            if (!fileDisplay) {
                fileDisplay = document.createElement('div');
                fileDisplay.className = 'file-display';
                fileInput.parentNode.appendChild(fileDisplay);
            }
            
            if (this.files[0]) {
                fileDisplay.innerHTML = `
                    <div style="margin-top: 10px; padding: 10px; background: var(--card-bg); border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-file" style="color: var(--brand-color);"></i>
                            <div>
                                <div style="font-size: 12px; color: var(--text-primary); font-weight: 500;">${fileName}</div>
                                <div style="font-size: 10px; color: var(--text-secondary);">${fileSize}</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                fileDisplay.innerHTML = '';
            }
        });
    }
});

// CSS for notifications and form states
const additionalCSS = `
.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-content i {
    font-size: 16px;
    flex-shrink: 0;
}

.form-group.focused label {
    color: var(--brand-color);
}

.form-group input:valid,
.form-group textarea:valid {
    border-color: var(--brand-color);
}

.form-group input:invalid:not(:placeholder-shown),
.form-group textarea:invalid:not(:placeholder-shown) {
    border-color: #ff4757;
}

.file-input {
    cursor: pointer;
}

.file-display {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Add CSS to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
