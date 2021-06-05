import React from 'react'
import LanguageList from './LanguageList'

const CountryData = ({ name, capital, population, languages, flag }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}<br></br>
            population {population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {languages.map(l =>
                    <LanguageList key={l.name} name={l.name} />
                )}
            </ul>
            <img border="0" alt="" src={flag} width="150" height="100"></img>
        </div>
    )
}

export default CountryData
