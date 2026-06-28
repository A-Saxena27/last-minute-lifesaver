 document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle parallax for orbital stats or background
            const sphere = document.querySelector<HTMLElement>('.float-animation');
            if (sphere) {
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
