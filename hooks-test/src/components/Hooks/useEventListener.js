import { useRef, useEffect } from 'react';


//使用
//const prevNum = UsePrevious(num);

export default function useEventListener(eventName, handler, element = global) {
    // 创建一个储存处理方法的ref
    const savedHandler = useRef();

    // 当处理函数改变的时候更新ref.current的方法
    // 这样可以使我们的总是获取到最新的处理函数
    // 并且不需要在它的effect依赖数组中传递
    // 并且避免有可能每次渲染重新引起effect方法
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // 确认是否支持addEventListener
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // 创建一个调用储存在ref中函数的事件监听
            const eventListener = event => savedHandler.current(event);
            
            // 添加事件监听
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // 当元素或者绑定事件改变时，重新运行
    );
};

