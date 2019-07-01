import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';


//使用
// const Model = (props) => {
//     return (
//         <div>model</div>
//     )
// }

// export default function App() {
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
        <div>
            {
                createPortal(
                    <Child />,
                    node.current
                )
            }
        </div>
    );
}
