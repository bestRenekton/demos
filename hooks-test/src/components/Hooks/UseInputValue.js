import { useState, useCallback } from 'react';


//使用
//let name = useInputValue("Jamie");
// name = { value: 'Jamie', onChange: [Function] }
//return <input {...name} />;

export default function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback(function (event) {
        setValue(event.currentTarget.value);
    }, []);

    return {
        value,
        onChange
    };
}
