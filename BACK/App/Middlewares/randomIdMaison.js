let randomId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  // Retourner un id de format 'aaa-aaa-aaa-aaa'
  return s4();
};

// Exporter les fonctions pour les rendre disponibles dans d'autres fichiers
module.exports = {
  randomId,
};
