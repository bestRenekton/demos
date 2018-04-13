import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.scss'


export default class AppHeader extends Component{
    render(){
        return(
            <div className="nav">
                <NavLink to="/" activeClassName="selected">home</NavLink>
                <NavLink to="/about" activeClassName="selected">about</NavLink>
                <NavLink to="/admin" activeClassName="selected">login</NavLink>
            </div>
        )
    }
}