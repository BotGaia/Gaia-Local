module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/local',
        parameters: [
          {
            name: 'address',
            type: 'string',
          },
        ],
        description: 'Recebe o nome de um local e retorna as coordenadas do local informado',
      },
      {
        type: 'GET',
        endpoint: '/listLocales',
        parameters: [
          {
            name: 'address',
            type: 'string',
          },
        ],
        description: 'Recebe o nome de um local e retorna uma lista com os possíveis locais',
      },
    ];

    return endpoints;
  },
};
