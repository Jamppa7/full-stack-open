import axios from 'axios'

const baseUrl = 'http://api.weatherstack.com/current'

const getWeather = capital => {
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital
  }

  const request = axios.get(baseUrl, { params })
  return request.then(response => response.data)
}

export default { getWeather }
