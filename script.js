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



    // Theme Toggle Logic
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            // Save preference
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

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

    // 3D Starfield Background
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, stars = [];
        const STAR_COUNT = 400;
        const SPEED = 0.05;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                    size: Math.random() * 1.5
                });
            }
        };

        const update = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            ctx.translate(width / 2, height / 2);

            for (let i = 0; i < STAR_COUNT; i++) {
                let s = stars[i];
                s.z -= SPEED * width;

                if (s.z <= 0) {
                    s.z = width;
                    s.x = Math.random() * width - width / 2;
                    s.y = Math.random() * height - height / 2;
                }

                const px = s.x * (width / s.z);
                const py = s.y * (width / s.z);
                const size = s.size * (width / s.z);

                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.translate(-width / 2, -height / 2);
            requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        update();
    }
});