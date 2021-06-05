import React from 'react'

const CountriesToShow = (countries, newFilter) => {
    return countries.filter(p =>
        p.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
}

export default CountriesToShow
