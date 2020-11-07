import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import 'materialize-css'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return(
        <nav>
    <div className="nav-wrapper blue darken-1">
      <span class="brand-logo">сокращение ссылок</span>
      <ul id="nav-mobile" class="right ">
        <li><NavLink to="/create">создать</NavLink></li>
        <li><NavLink to="/links">ссылки</NavLink></li>
        <li><a href="/" onClick={logoutHandler}>выйти</a></li>
      </ul>
    </div>
  </nav>
    )
}