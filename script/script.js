// script.js

// Dataset unificado según el esquema operativo provisto
const datasetMatriz = [
    { sujetos: "Sujetos 1, 2, 3", beneficiario: "Sujeto 1", recompensa: "5g Oro + \$500", acumulado: "\$3,100", etapa: "E1" },
    { sujetos: "Sujetos 4, 5, 6", beneficiario: "Sujeto 2", recompensa: "5g Oro + \$500", acumulado: "\$3,100", etapa: "E1" },
    { sujetos: "Sujetos 7, 8, 9", beneficiario: "Sujeto 3", recompensa: "5g Oro + \$500", acumulado: "\$3,100", etapa: "E1" },
    { sujetos: "Sujetos 10, 11, 12", beneficiario: "Sujeto 4", recompensa: "5g Oro + \$500", acumulado: "\$3,100", etapa: "E1" },
    { sujetos: "Sujetos 13, 1, 2", beneficiario: "Sujeto 5", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 3, 4, 5", beneficiario: "Sujeto 6", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 6, 7, 8", beneficiario: "Sujeto 7", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 9, 10, 11", beneficiario: "Sujeto 8", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 12, 13, 1", beneficiario: "Sujeto 9", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 2, 3, 4", beneficiario: "Sujeto 10", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 5, 6, 7", beneficiario: "Sujeto 11", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 8, 9, 10", beneficiario: "Sujeto 12", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" },
    { sujetos: "Sujetos 11, 12, 1", beneficiario: "Sujeto 13", recompensa: "5g Oro + \$500", acumulado: "\$1,500", etapa: "E2" }
];

// Paleta de gradientes variados para diferenciar visualmente los peldaños
const paletaGradientes = [
    "linear-gradient(135deg, #b45309 0%, #d97706 100%)", // Ámbar
    "linear-gradient(135deg, #047857 0%, #10b981 100%)", // Esmeralda
    "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)", // Índigo
    "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)", // Púrpura
    "linear-gradient(135deg, #be123c 0%, #f43f5e 100%)"  // Carmín
];

function inicializarDashboard() {
    const tbody = document.getElementById('tabla-matriz-body');
    const contenedorEscalera = document.getElementById('escalera-dinamica');
    
    if (!tbody || !contenedorEscalera) return;

    let htmlTabla = '';
    contenedorEscalera.innerHTML = ''; // Limpiar contenedor

    datasetMatriz.forEach((item, index) => {
        // 1. Generar la fila correspondiente para la Tabla Bootstrap
        htmlTabla += `
            <tr>
                <td class="font-monospace text-secondary">${item.sujetos}</td>
                <td><span class="badge badge-oro p-2 text-uppercase font-monospace">${item.beneficiario}</span></td>
                <td class="small text-light-emphasis">${item.recompensa}</td>
                <td class="fw-bold text-end font-monospace text-success">${item.acumulado}</td>
            </tr>
        `;

        // 2. Crear y configurar la estructura tridimensional del peldaño
        const peldano = document.createElement('div');
        peldano.className = 'peldano-escalera p-3 text-white';
        
        // Asignación cromática indexada
        peldano.style.background = paletaGradientes[index % paletaGradientes.length];
        
        // Desplazamiento en cascada (Forma de escalera mecánica)
        const pxDesplazamiento = index * 18; 
        peldano.style.marginLeft = `${pxDesplazamiento}px`;

        peldano.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="font-monospace fw-bold bg-black bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center me-2 border border-white border-opacity-10" style="width: 24px; height: 24px; font-size: 0.75rem;">
                        ${index + 1}
                    </span>
                    <span class="fw-bold font-monospace tracking-wide">${item.beneficiario}</span>
                </div>
                <span class="badge bg-black bg-opacity-40 text-warning font-monospace">${item.acumulado}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-white border-opacity-10" style="font-size: 0.75rem;">
                <span class="text-white-50">⚡ ${item.sujetos}</span>
                <span class="text-white fw-medium">🎁 5g + $500</span>
            </div>
        `;
        
        contenedorEscalera.appendChild(peldano);
    });

    // Inyectar bloques a la tabla de auditoría
    tbody.innerHTML = htmlTabla;
}

// Iniciar renderizado una vez el árbol DOM se encuentre completamente estructurado
document.addEventListener('DOMContentLoaded', inicializarDashboard);
