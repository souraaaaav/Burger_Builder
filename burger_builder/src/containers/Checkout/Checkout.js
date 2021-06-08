import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.location.pathname + '/contact-data')
    }

    render() {

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
        ing: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout)