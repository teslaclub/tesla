const coin = document.getElementById('coin');
const container = document.getElementById('coinContainer');

let isPaused = false;

// Alternar reproducción o pausa al hacer clic
container.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        coin.classList.add('paused');
    } else {
        coin.classList.remove('paused');
        container.style.transform = 'rotateX(0deg) rotateY(0deg)'; // Reiniciar inclinación
    }
});

// Efecto de inclinación 3D (Tilt) interactivo solo cuando está pausada
container.addEventListener('mousemove', (e) => {
    if (!isPaused) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calcular grados de inclinación basados en la posición del mouse
    const rotateX = -(y / rect.height) * 30; 
    const rotateY = (x / rect.width) * 30;

    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Restablecer inclinación fluida cuando el cursor sale
container.addEventListener('mouseleave', () => {
    if (isPaused) {
        container.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
});

