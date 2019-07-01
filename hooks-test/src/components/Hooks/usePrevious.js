import { useRef, useEffect } from 'react';


//使用
//const prevNum = UsePrevious(num);

export default function usePrevious(data) {
    const ref = useRef();
    useEffect(() => {
        ref.current = data;
    })
    return ref.current
}
