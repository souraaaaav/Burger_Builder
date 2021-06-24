import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error,
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{

        dispatch(purchaseBurgerStart())

        axios.post('/orders.json?auth='+token, orderData)
        .then(res => {
            dispatch(purchaseBurgerSucces(res.data.name,orderData))
            // if (res.status === 200) {
            //     alert('successfully purchased')
            //     window.location.href="/"
            // }


        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
            // alert('Something Went Wrong')

        })
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDERS_START,
    }
 }

export const fetchOrdersSuccess=(orderInfo)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orderInfo:orderInfo
    }
}

export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}


export const fetchOrders=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json'+queryParams)
        .then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(err => {
           dispatch(fetchOrdersFail(err))
        })
    }
}