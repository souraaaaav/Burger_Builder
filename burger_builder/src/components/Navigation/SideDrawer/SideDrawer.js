import  React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Auxi from '../../../hoc/Auxi/Auxi'

const SideDrawer= props =>{

    let sideDrawerClass=[classes.SideDrawer,classes.Close]
    if(props.showAble){
        sideDrawerClass=[classes.SideDrawer,classes.Open]
    }

    return(
        <Auxi>
            <BackDrop show={props.showAble} clicked={props.clicked}/>
            <div className={sideDrawerClass.join(' ')}>
                <Logo height='11%' marginBottom='18px' clicked={props.clicked} />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxi>
    )
}

export default SideDrawer