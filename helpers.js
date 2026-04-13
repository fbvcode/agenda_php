
//Función para pasar el texto a mayúsculas NORMALIZAR
export function normalizarTextoMayusculas(texto) {
  return texto.trim().toLocaleUpperCase("es-ES");
}

//Función para pasar el texto a minúsculas NORMALIZAR
export function normalizarTextoMinusculas(email) {
  return email.trim().toLowerCase();
}

//Función para quitar espacios, guiones y paréntesis del número telefónico NORMALIZAR
export function normalizarTelefono(telefono) {
  return telefono.trim().replace(/[\s()-]/g, "");
}

//Función para validar números de teléfono VALIDAR
export function telefonoValido(telefono) {
  const regex = /^(\+?\d{9,15})$/;
  return regex.test(telefono);
}

//Función para validar email VALIDAR
export function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


//Función para mostrar el teléfono con formato
export function formatearTelefono(telefono) {
  // Por si acaso, quitamos espacios
  const limpio = telefono.replace(/\s+/g, "");

  // Si tiene 9 números o menos → todo de 3 en 3
  if (limpio.length <= 9) {
    return limpio.replace(/(\d{3})(?=\d)/g, "$1 ");
  }

  // Si tiene más de 9 números:
  // separamos prefijo y número principal
  const prefijo = limpio.slice(0, limpio.length - 9);
  const numero = limpio.slice(-9);

  // Formateamos:
  // prefijo → de 2 en 2
  const prefijoFormateado = prefijo.replace(/(\d{2})(?=\d)/g, "$1 ");

  // número → de 3 en 3
  const numeroFormateado = numero.replace(/(\d{3})(?=\d)/g, "$1 ");

  return `${prefijoFormateado} ${numeroFormateado}`.trim();
}


