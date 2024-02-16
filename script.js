document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '72175e911f70b5793a1eae6a4f7f8f3b';
  const searchButton = document.getElementById('searchButton');

  // Mapeamento de códigos de condição climática para descrições mais amigáveis e emojis correspondentes
  const weatherConditions = {
    'clear': {
      description: 'Céu limpo',
      emoji: '☀️',
      backgroundColor: 'yellow',
      textColor: 'black'
    },
    'clouds': {
      description: 'Nublado',
      emoji: '☁️',
      backgroundColor: 'gray',
      textColor: 'white'
    },
    'rain': {
      description: 'Chuva',
      emoji: '🌧️',
      backgroundColor: 'blue',
      textColor: 'white'
    },
    'thunderstorm': {
      description: 'Tempestade',
      emoji: '⛈️',
      backgroundColor: 'blue',
      textColor: 'white'
    },
    'drizzle': {
      description: 'Chuvisco',
      emoji: '🌦️',
      backgroundColor: 'blue',
      textColor: 'white'
    },
    'snow': {
      description: 'Neve',
      emoji: '❄️',
      backgroundColor: 'white',
      textColor: 'black'
    },
    'mist': {
      description: 'Neblina',
      emoji: '🌫️',
      backgroundColor: 'lightgray',
      textColor: 'black'
    }
    // Adicione outras condições climáticas conforme necessário
  };

  searchButton.addEventListener('click', function() {
    const cityInput = document.getElementById('cityInput').value.trim(); // Remova espaços em branco antes e depois do texto
    if (cityInput) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na solicitação à API.');
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados recebidos:', data);
          if (data.cod === 200) {
            const temperature = data.main.temp;
            const conditionCode = data.weather[0].main.toLowerCase();
            const condition = weatherConditions[conditionCode] || { description: 'Desconhecido', emoji: '', backgroundColor: 'white', textColor: 'black' };
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `Temperatura: ${temperature}°C, Condição: ${condition.emoji} ${condition.description}`;
            document.body.style.backgroundColor = condition.backgroundColor;
            document.body.style.color = condition.textColor;
          } else {
            throw new Error('Cidade não encontrada ou problema na resposta da API.');
          }
        })
        .catch(error => {
          console.error('Erro ao obter dados meteorológicos:', error);
          const weatherDiv = document.getElementById('weather');
          weatherDiv.innerHTML = 'Erro ao obter dados meteorológicos';
        });
    } else {
      alert('Por favor, insira o nome da cidade.');
    }
  });
});
