import React from 'react'
import classes from './Menu.module.css'
import burgerIcon from '../../../assets/images/burger-icon.png'

const Menu = props =>(

    <div className={classes.Menu} onClick={props.toggleMenu}>
        <img src={burgerIcon} alt="burger-logo"/>
    </div>
    
)
export default Menu