import { useState, useCallback } from 'react';


//使用
//    const [rect, ref] = useClientRect();
//    <h1 ref={ref}>Hello, world</h1>
//    {rect !== null &&
//      <h2>The above header is {Math.round(rect.height)}px tall</h2>
//    }

export default function useClientRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}
