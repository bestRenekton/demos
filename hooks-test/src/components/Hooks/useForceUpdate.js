import { useReducer } from 'react';


//使用
//const foo=useForceUpdate();
//<div onClick={()=>{foo()}}>Basics</div>

export default function useForceUpdate() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    return forceUpdate
}
