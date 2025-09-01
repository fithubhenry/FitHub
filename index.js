
function laCajaDePandora(numero) {

  if (numero % 2 === 0) {
    return numero.toString(2);
  } else {
    return numero.toString(16);
  }
}

function xavierManzoco() {
    return {
        nombre: "Xavier Manzoco",
        edad: 29,
        nacionalidad: "Argentina"
    };
}
=======
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

