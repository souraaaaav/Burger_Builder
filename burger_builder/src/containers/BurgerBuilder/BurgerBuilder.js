import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSumary/OrderSumary'
import axios from '../../axios-order'
import Loader from '../../components/UI/Loader/Loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {

        this.props.onInitIngredients()
        this.props.onInitPurchase()
    }

    purchaseHandler = (ingredients) => {
        let sumIngredients = 0
        for (let i in ingredients) {
            sumIngredients += ingredients[i]
        }
        return sumIngredients > 0
    }

    orderHandler = () => {
        this.props.onBurgerPurchase()
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseSuccessHandler = () => {
        
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = { ...this.props.ing }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>ingredients cant be loaded</p> : <Loader />

        if (this.props.ing) {
            burger = (
                <Auxi>
                    <Burger
                        ingredient={this.props.ing}
                    />
                    <BuildControls
                        moreIngredient={this.props.onAddIngredient}
                        lessIngredient={this.props.onRemoveIngredient}
                        disable={disabledInfo}
                        price={this.props.price}
                        isAuthenticated={this.props.isAuthenticated}
                        orderDisability={!this.purchaseHandler(this.props.ing)}
                        ordered={this.orderHandler}
                    />
                </Auxi>
            )

            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseSuccess={this.purchaseSuccessHandler} />

        }

        return (
            <Auxi>
                <Modal show={this.state.purchasing}
                    clicked={this.purchaseCancelHandler}
                    bg={this.state.loading ? 'rgba(76, 175, 80, 0)' : 'white'}
                    brdr={this.state.loading ? 'none' : '1px solid #ccc'}
                    bxshd={this.state.loading ? '0px 0px 0px 0px' : ' 5px solid hsl(0, 0%, 40%)'}
                >
                    {orderSummary}
                </Modal>

                {burger}

            </Auxi>
        )
    }

}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngedients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onBurgerPurchase: () => dispatch(burgerBuilderActions.burgerPurchasable()),
        onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))