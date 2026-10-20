/**
 * Componente Visual Escalera Eléctrica - Matriz Cíclica de Oro
 * Renderiza dinámicamente los peldaños basados en la estructura HTML provista.
 */

const datosMatriz = [
    { aportantes: "Sujetos 1, 2, 3", beneficiario: "Sujeto 1", premio: "5g Oro + \$500", acumulado: "\$3,100", tipo: "etapa1" },
    { aportantes: "Sujetos 4, 5, 6", beneficiario: "Sujeto 2", premio: "5g Oro + \$500", acumulado: "\$3,100", tipo: "etapa1" },
    { aportantes: "Sujetos 7, 8, 9", beneficiario: "Sujeto 3", premio: "5g Oro + \$500", acumulado: "\$3,100", tipo: "etapa1" },
    { aportantes: "Sujetos 10, 11, 12", beneficiario: "Sujeto 4", premio: "5g Oro + \$500", acumulado: "\$3,100", tipo: "etapa1" },
    { aportantes: "Sujetos 13, 1, 2", beneficiario: "Sujeto 5", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 3, 4, 5", beneficiario: "Sujeto 6", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 6, 7, 8", beneficiario: "Sujeto 7", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 9, 10, 11", beneficiario: "Sujeto 8", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 12, 13, 1", beneficiario: "Sujeto 9", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 2, 3, 4", beneficiario: "Sujeto 10", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 5, 6, 7", beneficiario: "Sujeto 11", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 8, 9, 10", beneficiario: "Sujeto 12", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" },
    { aportantes: "Sujetos 11, 12, 1", beneficiario: "Sujeto 13", premio: "5g Oro + \$500", acumulado: "\$1,500", tipo: "etapa2" }
];

// Paleta de colores variados y vibrantes para diferenciar los peldaños
const coloresPeldanos = [
    "from-amber-600 to-yellow-500",   // Oro / Destacado
    "from-emerald-600 to-teal-500",   // Éxito / Alta Ganancia
    "from-indigo-600 to-blue-500",    // Fase Inicial
    "from-purple-600 to-fuchsia-500", // Ciclo Avanzado
    "from-rose-600 to-orange-500"     // Reingreso
];

function renderizarEscaleraElectrica(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // Limpiar contenedor e inyectar estilos base para la animación y forma de peldaños
    contenedor.innerHTML = "";
    contenedor.className = "flex flex-col space-y-3 relative p-4 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden";

    datosMatriz.forEach((item, index) => {
        // Seleccionar un color variado basado en el índice
        const colorGradiente = coloresPeldanos[index % coloresPeldanos.length];
        
        // Calcular el desplazamiento en cascada hacia la derecha (Efecto diagonal de Escalera)
        const margenIzquierdo = index * 24; 

        // Crear el elemento HTML del peldaño con Tailwind CSS
        const peldano = document.createElement("div");
        peldano.style.marginLeft = `${margenIzquierdo}px`;
        peldano.className = `flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-lg border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-r ${colorGradiente} text-white max-w-2xl group cursor-pointer`;
        
        // Estructura interna adaptada de tu tabla a formato tarjeta/peldaño responsivo
        peldano.innerHTML = `
            <div class="flex items-center space-x-4 w-full md:w-auto">
                <div class="bg-black/30 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-white/20">
                    ${index + 1}
                </div>
                <div>
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Base de Empuje</span>
                    <span class="font-medium text-sm">${item.aportantes}</span>
                </div>
            </div>

            <div class="flex items-center justify-between md:justify-end space-x-6 w-full md:w-auto mt-3 md:mt-0 border-t border-white/10 md:border-t-0 pt-2 md:pt-0">
                <div class="text-center md:text-right">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Beneficiario</span>
                    <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide shadow-sm inline-block mt-0.5">
                        👑 ${item.beneficiario}
                    </span>
                </div>
                
                <div class="text-center md:text-right">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Recompensa</span>
                    <span class="text-xs font-bold block mt-0.5">${item.premio}</span>
                </div>

                <div class="text-right">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Fondo Acumulado</span>
                    <span class="text-lg font-black font-mono drop-shadow-md text-yellow-200">${item.acumulado}</span>
                </div>
            </div>
        `;

        contenedor.appendChild(peldano);
    });
}

// Inicializar la escalera automáticamente si el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    // Busca un div con id="escalera-contenedor" en tu HTML principal
    renderizarEscaleraElectrica("escalera-contenedor");
});

