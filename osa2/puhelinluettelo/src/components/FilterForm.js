import React from 'react'

const FilterForm = ({ filter, handleFilter }) => {
    return (
        <div>
            filter shown with: <input
                value={filter}
                onChange={handleFilter}
            />
        </div>
    )
}

export default FilterForm
