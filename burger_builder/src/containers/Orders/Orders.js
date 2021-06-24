import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as order from '../../store/actions/index'
import Loader from '../../components/UI/Loader/Loader'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }

    render() {
     
        let order = <Loader />
        if (this.props.loading === false && this.props.orders.length!==0) {
            return order = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={order.price} />
            ))
        }

        else if(this.props.loading === false && this.props.orders.length===0){
            return order=<h1 style={{textAlign:"center"}}>No order Found</h1>
        }

        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(order.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios))