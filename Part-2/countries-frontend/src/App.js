import { useState } from 'react'

import DetailedCountry from './components/DetailedCountry'

const MainBoard = ({ countries }) => {
    console.log(countries)
    if (countries.length == 0) {
        return <p>no match country</p>
    } else if (countries.length > 10) {
        return <p>too many matches, specify another filter</p>
    } else if (countries.length == 1) {
        return DetailedCountry(countries[0])
    } else {
        return <ul>{countries.map(country => (<li key={country.ccn3}>{country.name.common}</li>))}</ul>
    }
}

const App = ({ countries }) => {
    const [countriesFound, setCountriesFound] = useState([])
    const updateCountriesFound = event => {
        const searchWord = event.target.value
        console.log("search word: ", searchWord)
        setCountriesFound(countries.filter(country => country.name.common.includes(searchWord)))
    }
    return (
        <div>
            find countries <input onChange={updateCountriesFound}></input>
            <MainBoard countries={countriesFound}></MainBoard>
        </div>
    )
}

export default App
