<?php
function normalizarTextoMayusculas(string $texto): string {
    return trim(mb_strtoupper($texto, 'UTF-8'));
}

function normalizarTextoMinusculas(string $texto): string {
    return trim(mb_strtolower($texto, 'UTF-8'));
}


function normalizarTelefono(string $telefono): string {
    return preg_replace('/[\s()-]/', '', trim($telefono));
}

?>