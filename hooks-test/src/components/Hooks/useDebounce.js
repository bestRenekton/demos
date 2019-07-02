import {  useEffect, useRef } from 'react';


//使用
// const name = useInputValue('abc');
// const search = (e) => { console.log(e) }
// useDebounce(name.value, 500, search);
{/* <input type="text" {...name} /> */}

export default function useDebounce(value, delay, cb) {
    const timer = useRef();//计时器

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            timer.current = setTimeout(() => {
                cb(value);
            }, delay);

            // 如果value, delay改变了,或者卸载了，取消timeout 
            return () => {
                clearTimeout(timer.current);
            };
        }
    }, [value, delay]);
}
