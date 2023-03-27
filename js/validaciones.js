export function valida(input) {
  //Dataset lo que nosotros estamos obteniendo es la colección de todos los datas atribute
  //El punto tipo es para obtener el tipo de Input.
  const tipoDeInput = input.dataset.tipo;
  //Necesitamos por cada uno de los tipos de input o por el tipo de input, verificar si existe dentro de los validadores.
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  //este es para validar que el validity es true(quita clase y si es false la agrega)
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    //En caso de que si existe algún error, lo que quiero es mostrar mensaje de error llamando a esa funcion, para que se entienda mejor.
    //Esta funcion de mostrarMensaje de error su primer parametro es el tipo de input y el segundo el input.
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}
//Este arreglo nos ayudará a interceptar dependiendo del tipo de input, para cada tipo de errores, lo voy a recorrer.
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];
//Esto nos ayudará con los tipos de errores de cada uno de los inputs de nuestro formulario.
//Para cada tipo de error mostraremos un mensaje diferente.
const mensajesDeError = {
  //Tenemos primero al objeto del input del nombre.
  //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    //typeMissmatch hace referencia a que si es un correo electrónico.
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};

const validadores = {
  //Vemos que coincidan el nombre del tipo = nacimiento con la llave dentro de este objeto que es una arrow funcion.
  //Una función que va a recibir input y lo que va a hacer es mandar a llamar validarNacimiento.
  nacimiento: (input) => validarNacimiento(input),
};

//Esta funcion de mostrarMensaje de error su primer parametro es el tipo de input y el segundo el input.
function mostrarMensajeDeError(tipoDeInput, input) {
  //Tenemos un mensaje que es el que queremos decirle al usuario dependiendo de si el campo está vacío,
  let mensaje = "";
  //En este tipo de errores voy a recibir cada uno de los errores que está en el arreglo..
  tipoDeErrores.forEach((error) => {
    //Vamos a buscar con validity si dentro de nuestro input hay alguno de los errores del arreglo.
    if (input.validity[error]) {
      //Con esto vemos cuál tipo de Input y cual es el error específico
      console.log(tipoDeInput, error);
      //Con esto validamos si es que hay algun error.
      console.log(input.validity[error]);
      //Necesitamos ver cual es el tipo de Input que nos dió error y acceder a los mensajesDeError con sus valores.
      console.log(mensajesDeError[tipoDeInput][error]);
      // El mensaje va a ser igual a nuestro objeto donde están todos los mensajes de error para cada tipo de input.
      //luego entre corchetes, el tipo de input para poder acceder a si es nombre, email, password, nacimiento,  y por último el error.
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}
