import { useState, useEffect } from 'react'
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Panel = ({ country }) => {

  const [result, setResult] = useState(null)

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country["latlng"][0]}&lon=${country["latlng"][1]}&appid=${api_key}`

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResult(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country["name"]["common"]}</h1>

      capital {country["capital"]} <br />
      area {country["area"]} <br />

      <h3>languages:</h3>
      <ul>
        {
          Object.values(country["languages"]).map(language =>
            <li>{language}</li>
          )
        }
      </ul>

      <img src={`${country["flags"]["png"]}`} width={200} alt="Country Flag" />

      <h2>Weather in {country["capital"]}</h2>

      temperature {result && result["main"]["temp"]} Celcius <br />
      {
        result && <img src={`https://openweathermap.org/img/wn/${result["weather"][0]["icon"]}@2x.png`} alt="Weather Icon" />
      }
      <br />

      wind {result && result["wind"]["speed"]} m/s
    </div>
  )
}

const App = () => {

  const [countries, setContries] = useState("")
  const [message, setMessage] = useState("")

  // Fetching Country Name from input
  const handleFetchCountry = (event) => {
    setContries(event.target.value)
  }

  const showDetails = (country) => {
    setMessage(<Panel country={country} />)
  }

  // Fetch Data everytime user change input
  useEffect(() => {
    if (countries) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countries}`)
        .then(response => {
          if (response.data.length > 10) {
            setMessage("Too many matches, specify another filter")
          }
          // If more than one country, and less than 10 countries, show the name lists
          else if (response.data.length !== 1) {
            setMessage(
              response.data.map(country => {
                return (
                  <div>
                    {country["name"]["common"]} <button onClick={() => showDetails(country)}>show</button>
                  </div>
                )
              })
            )
          }
          else {
            // Retrieve the only country
            showDetails(response.data[0])
          }
        })
        .catch(error => {
          setMessage("No country found")
        })
    }

  }, [countries])

  return (

    <div>
      Find countries <input onChange={handleFetchCountry} value={countries} /><br />

      {message}
    </div>

  )
}

export default App