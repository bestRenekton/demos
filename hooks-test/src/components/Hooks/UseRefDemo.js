import React, { useRef, useState, useCallback, useDebugValue } from 'react';

// export default function UseRefDemo(props) {
//     const Ref = useRef(null);
//     const Focus = () => {
//         Ref.current.focus();
//     }
//     return (
//         <>
//             <input type="text" ref={Ref} />
//             <button onClick={Focus}>focus</button>
//         </>
//     )
// }

export default function MeasureExample() {
    const [height, setHeight] = useState(0);
    const [txt, setTxt] = useState('111');
    // const measuredRef = useRef(null);
    const measuredRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    });
    return (
        <>
            <h1 ref={measuredRef}>{txt}</h1>
            <button onClick={() => { setTxt('的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风的撒风飒风') }}>1111</button>
            <h2>The above header is {Math.round(height)}px tall</h2>
        </>
    );
}


