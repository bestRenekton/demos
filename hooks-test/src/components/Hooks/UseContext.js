import React, { useContext } from 'react'



const context = React.createContext({ c: 3 });//给默认值，如果Son不在Fa中，则使用默认值
const Fa = ({ children }) => (
    <context.Provider value={{ a: 1, b: 2 }}>
        {children}
    </context.Provider>
)

// class Son extends Component {
//   static contextType = context  //contextType固定名称，不能修改
//   render() {
//     console.log(this)//context: {a: 1, b: 2},props:{}
//     return (
//       <p>{this.context.a}</p>
//     )
//   }
// }
const Son = (props) => {
    const value = useContext(context);

    return (
        <p>{value.a}</p>
    )
}

const Example = () => {
    return (
        <Fa>
            <Son />
        </Fa>
    );
};


export default Example