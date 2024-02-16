const fetchToken = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    console.error('Erreur lors de la requête sécurisée:', response.statusText);
    return null;
  } catch (error) {
    console.error('Erreur lors de la requête sécurisée:', error);
    return null;
  }
};

export default fetchToken;
