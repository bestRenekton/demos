import MyComponent from './HOC.js'


function Test(){

  let MyProps={
    name:"要变么"
  }
  return (<div>
     <MyComponent {...MyProps}/>
  </div>)
}
export default Test;