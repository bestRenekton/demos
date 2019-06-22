import React from 'react'
import { useRef, useState, useEffect, useCallback } from 'react';

// 使用
export default function UseEventListenerHook() {
  // 用来储存鼠标位置的State
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // 利用useCallback来处理回调
  // ... 这里依赖将不会发生改变
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // 更新坐标
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  // 使用自定义的hook添加事件
  useEventListener('mousemove', handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

// Hook
function useEventListener(eventName, handler, element = global) {
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

      // 在cleanup的回调中，清除事件监听
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // 当元素或者绑定事件改变时，重新运行
  );
};
