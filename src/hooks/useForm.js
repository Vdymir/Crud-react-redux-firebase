import { useState } from 'react';

export const useForm = (initialState = {})=>{

    const [values, setInput] = useState(initialState)

    const reset = (newValue = initialState)=>{
        setInput(newValue);
    }

    const handleInputChange = ({target})=>{
        setInput({
            ...values,
            [target.name] : target.value
        });
    }
   

    return [values, handleInputChange, reset];
}