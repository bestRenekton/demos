import { useEffect, useRef } from 'react';


//使用
//const Counter = React.memo(props => {
//    useWhyDidYouUpdate('Counter', props);
//    return <div style={props.style}>{props.count}</div>;
//});
export default function useWhyDidYouUpdate(name, props) {
    // 获得一个可变的kef对象，我们可以用来存储props并且在下一次hook运行的时候进行比较
    const previousProps = useRef();

    useEffect(() => {
        if (previousProps.current) {
            // 获取改变前后所有的props的key值
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            // 使用这个对象去跟踪改变的props
            const changesObj = {};
            // 通过key值进行循环
            allKeys.forEach(key => {
                // 判断改变前的值是否和当前的一致
                if (previousProps.current[key] !== props[key]) {
                    // 将prop添加到用来追踪的对象中
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };
                }
            });

            // 如果改变的props不为空，则输出到控制台
            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }

        // 最后将当前的props值保存在previousProps中，以供下一次hook进行的时候使用
        previousProps.current = props;
    });
}

