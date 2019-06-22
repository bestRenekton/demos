import React from 'react'
import { useRef, useState, useEffect, useCallback } from 'react';
import useDocumentTitle from './UseDocumentTitle'
import useInputValue from './UseInputValue'


export default function Hooks(props) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        console.log('componentDidmount')
        return () => {
            console.log('componentDidUnmount')
        }
    }, []);

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            console.log('componentDidUpdate')
        }
    });


    // useDocumentTitle('aaaa')
    let name = useInputValue('tom');
    return (
        <>
            <div onClick={() => { setNum(num + 1) }}>{num}</div>
            <input {...name} />
            <div>{props.a}</div>
        </>
    )
}