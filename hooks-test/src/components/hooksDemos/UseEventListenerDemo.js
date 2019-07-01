import React, { useRef, useState, useEffect, useCallback } from 'react';
import useEventListener from '../Hooks/useEventListener'


// 使用
export default function UseEventListenerDemo() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // 利用useCallback来处理回调
  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );
  // const handler = ({ clientX, clientY }) => {
  //   setCoords({ x: clientX, y: clientY });
  // };

  // 使用自定义的hook添加事件
  useEventListener('mousemove', handler);

  return (
    <>
      <h1>
        The mouse position is ({coords.x}, {coords.y})
      </h1>
    </>
  );
}
