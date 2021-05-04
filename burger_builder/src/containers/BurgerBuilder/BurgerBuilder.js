import React, { Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSumary/OrderSumary'

const burger_price={
    salad:40,
    meat:130,
    cheese:60,
    bacon:40
}

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0,       
        },
        totalPrice:40,
        purchasable:false,
        purchasing:false,
    }

    purchaseHandler=(ingredients)=>{
        let sumIngredients=0
        for (let i in ingredients){
            sumIngredients+=ingredients[i]
        }        
        this.setState({purchasable:sumIngredients>0})
    }

    addIngredientHandler = (type) =>{
        const oldCounts=this.state.ingredients[type]
        const newCounts=oldCounts+1
        const newIngredients={...this.state.ingredients}
        newIngredients[type]=newCounts

        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice+burger_price[type]
        this.setState({ingredients:newIngredients,totalPrice:newPrice})
        this.purchaseHandler(newIngredients)
    }

    removeIngredientHandler = type => {

        const oldCounts=this.state.ingredients[type]

        if (oldCounts<=0){
            return
        }
        
        const newCounts=oldCounts-1
        const newIngredients={...this.state.ingredients}
        newIngredients[type]=newCounts

        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice-burger_price[type]
        this.setState({ingredients:newIngredients,totalPrice:newPrice})
        this.purchaseHandler(newIngredients)
    
    }

    orderHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseSuccessHandler=()=>{
        this.setState({purchasing:true})
        alert('successfully purchased')
        window.location.reload()
        return false
    }

    render(){

        const disabledInfo={...this.state.ingredients }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        return(
            <Auxi>
                <Burger
                ingredient={this.state.ingredients} />
               
                <Modal show={this.state.purchasing}
                    clicked={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseSuccess={this.purchaseSuccessHandler}
                    />
                </Modal>
            
                <BuildControls
                 moreIngredient={this.addIngredientHandler}
                 lessIngredient={this.removeIngredientHandler}
                 disable={disabledInfo}
                 price={this.state.totalPrice}
                 orderDisability={!this.state.purchasable}
                ordered={this.orderHandler}
                />
            </Auxi>
        )
    }

}

export default BurgerBuilder