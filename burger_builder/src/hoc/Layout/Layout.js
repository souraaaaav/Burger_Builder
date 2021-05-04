import React,{Component} from 'react'
import Auxi from '../Auxi/Auxi'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    
    state = {
        showBackDrop:false
    }

    hideBackDropHandler=()=>{
        this.setState({
        showBackDrop:false     
        })
    }

    toggleMenuHandler=()=>{
      let currentShow=this.state.showBackDrop
      this.setState({
          showBackDrop: !currentShow
      })
    }
    
    render(){

        return(
            <Auxi>
                <Toolbar toggleMenu={this.toggleMenuHandler}/>
                <SideDrawer showAble={this.state.showBackDrop}
                 clicked={this.hideBackDropHandler} />
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}

export default Layout