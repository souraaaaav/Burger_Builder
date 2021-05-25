import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxi from '../Auxi/Auxi'

const withErrorHandler = (WrappedComponent,axios) =>{
    return class Error extends Component {
        
        state={
            error:null
        }


       
        componentWillMount(){
            
            axios.interceptors.request.use(null,req=>{
                this.setState({error:null})
                return req
            })
            
            axios.interceptors.response.use(res=>res,error=>{
                    this.setState({error:error})
                })
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null})
        }

        render(){
            console.log('in error')
        return (
            <Auxi>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmedHandler}
                    >
                       { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
            </Auxi>
            )
        }
    }
}

export default withErrorHandler