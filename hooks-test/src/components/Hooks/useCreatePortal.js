import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';


//使用
// export default function App() {
//     const ref = useRef();
//     const Model = (props) => {
//         return (
//             <div ref={ref}>model</div>
//         )
//     }

//     const Com = useCreatePortal(Model)
//     return (
//         <div>
//             <h1>11111</h1>
//             {Com}
//         </div>
//     );
// }


export default function useCreatePortal(Child) {
    const node = useRef(document.createElement('div'));
    useEffect(() => {
        document.body.appendChild(node.current)
        return () => {
            document.body.removeChild(node.current)
        }
    }, [])
    return (
        createPortal(
            <Child />,
            node.current
        )
    );
}
