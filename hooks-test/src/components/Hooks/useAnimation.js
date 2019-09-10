import React, { useEffect, useState } from 'react'
import { Tween } from '../../public/js/tween'


//调用
//const animation = useAnimation(400, 100, 500, 'Linear', 2000, function (e) { console.log(e) });

const useAnimation = (
    from,//起始值
    to,//结束值
    duration,//持续时间
    easing = "Linear",//运动曲线
    delay = 0,//延迟
    callback//回调
) => {
    const [value, setValue] = useState(from);

    useEffect(() => {
        setTimeout(() => {
            //开始帧数
            let start = 0;
            // 需要总帧数
            const during = Math.ceil(duration / 17);//一般浏览器是每秒60帧,即1000/60~=17
            //获取变化函数
            let arrKeyTween = easing.split('.');
            let fnGetValue;
            if (arrKeyTween.length == 1) {
                fnGetValue = Tween[arrKeyTween[0]];
            } else if (arrKeyTween.length == 2) {
                fnGetValue = Tween[arrKeyTween[0]] && Tween[arrKeyTween[0]][arrKeyTween[1]];
            }

            const step = function () {
                // 当前的运动位置
                let newValue = fnGetValue(start, from, to - from, during);
                setValue(newValue);
                // 时间递增
                start++;
                // 如果还没有运动到位，继续
                if (start <= during) {
                    requestAnimationFrame(step);
                }

                callback && callback(newValue);
            };
            // 开始执行动画
            step();
        }, delay)

    }, [duration])

    return value
}

export default useAnimation