const utils = {
  esVacio: function(dato) {
    return dato === "" || dato === null || typeof dato ===undefined; 
  }
}

module.exports = utils;