document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.comparison-slider').forEach(slider => {
        let isDragging = false;
        const comparisonImage = slider.querySelector('.comparison-image');
        const handle = slider.querySelector('.slider-handle');

        const startDragging = (e) => {
            isDragging = true;
            slider.classList.add('dragging');
            // Prevent default behavior for touch events
            if (e.touches) e.preventDefault();
        };

        const stopDragging = () => {
            isDragging = false;
            slider.classList.remove('dragging');
        };

        const onDrag = (e) => {
            if (!isDragging) return;

            // Use touch or mouse coordinates
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            
            const rect = slider.getBoundingClientRect();
            let offsetX = clientX - rect.left;

            // Clamp the value between 0 and slider width
            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            
            const percentage = (offsetX / rect.width) * 100;
            
            handle.style.left = `${percentage}%`;
            comparisonImage.style.width = `${percentage}%`;
        };

        // Mouse events
        handle.addEventListener('mousedown', startDragging);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', onDrag);

        // Touch events
        handle.addEventListener('touchstart', startDragging);
        document.addEventListener('touchend', stopDragging);
        document.addEventListener('touchmove', onDrag);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle form submission
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
        form.reset();
    });
});

