import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.location.pathname + '/contact-data')
    }

    render() {
        if(this.props.ing===null||this.props.orderable===false){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ing} />
                {/* <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        orderable:state.burgerBuilder.orderable
    }
}
export default connect(mapStateToProps)(Checkout)