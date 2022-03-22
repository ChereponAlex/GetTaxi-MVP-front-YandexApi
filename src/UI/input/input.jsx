import React from 'react'

export const Input = ({setinputvalue, inputValue}) => {

    const handleInput = (e) => {
      
        setinputvalue(e.target.value)
    }

    return (
        <input 
        type="text" 
        placeholder="Улица, номер дома" 
        onChange={handleInput} 
        value={inputValue} 
        autoFocus/>
    )
}
