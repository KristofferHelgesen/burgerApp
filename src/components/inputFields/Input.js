

import React from 'react'

const Input = (props) => {
    return (
        <div>
            <h1>{props.updateValue}</h1>
            <button onClick={props.change(props.updateValue,'add')}  >+</button>
            <button onClick={props.change(props.updateValue,'remove')} >-</button>
        </div>

    )
}

export default Input
