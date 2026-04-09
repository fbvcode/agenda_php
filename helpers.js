
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



