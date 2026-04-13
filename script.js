document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSpan = document.getElementById('current');
    const progressBar = document.getElementById('progress-bar');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updatePresentation() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            }
        });

        // Update Controls logic
        if(prevBtn) prevBtn.disabled = currentSlide === 0;
        if(nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Update Counter & Progress logic
        if(currentSpan) currentSpan.innerText = currentSlide + 1;
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        if(progressBar) progressBar.style.width = progressPercentage + '%';
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updatePresentation();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updatePresentation();
        }
    }

    // Buttons
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
            prevSlide();
        }
    });

    // Touch/Swipe Logic for mobile (optional interaction)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Initialize display values
    updatePresentation();
});
