import { useState, useEffect } from 'react';


//使用
// const animation1 = useAnimation('cubic', 600, 0);
// <Ball
//     innerStyle={{
//         marginTop: animation1 * 200 - 100
//     }}
// />

export default function useAnimation(
    easingName = 'linear',
    duration = 500,
    delay = 0
) {
    // useAnimationTimer在我们给定的时间内在每一帧调用useState，尽可能的使动画更加的流畅
    const elapsed = useAnimationTimer(duration, delay);
    // 在0-1的时间范围内指定持续时间的总量
    const n = Math.min(1, elapsed / duration);
    // 根据我们指定的缓动函数返回修改后的值
    return easing[easingName](n);
}

// 一些缓动函数的地址:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// 在这里硬编码或者引入依赖
const easing = {
    linear: n => n,
    quadratic: (t) => t * (-(t * t) * t + 4 * t * t - 6 * t + 4),
    cubic: (t) => t * (4 * t * t - 9 * t + 6),
    // Overshoots over 1 multiple times - wiggles around 1.
    elastic: (t) => t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15),
    // Accelerating from zero velocity
    inQuad: (t) => t * t,
    // Decelerating to zero velocity
    outQuad: (t) => t * (2 - t),
    // Acceleration until halfway, then deceleration
    inOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // Accelerating from zero velocity
    inCubic: (t) => t * t * t,
    // Decelerating to zero velocity
    outCubic: (t) => (--t) * t * t + 1,
    // Acceleration until halfway, then deceleration
    inOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // Accelerating from zero velocity
    inQuart: (t) => t * t * t * t,
    // Decelerating to zero velocity
    outQuart: (t) => 1 - (--t) * t * t * t,
    // Acceleration until halfway, then deceleration
    inOutQuart: (t) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    // Accelerating from zero velocity
    inQuint: (t) => t * t * t * t * t,
    // Decelerating to zero velocity
    outQuint: (t) => 1 + (--t) * t * t * t * t,
    // Acceleration until halfway, then deceleration
    inOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
    // Accelerating from zero velocity
    inSine: (t) => -Math.cos(t * (Math.PI / 2)) + 1,
    // Decelerating to zero velocity
    outSine: (t) => Math.sin(t * (Math.PI / 2)),
    // Accelerating until halfway, then decelerating
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    // Exponential accelerating from zero velocity
    inExpo: (t) => Math.pow(2, 10 * (t - 1)),
    // Exponential decelerating to zero velocity
    outExpo: (t) => -Math.pow(2, -10 * t) + 1,
    // Exponential accelerating until halfway, then decelerating
    inOutExpo: (t) => {
        t /= .5;
        if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
        t--;
        return (-Math.pow(2, -10 * t) + 2) / 2;
    },
    // Circular accelerating from zero velocity
    inCirc: (t) => -Math.sqrt(1 - t * t) + 1,
    // Circular decelerating to zero velocity Moves VERY fast at the beginning and
    // then quickly slows down in the middle. This tween can actually be used
    // in continuous transitions where target value changes all the time,
    // because of the very quick start, it hides the jitter between target value changes.
    outCirc: (t) => Math.sqrt(1 - (t = t - 1) * t),
    // Circular acceleration until halfway, then deceleration
    inOutCirc: (t) => {
        t /= .5;
        if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
        t -= 2;
        return (Math.sqrt(1 - t * t) + 1) / 2;
    }
};

function useAnimationTimer(duration, delay) {
    const [elapsed, setTime] = useState(0);

    useEffect(
        () => {
            let animationFrame, timerStop, start;

            // 在每一帧动画所要执行的函数
            function onFrame() {
                setTime(Date.now() - start);
                loop();
            }

            // 在下一个帧上调用onFrame()
            function loop() {
                animationFrame = requestAnimationFrame(onFrame);
            }

            function onStart() {
                // 设置一个timeout当持续时间超过时停止
                timerStop = setTimeout(() => {
                    cancelAnimationFrame(animationFrame);
                    setTime(Date.now() - start);
                }, duration);

                // 开始循环
                start = Date.now();
                loop();
            }

            // 在指定的延迟后执行(defaults to 0)
            const timerDelay = setTimeout(onStart, delay);

            // Clean things up
            return () => {
                clearTimeout(timerStop);
                clearTimeout(timerDelay);
                cancelAnimationFrame(animationFrame);
            };
        },
        [duration, delay] // 只有当持续时间和延迟改变时重新运行
    );

    return elapsed;
}

