import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { handleAdd, handleEdit } from '../../../actions/index'


 export default class AppFooter extends Component{
    render(){
        console.log(this)
        return(
            <footer>ffffffffffffff</footer>
        )
    }
}

// const mapStateToProps = (state) => ({
//     list: state.todos.list,
// })
// const mapDispatchToProps = {
//     // handleAdd: handleAdd,
//     // handleEdit: handleEdit
// }
// export default AppFooter = connect(mapStateToProps, mapDispatchToProps)(AppFooter);