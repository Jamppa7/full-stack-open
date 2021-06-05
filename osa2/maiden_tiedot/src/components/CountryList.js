import React from 'react'

const CountryList = ({ name, show }) => {
    return (
        <div>
            {name} <button onClick={show}>show</button>
        </div>
    )
}

export default CountryList
