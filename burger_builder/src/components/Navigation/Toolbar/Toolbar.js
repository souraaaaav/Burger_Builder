import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../../UI/Menu/Menu'

const Toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <Menu toggleMenu={props.toggleMenu}/>
        <nav className={classes.MobileOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar