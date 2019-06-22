import React from 'react'


function HOCTest(ComposeComponent){
    return class extends ComposeComponent{
        componentDidMount() {
            console.log('hoc componentDidMount')
        }
    
        render() {
            return (
                <ComposeComponent {...this.props} {...this.state} />
            )
        }
    }
}


export default HOCTest