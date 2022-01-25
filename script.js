let weather = {
  apiKey: '476166436ffc5dbdb5910a4d632ce40a',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&lang=pt_br&appid=' +
        this.apiKey
    )
      .then(response => {
        if (!response.ok) {
          alert('Nenhum clima encontrado.')
          throw new Error('Nenhum clima encontrado.')
        }
        return response.json()
      })
      .then(data => this.displayWeather(data))
  },
  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
    document.querySelector('.city').innerText = 'Clima em ' + name
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png'
    document.querySelector('.description').innerText = description
    document.querySelector('.temp').innerText = temp + '°C'
    document.querySelector('.humidity').innerText =
      'Humidade: ' + humidity + '%'
    document.querySelector('.wind').innerText = 'Vento: ' + speed + ' km/h'
    document.querySelector('.weather').classList.remove('loading')
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')"
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value)
  }
}

document.querySelector('.search button').addEventListener('click', function () {
  weather.search()
})

document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search()
    }
  })

weather.fetchWeather('Soledade')
