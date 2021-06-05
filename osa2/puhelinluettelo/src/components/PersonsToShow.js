import React from 'react'

const PersonsToShow = (persons, newFilter) => {
    return persons.filter(p => p.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
}

export default PersonsToShow
