// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Gallery Carousel =====
let currentSlide = 0;
let galleryImages = [];
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Fetch gallery images from API
fetch('/api/gallery')
    .then(response => response.json())
    .then(images => {
        galleryImages = images;
        initializeGallery();
    })
    .catch(error => console.error('Error loading gallery:', error));

function initializeGallery() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    // Create carousel slides and indicators
    galleryImages.forEach((image, index) => {
        // Carousel slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${image}" alt="Project ${index + 1}" loading="lazy">`;
        carouselTrack.appendChild(slide);
        
        // Indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetAutoAdvance();
        });
        carouselIndicators.appendChild(indicator);
    });
    
    setupTouchEvents();
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function setupTouchEvents() {
    const container = document.getElementById('carouselContainer');
    const track = document.getElementById('carouselTrack');
    
    // Touch events
    container.addEventListener('touchstart', touchStart);
    container.addEventListener('touchmove', touchMove);
    container.addEventListener('touchend', touchEnd);
    
    // Mouse events for desktop dragging
    container.addEventListener('mousedown', touchStart);
    container.addEventListener('mousemove', touchMove);
    container.addEventListener('mouseup', touchEnd);
    container.addEventListener('mouseleave', touchEnd);
}

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    const container = document.getElementById('carouselContainer');
    container.style.cursor = 'grabbing';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Swipe threshold
    if (movedBy < -50 && currentSlide < galleryImages.length - 1) {
        currentSlide += 1;
    }
    
    if (movedBy > 50 && currentSlide > 0) {
        currentSlide -= 1;
    }
    
    setPositionByIndex();
    
    const container = document.getElementById('carouselContainer');
    container.style.cursor = 'grab';
    
    resetAutoAdvance();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    const container = document.getElementById('carouselContainer');
    currentTranslate = currentSlide * -container.offsetWidth;
    prevTranslate = currentTranslate;
    updateCarousel();
}

// Carousel navigation buttons (only if they exist on the page)
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
        setPositionByIndex();
        resetAutoAdvance();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % galleryImages.length;
        setPositionByIndex();
        resetAutoAdvance();
    });

    // Auto-advance carousel
    let autoAdvance = setInterval(() => {
        currentSlide = (currentSlide + 1) % galleryImages.length;
        setPositionByIndex();
    }, 5000);

    function resetAutoAdvance() {
        clearInterval(autoAdvance);
        autoAdvance = setInterval(() => {
            currentSlide = (currentSlide + 1) % galleryImages.length;
            setPositionByIndex();
        }, 5000);
    }

    // Pause auto-advance on hover
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        galleryCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });

        galleryCarousel.addEventListener('mouseleave', () => {
            resetAutoAdvance();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
            setPositionByIndex();
            resetAutoAdvance();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % galleryImages.length;
            setPositionByIndex();
            resetAutoAdvance();
        }
    });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading status
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your message...';
        
        try {
            // Create a form element to submit to TradeHQ iframe
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = 'https://tradehq.com.au/jsenc/enquire';
            hiddenForm.target = 'tradehqFrame';
            hiddenForm.style.display = 'none';
            
            // Add form fields
            Object.keys(formData).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = formData[key];
                hiddenForm.appendChild(input);
            });
            
            // Append form to body and submit
            document.body.appendChild(hiddenForm);
            hiddenForm.submit();
            
            // Remove the form after submission
            setTimeout(() => {
                document.body.removeChild(hiddenForm);
            }, 1000);
            
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
            
        } catch (error) {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
            
            console.error('Form submission error:', error);
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.querySelectorAll('.service-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Image Lightbox for Gallery =====
function createLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'imageLightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightboxImg">
        <div class="lightbox-caption" id="lightboxCaption"></div>
        <button class="lightbox-prev" id="lightboxPrev">&#10094;</button>
        <button class="lightbox-next" id="lightboxNext">&#10095;</button>
    `;
    document.body.appendChild(lightbox);
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation functions
    function showImage(index) {
        if (galleryImages.length === 0) return;
        
        currentImageIndex = index;
        if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
        if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
        
        const img = lightbox.querySelector('#lightboxImg');
        img.src = galleryImages[currentImageIndex].src;
        img.alt = galleryImages[currentImageIndex].alt;
        
        const caption = lightbox.querySelector('#lightboxCaption');
        caption.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
    
    // Previous button
    lightbox.querySelector('#lightboxPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    
    // Next button
    lightbox.querySelector('#lightboxNext').addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });
    
    // Open lightbox function
    window.openLightbox = function(imgElement, images) {
        galleryImages = images;
        currentImageIndex = images.findIndex(img => img.src === imgElement.src);
        showImage(currentImageIndex);
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
}

// Initialize lightbox
createLightbox();

// Add click handlers to gallery images
window.initializeGalleryLightbox = function() {
    console.log('Initializing gallery lightbox...');
    const galleryGrid = document.getElementById('serviceGallery');
    console.log('Gallery grid found:', galleryGrid);
    
    if (galleryGrid) {
        const images = Array.from(galleryGrid.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt
        }));
        
        console.log('Found images:', images.length);
        
        if (images.length > 0) {
            galleryGrid.querySelectorAll('img').forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    console.log('Image clicked!', img.src);
                    window.openLightbox(img, images);
                });
            });
            console.log('Lightbox initialized successfully for', images.length, 'images');
        } else {
            console.log('No images found in gallery');
        }
    } else {
        console.log('Gallery grid not found');
    }
};

// Try to initialize immediately (for static galleries)
if (document.getElementById('serviceGallery')) {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(window.initializeGalleryLightbox, 1000);
        });
    } else {
        setTimeout(window.initializeGalleryLightbox, 1000);
    }
}
