import React from 'react'
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props)=>(
    <div className={classes.Logo} onClick={props.clicked}
     style={{height:props.height,marginBottom:props.marginBottom}}>
        <img src={burgerLogo} alt="burger-logo"/>
    </div>
)

export default Logo