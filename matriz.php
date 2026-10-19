    ['tipo' => 'aporte', 'usuario' => 'Usuario 9', 'monto' => 1500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 3'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 10', 'monto' => 1500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 11', 'monto' => 1500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 12', 'monto' => 1500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 4']
];

$movimientosEtapa2 = [
    ['tipo' => 'aporte', 'usuario' => 'Usuario 13', 'monto' => 1500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 1', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 2', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 5'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 3', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 4', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 5', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 6'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 6', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 7', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 8', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 7'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 9', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 10', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 11', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 8'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 12', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 13', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 1', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 9'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 2', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 3', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 4', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 10'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 5', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 6', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 7', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 11'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 8', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 9', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 10', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 12'],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 11', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 12', 'monto' => 500],
    ['tipo' => 'aporte', 'usuario' => 'Usuario 1', 'monto' => 500],
    ['tipo' => 'premio', 'usuario' => 'Usuario 13']
];

// Variables globales de auditoría
$cajaEfectivo = 0;
$totalIngresosBrutos = 0;
$totalGramosOro = 0;
$saldosAFavor = [];

// Función procesadora de flujos
function procesarEtapa($movimientos, &$cajaEfectivo, &$totalIngresosBrutos, &$totalGramosOro, &$saldosAFavor) {
    $historialProcesado = [];
    foreach ($movimientos as $mov) {
        if ($mov['tipo'] === 'aporte') {
            $cajaEfectivo += $mov['monto'];
            $totalIngresosBrutos += $mov['monto'];
            $historialProcesado[] = [
                'tipo' => 'aporte',
                'detalle' => "<b>{$mov['usuario']}</b> aplica aporte al sistema",
                'monto' => $mov['monto']
            ];
        } elseif ($mov['tipo'] === 'premio') {
            $totalGramosOro += 5;
            $cajaEfectivo -= VALOR_ORO_5G;
            $saldosAFavor[$mov['usuario']] = ($saldosAFavor[$mov['usuario']] || 0) + 500;
            $historialProcesado[] = [
                'tipo' => 'premio',
                'detalle' => "🏆 <b>{$mov['usuario']}</b> completa ciclo (5g Oro)",
                'monto' => -VALOR_ORO_5G,
                'retorno' => 500
            ];
        }
    }
    return $historialProcesado;
}

// Ejecutar Cálculos de ambas etapas de forma acumulativa
$logE1 = procesarEtapa($movimientosEtapa1, $cajaEfectivo, $totalIngresosBrutos, $totalGramosOro, $saldosAFavor);
$cajaAlFinEtapa1 = $cajaEfectivo;

$logE2 = procesarEtapa($movimientosEtapa2, $cajaEfectivo, $totalIngresosBrutos, $totalGramosOro, $saldosAFavor);

// Construir Respuesta Consolidada
echo json_encode([
    'totales' => [
        'ingresosBrutos' => $totalIngresosBrutos,
        'gramosOro' => $totalGramosOro,
        'costoOro' => $totalGramosOro * 180,
        'saldosAFavor' => array_sum($saldosAFavor),
        'cajaNetaFinal' => $cajaEfectivo,
        'cajaSubtotalE1' => $cajaAlFinEtapa1
    ],
    'etapa1' => $logE1,
    'etapa2' => $logE2
]);
?>
