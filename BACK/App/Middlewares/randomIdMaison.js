const randomId = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  // Retourner un id de format 'aaaa'
  return s4();
};

module.exports = {
  randomId,
};
