import React, { Component } from 'react'
import Auxi from '../Auxi/Auxi'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        showBackDrop: false
    }

    hideBackDropHandler = () => {
        this.setState({
            showBackDrop: false
        })
    }

    toggleMenuHandler = () => {
        let currentShow = this.state.showBackDrop
        this.setState({
            showBackDrop: !currentShow
        })
    }

    render() {

        return (
            <Auxi>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    toggleMenu={this.toggleMenuHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    showAble={this.state.showBackDrop}
                    clicked={this.hideBackDropHandler} />
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)