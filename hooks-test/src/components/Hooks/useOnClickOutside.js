import {  useEffect } from 'react';


//使用
// export default function App() {
//     const [isShow, setIsShow] = useState(false);
//     const ref = useRef();
//     const Model = (props) => {
//         return (
//             <div ref={ref} style={{ background: '#999', position: 'fixed', bottom: 0, left: 0, width: '100%', height: 100 }}>model</div>
//         )
//     }
//     const Com = useCreatePortal(Model)
//     // useOnClickOutside(ref, () => setIsShow(false));
//     //通过useCallback包裹起来然后再传入hook中。从而不是每次都是一个新函数了
//     useOnClickOutside(ref,useCallback(() => setIsShow(false),[setIsShow]) );

//     return (
//         <div>
//             <div>
//                 <h1 onClick={() => { setIsShow(true) }}>11111</h1>
//                 {!isShow ? null : Com}
//             </div>
//         </div>
//     );
// }



export default function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // 元素内点击不做任何事
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
  
          handler(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      // 将ref和处理函数添加到effect的依赖数组中
      // 值得注意的一点是，因为在每一次render中被传入的处理方法是一个新函数，这将会导致effect的callback和cleanup每次render时被1调用。
      // 这个问题也不大，你可以将处理函数通过useCallback包裹起来然后再传入hook中。
      //useOnClickOutside(ref,useCallback(() => setIsShow(false),[setIsShow]) );
      [ref, handler]
    );
  }
  