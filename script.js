document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor Logic --- */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    // Initial position to avoid blink
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate cursor movement
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth follower loop
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    /* --- Hover States --- */
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-tag');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

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
        } else {
            icon.setAttribute('name', 'moon-outline');
            document.documentElement.style.setProperty('--bg-color', '#030303');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--card-bg', '#0a0a0a');
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
});
