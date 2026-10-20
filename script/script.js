// script.js

// Base de datos de la red provista por tu esquema
const datasetMatriz = [
    { sujetos: "Sujetos 1, 2, 3", beneficiario: "Sujeto 1", recompensa: "5g Oro + \$500", acumulado: "\$3,100" },
    { sujetos: "Sujetos 4, 5, 6", beneficiario: "Sujeto 2", recompensa: "5g Oro + \$500", acumulado: "\$3,100" },
    { sujetos: "Sujetos 7, 8, 9", beneficiario: "Sujeto 3", recompensa: "5g Oro + \$500", acumulado: "\$3,100" },
    { sujetos: "Sujetos 10, 11, 12", beneficiario: "Sujeto 4", recompensa: "5g Oro + \$500", acumulado: "\$3,100" },
    { sujetos: "Sujetos 13, 1, 2", beneficiario: "Sujeto 5", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 3, 4, 5", beneficiario: "Sujeto 6", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 6, 7, 8", beneficiario: "Sujeto 7", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 9, 10, 11", beneficiario: "Sujeto 8", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 12, 13, 1", beneficiario: "Sujeto 9", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 2, 3, 4", beneficiario: "Sujeto 10", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 5, 6, 7", beneficiario: "Sujeto 11", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 8, 9, 10", beneficiario: "Sujeto 12", recompensa: "5g Oro + \$500", acumulado: "\$1,500" },
    { sujetos: "Sujetos 11, 12, 1", beneficiario: "Sujeto 13", recompensa: "5g Oro + \$500", acumulado: "\$1,500" }
];

const paletaGradientes = [
    "linear-gradient(135deg, #b45309 0%, #d97706 100%)", // Ámbar
    "linear-gradient(135deg, #047857 0%, #10b981 100%)", // Esmeralda
    "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)", // Índigo
    "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)", // Púrpura
    "linear-gradient(135deg, #be123c 0%, #f43f5e 100%)"  // Carmín
];

// Configuración de la animación mecánica
const VELOCIDAD = 0.4; // Píxeles por cuadro (Sube más lento o rápido cambiando este valor)
const ALTO_PELDANO = 85; // Espacio vertical que ocupa cada tarjeta en el riel
const DISTANCIA_ENTRE_PELDANOS = 95; // Separación física entre escalones
let referenciasPeldanos = [];

function inicializarDashboard() {
    const tbody = document.getElementById('tabla-matriz-body');
    const contenedorEscalera = document.getElementById('escalera-dinamica');
    
    if (!tbody || !contenedorEscalera) return;

    let htmlTabla = '';
    contenedorEscalera.innerHTML = ''; 

    datasetMatriz.forEach((item, index) => {
        // 1. Alimentar la tabla fija de auditoría
        htmlTabla += `
            <tr>
                <td class="font-monospace text-secondary">${item.sujetos}</td>
                <td><span class="badge badge-oro p-2 text-uppercase font-monospace">${item.beneficiario}</span></td>
                <td class="small text-light-emphasis">${item.recompensa}</td>
                <td class="fw-bold text-end font-monospace text-success">${item.acumulado}</td>
            </tr>
        `;

        // 2. Crear físicamente los escalones en el DOM
        const peldano = document.createElement('div');
        peldano.className = 'peldano-escalera p-3 text-white';
        peldano.style.background = paletaGradientes[index % paletaGradientes.length];
        
        // Inyección de estructura visual interna
        peldano.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="font-monospace fw-bold bg-black bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center me-2 border border-white border-opacity-10" style="width: 22px; height: 24px; font-size: 0.7rem;">
                        ${index + 1}
                    </span>
                    <span class="fw-bold font-monospace tracking-wide text-uppercase" style="font-size:0.85rem">${item.beneficiario}</span>
                </div>
                <span class="badge bg-black bg-opacity-40 text-warning font-monospace">${item.acumulado}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-1 pt-1 border-top border-white border-opacity-10" style="font-size: 0.7rem;">
                <span class="text-white-50">⚡ ${item.sujetos}</span>
                <span class="text-white-50">🎁 5g + \$500</span>
            </div>
        `;
        
        contenedorEscalera.appendChild(peldano);

        // Calcular la posición inicial de partida (distribuidos en fila india desde abajo hacia arriba)
        // El primer elemento (Index 0) empieza arriba, el resto se encola hacia abajo fuera de la pantalla
        let yInicial = index * DISTANCIA_ENTRE_PELDANOS;

        referenciasPeldanos.push({
            domElement: peldano,
            y: yInicial
        });
    });

    tbody.innerHTML = htmlTabla;

    // Arrancar el motor de animación continua
    maquinariaEscalera();
}

function maquinariaEscalera() {
    const alturaContenedorMax = 620; // Sincronizado con la altura del CSS (.contenedor-escalera)

    referenciasPeldanos.forEach((peldano) => {
        // Restar píxeles para provocar el movimiento de ascenso vertical (hacia el píxel 0)
        peldano.y -= VELOCIDAD;

        // EFECTO LOOP INFINITO: Si el peldaño superó el límite superior del contenedor (-ALTO_PELDANO)
        // se recalcula y se envía directamente al final de la fila de la escalera mecánica
        if (peldano.y <= -ALTO_PELDANO) {
            // Encuentra el peldaño que está más abajo en este momento para ponerse justo detrás de él
            let coordenadaMasBaja = Math.max(...referenciasPeldanos.map(p => p.y));
            peldano.y = coordenadaMasBaja + DISTANCIA_ENTRE_PELDANOS;
        }

        // CONTROL DIAGONAL DINÁMICO: Multiplica su altura actual por un factor para definir su desplazamiento horizontal.
        // A medida que el peldaño sube (su coordenada Y se reduce hacia 0), su margen izquierdo disminuye,
        // provocando la inclinación diagonal real de una escalera de centro comercial.
        let factorInclinacionDiagonal = (peldano.y / DISTANCIA_ENTRE_PELDANOS) * 16;
        
        // Validar márgenes para evitar que se desborde del contenedor de forma tosca
        let margenIzquierdoCalculado = Math.max(0, Math.min(220, factorInclinacionDiagonal));

        // EFECTO FADE DE ENTRADA Y SALIDA: Los peldaños ganan transparencia si están en la cima o saliendo por el sótano
        let opacidadDinamica = 1;
        if (peldano.y < 40) {
            opacidadDinamica = peldano.y / 40; // Se desvanece al llegar arriba
        } else if (peldano.y > (alturaContenedorMax - ALTO_PELDANO)) {
            opacidadDinamica = (alturaContenedorMax - peldano.y) / ALTO_PELDANO; // Aparece suavemente abajo
        }

        // Aplicar los cambios calculados al hardware gráfico de la pantalla
        peldano.domElement.style.top = `${peldano.y}px`;
        peldano.domElement.style.marginLeft = `${margenIzquierdoCalculado}px`;
        peldano.domElement.style.opacity = Math.max(0, Math.min(1, opacidadDinamica));
    });

    // Ejecuta recursivamente la animación cuadro por cuadro a 60 hercios
    requestAnimationFrame(maquinariaEscalera);
}

// Inicializar al cargar el documento
document.addEventListener('DOMContentLoaded', inicializarDashboard);

