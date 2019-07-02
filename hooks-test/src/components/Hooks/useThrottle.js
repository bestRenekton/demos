import {  useEffect, useRef } from 'react';


//使用
// const name = useInputValue('abc');
// const search = (e) => { console.log(e) }
// useThrottle(name.value, 500, search);
{/* <input type="text" {...name} /> */ }

export default function useThrottle(value, delay, cb) {
    const timer = useRef();//计时器
    const canRun = useRef(true);//是否可以运行

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (!canRun.current) return;
            
            canRun.current = false;
            timer.current = setTimeout(() => {
                cb(value);
                canRun.current = true;
            }, delay);

            // 如果value, delay改变了,或者卸载了，取消timeout 
            // return () => {
            //     clearTimeout(timer.current);
            // };
        }
    }, [value, delay]);
}
