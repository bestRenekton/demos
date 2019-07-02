import  {useRef, useState, useEffect } from 'react';


//使用
// export default function App() {
//   const [hoverRef, isHovered] = useHover();
//   return (
//       <div ref={hoverRef}>
//           {isHovered ? '1111' : '222'}
//       </div>
//   );
// }


export default function useHover() {
    const [value, setValue] = useState(false);
  
    const ref = useRef(null);
  
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
  
    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener('mouseover', handleMouseOver);
          node.addEventListener('mouseout', handleMouseOut);
  
          return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
          };
        }
      },
      [ref.current] // 只有当ref改变时才会重新调用
    );
  
    return [ref, value];
  }
  
