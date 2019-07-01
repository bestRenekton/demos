import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { useInputValue, useThrottle } from '../Hooks/index'



export default function App() {
    const name = useInputValue('abc');
    const search = (e) => { console.log(e) }
    useThrottle(name.value, 500, search);


    return (
        <div>
            <input type="text" {...name} />
        </div>
    );
}

