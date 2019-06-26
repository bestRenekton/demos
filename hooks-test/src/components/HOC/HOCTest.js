import React from 'react'


function HOCTest(ComposeComponent){
    return class extends ComposeComponent{
        // componentDidMount() {//不能删除，否则app.js的componentDidMount执行两次
        //     console.log('hoc componentDidMount')
        // }
    
        render() {
            return (
                <ComposeComponent {...this.props} {...this.state} />
            )
        }
    }
}


export default HOCTest