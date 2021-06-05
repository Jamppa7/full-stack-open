import React from 'react'
import weatherService from 'C:/FullStackOpen/osa2/maiden_tiedot/src/services/weather'

const WeatherData = ({ capital }) => {
    var temperature = ''
    var icons = []
    var windSpeed = ''
    var windDir = ''

    weatherService
        .getWeather(capital)
        .then(weather => temperature = weather.current.temperature,
            weather => icons = weather.current.icons,
            weather => windSpeed = weather.current.wind_speed,
            weather => windDir = weather.current.wind_dir
        )

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p><b>temperature:</b> {temperature} Celcius<br></br>
            {icons.map(icon =>
                <img border="0" alt="" src={icon} width="70" height="70"></img>
            )}<br></br>
            <b>wind:</b> {windSpeed} mph direction {windDir}</p>
        </div>
    )
}

export default WeatherData
