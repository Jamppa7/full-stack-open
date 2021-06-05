import React from 'react'

const PersonForm = ({ add, name, handleName, number, handleNumber }) => {
    return (
        <form onSubmit={add}>
            <div>
                name: <input
                    value={name}
                    onChange={handleName}
                />
            </div>
            <div>
                number: <input
                    value={number}
                    onChange={handleNumber}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
