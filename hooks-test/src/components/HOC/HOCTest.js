import React from 'react'


function HOCTest(ComposeComponent){
    return class extends ComposeComponent{
        render() {
            return (
                <ComposeComponent {...this.props} {...this.state} />
            )
        }
    }
}


export default HOCTest