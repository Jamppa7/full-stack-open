import React from 'react'

const FilterForm = ({ filter, handleFilter }) => {
    return (
        <div>
            find countries: <input
                value={filter}
                onChange={handleFilter}
            />
        </div>
    )
}

export default FilterForm
