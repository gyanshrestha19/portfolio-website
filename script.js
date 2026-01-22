document.addEventListener('DOMContentLoaded', () => {



    /* --- Scroll Reveal with Intersection Observer --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    /* --- Magnetic Buttons (Optional Polish) --- */
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Theme Toggle
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.addEventListener('click', () => {
        const icon = themeBtn.querySelector('ion-icon');
        // Simple toggle for logic demonstration
        if (icon.getAttribute('name') === 'moon-outline') {
            icon.setAttribute('name', 'sunny-outline');
            document.documentElement.style.setProperty('--bg-color', '#e0e0e0');
            document.documentElement.style.setProperty('--text-color', '#111');
            document.documentElement.style.setProperty('--card-bg', '#fff');
            document.documentElement.style.setProperty('--input-bg', 'rgba(255, 255, 255, 0.8)');
        } else {
            icon.setAttribute('name', 'moon-outline');
            document.documentElement.style.setProperty('--bg-color', '#030303');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--card-bg', '#0a0a0a');
            document.documentElement.style.setProperty('--input-bg', 'rgba(0, 0, 0, 0.3)');
        }
    });

    // Form Submission (Demo)
    const form = document.querySelector('.professional-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';

            setTimeout(() => {
                btn.innerText = 'Message Sent';
                btn.style.backgroundColor = '#ccff00';
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '#fff';
                }, 3000);
            }, 1000);
        });
    }

    /* --- Project Modal Logic (Generic) --- */
    const setupModal = (triggerId, modalId) => {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);

        if (!trigger || !modal) return;

        const closeModalBtn = modal.querySelector('.close-modal');
        const modalBackdrop = modal.querySelector('.modal-backdrop');
        const gallery = modal.querySelector('.logos-gallery');

        // Open Modal
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close Modal Function
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Close events
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    // Setup Modals
    setupModal('project-logo-trigger', 'logo-modal');
    setupModal('project-poster-trigger', 'poster-modal');
    setupModal('project-web-trigger', 'web-modal');
});
