function laCajaDePandora(numero) {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    return "El parámetro debe ser un número entero";
  }
  if (num % 2 === 0) {
    return num.toString(2);
  } else {
    return num.toString(16);
  }
}

function matias() {
  return {
    nombre: "matias",
    edad: "33",
    nacionalidad: "argentino",
  };
}
