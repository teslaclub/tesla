// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');

    // Controlar la pausa o reanudación del giro al hacer clic
    coin.addEventListener('click', () => {
        coin.classList.toggle('paused');
    });

    // Agregar un ligero efecto interactivo de inclinación (Tilt) al mover el mouse sobre ella mientras está pausada
    const container = document.querySelector('.coin-container');
    
    container.addEventListener('mousemove', (e) => {
        if (coin.classList.contains('paused')) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Limitar la inclinación para mantener el realismo
            const tiltX = (y / (rect.height / 2)) * -15;
            const tiltY = (x / (rect.width / 2)) * 15;
            
            // Aplicamos la rotación combinada (manteniendo el reverso si es necesario)
            coin.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            coin.style.transition = 'none';
        }
    });

    // Restablecer la posición original o reanudar el flujo normal cuando el mouse sale
    container.addEventListener('mouseleave', () => {
        if (coin.classList.contains('paused')) {
            coin.style.transform = '';
            coin.style.transition = 'transform 0.5s ease';
        }
    });
});
