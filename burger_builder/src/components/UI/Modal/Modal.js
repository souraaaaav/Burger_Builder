import React,{Component} from 'react'
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'
import Auxi from '../../../hoc/Auxi/Auxi'


class Modal extends Component{

  shouldComponentUpdate(nextProps,nexState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentDidUpdate(){

  }

  render(){
    return (
      <Auxi>
      <BackDrop show={this.props.show} clicked={this.props.clicked}/>
      <div className={classes.Modal}
        style={{
          transform: this.props.show?'translateY(0)':'translateY(-100vh)',
          opacity:this.props.show?'1':'0',
          background:this.props.bg,
          border:this.props.brdr,
          boxShadow:this.props.bxshd,
        }}
      >
          {this.props.children}
      </div>
  </ Auxi>
    )}
}

  export default Modal