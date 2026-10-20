
// script.js

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
    "linear-gradient(135deg, #b45309 0%, #d97706 100%)", 
    "linear-gradient(135deg, #047857 0%, #10b981 100%)", 
    "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)", 
    "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)", 
    "linear-gradient(135deg, #be123c 0%, #f43f5e 100%)"  
];

// Variables de Control Mecánico y de Flujo
const VELOCIDAD = 0.4; 
const ALTO_PELDANO = 85; 
const DISTANCIA_ENTRE_PELDANOS = 95; 
let referenciasPeldanos = [];
let escaleraEnMovimiento = true; // Estado global del motor de animación

function inicializarDashboard() {
    const tbody = document.getElementById('tabla-matriz-body');
    const contenedorEscalera = document.getElementById('escalera-dinamica');
    const btnControl = document.getElementById('btn-control-flujo');
    
    if (!tbody || !contenedorEscalera || !btnControl) return;

    let htmlTabla = '';
    contenedorEscalera.innerHTML = ''; 

    datasetMatriz.forEach((item, index) => {
        // 1. Alimentar la tabla de auditoría con un ID identificable por fila
        htmlTabla += `
            <tr id="fila-red-${index}">
                <td class="font-monospace text-secondary">${item.sujetos}</td>
                <td><span class="badge badge-oro p-2 text-uppercase font-monospace">${item.beneficiario}</span></td>
                <td class="small text-light-emphasis">${item.recompensa}</td>
                <td class="fw-bold text-end font-monospace text-success">${item.acumulado}</td>
            </tr>
        `;

        // 2. Construir el peldaño
        const peldano = document.createElement('div');
        peldano.className = 'peldano-escalera p-3 text-white';
        peldano.style.background = paletaGradientes[index % paletaGradientes.length];
        
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
        
        // INTERACCIÓN DE CLIC: Resalta el peldaño, detiene la escalera y enfoca la tabla
        peldano.addEventListener('click', () => {
            gestionarSeleccionElemento(index);
        });

        contenedorEscalera.appendChild(peldano);

        let yInicial = index * DISTANCIA_ENTRE_PELDANOS;
        referenciasPeldanos.push({
            domElement: peldano,
            y: yInicial
        });
    });

    tbody.innerHTML = htmlTabla;

    // Configurar el Botón Play/Pausa de Bootstrap
    btnControl.addEventListener('click', alternarEstadoEscalera);

    // Arrancar bucle
    maquinariaEscalera();
}

function alternarEstadoEscalera() {
    const btnControl = document.getElementById('btn-control-flujo');
    escaleraEnMovimiento = !escaleraEnMovimiento;

    if (escaleraEnMovimiento) {
        btnControl.innerText = "⏸️ PAUSAR ESCALERA";
        btnControl.className = "btn btn-outline-warning fw-bold font-monospace shadow-sm";
        // Limpiar cualquier selección previa al reanudar la marcha
        removerTodasLasSelecciones();
    } else {
        btnControl.innerText = "▶️ REANUDAR ESCALERA";
        btnControl.className = "btn btn-success fw-bold font-monospace shadow-sm text-slate-900";
    }
}

function gestionarSeleccionElemento(indexSeleccionado) {
    // 1. Pausar la maquinaria de forma automática al hacer clic
    if (escaleraEnMovimiento) {
        alternarEstadoEscalera();
    }

    // 2. Limpiar focos anteriores
    removerTodasLasSelecciones();

    // 3. Aplicar neón al peldaño clicado
    referenciasPeldanos[indexSeleccionado].domElement.classList.add('peldano-seleccionado');

    // 4. Aplicar iluminante de enfoque a la fila correspondiente en la tabla
    const filaDestino = document.getElementById(`fila-red-${indexSeleccionado}`);
    if (filaDestino) {
        filaDestino.classList.add('fila-seleccionada');
        // Desplazar la tabla de forma suave hacia la fila si hay desbordamiento
        filaDestino.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function removerTodasLasSelecciones() {
    referenciasPeldanos.forEach(p => p.domElement.classList.remove('peldano-seleccionado'));
    const filas = document.querySelectorAll('#tabla-matriz-body tr');
    filas.forEach(f => f.classList.remove('fila-seleccionada'));
}

function maquinariaEscalera() {
    const alturaContenedorMax = 620;

    // Solo alterar las coordenadas físicas si la escalera está en modo Play
    if (escaleraEnMovimiento) {
        referenciasPeldanos.forEach((peldano) => {
            peldano.y -= VELOCIDAD;

            if (peldano.y <= -ALTO_PELDANO) {
                let coordenadaMasBaja = Math.max(...referenciasPeldanos.map(p => p.y));
                peldano.y = coordenadaMasBaja + DISTANCIA_ENTRE_PELDANOS;
            }
        });
    }

    // El renderizado de estilos gráficos se mantiene activo para que conserve su posición actual al pausarse
    referenciasPeldanos.forEach((peldano) => {
        let factorInclinacionDiagonal = (peldano.y / DISTANCIA_ENTRE_PELDANOS) * 16;
        let margenIzquierdoCalculado = Math.max(0, Math.min(220, factorInclinacionDiagonal));

        let opacidadDinamica = 1;
        if (peldano.y < 40) {
            opacidadDinamica = peldano.y / 40;
        } else if (peldano.y > (alturaContenedorMax - ALTO_PELDANO)) {
            opacidadDinamica = (alturaContenedorMax - peldano.y) / ALTO_PELDANO;
        }

        peldano.domElement.style.top = `${peldano.y}px`;
        peldano.domElement.style.marginLeft = `${margenIzquierdoCalculado}px`;
        peldano.domElement.style.opacity = Math.max(0, Math.min(1, opacidadDinamica));
    });

    requestAnimationFrame(maquinariaEscalera);
}

document.addEventListener('DOMContentLoaded', inicializarDashboard);

