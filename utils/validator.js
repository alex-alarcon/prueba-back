const utils = require('./utils');

const validar = data => {
  const camposObligatorios = ['nombre', 'email', 'celular', 'edad'];
  const faltanCampos = datosOblidatorios(camposObligatorios, data);
  if (faltanCampos instanceof Error) {
    return faltanCampos;
  }

  const esNombreValido = nombreValido(data.nombre);
  if (esNombreValido instanceof Error) {
    return esNombreValido;
  }

  const esEmailValido = emailValido(data.email);
  if (esEmailValido instanceof Error) {
    return esEmailValido;
  }

  const esCelularValido = celularValido(data.celular);
  if (esCelularValido instanceof Error) {
    return esCelularValido;
  }

  const esEdadValida = edadValida(data.edad);
  if (esEdadValida instanceof Error) {
    return esEdadValida;
  }
}

const datosOblidatorios = (listaObligatorios, data) => {
  const faltantes = listaObligatorios.filter(campo => !(campo in data));

  if (faltantes.length > 0) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `Faltan los siguientes campos: ${JSON.stringify(faltantes)}`;
    return error;
  }  
}

const nombreValido = nombre => {
  if (utils.esVacio(nombre)) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El nombre no puede estar vacio`;
    return error;
  }

  const regexp = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/g;
  const esValido = regexp.test(nombre);

  if (!esValido) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El nombre: ${nombre}, no es válido`;
    return error;
  }
}

const emailValido = email => {
  if (utils.esVacio(email)) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El email no puede estar vacio`;
    return error;
  }

  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const esValido = regexp.test(email);

  if (!esValido) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El email: ${email}, no es válido`;
    return error;
  }
}

const celularValido = celular => {
  if (utils.esVacio(celular)) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El celular no puede estar vacio`;
    return error;
  }
}

const edadValida = edad => {
  if (!Number.isInteger(edad)) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `El valor: ${edad}, no es número válido`;
    return error
  }

  const esEdadValida = edad >= 18 && edad <= 100;
  if (!esEdadValida) {
    const error = new Error();
    error.statusCode = 400;
    error.message = `No cumple con el rango de edad`;
    return error
  }
}

module.exports = validar;