import React, { Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSumary/OrderSumary'
import axios from '../../axios-order'
import Loader from '../../components/UI/Loader/Loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const burger_price={
    salad:40,
    meat:130,
    cheese:60,
    bacon:40
}

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice:40,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-burger-project-a7a97-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(error=>{
                this.setState({error:true})
            })
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
        this.setState({loading:true})
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Sourav Debnath',
                address:{
                    street:'nimtola',
                    zipcode:'1205',
                    country:'Bangladesh'
                },
                email:'souravdebnath97@gmail.com'
            }
        }

        axios.post('/orders.json',order)
            .then(res=>{
                // console.log(res.data)
                this.setState({loading:false , purchasing:false})
                if(res.status===200){
                alert('successfully purchased')
                window.location.reload()
                }
                // return false

            })
            .catch(error=>{ 
                this.setState({loading:false , purchasing:false})
            
            })

     
    }

    render(){

        const disabledInfo={...this.state.ingredients }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSummary=null
              

        
        let burger = this.state.error?<p>ingredients cant be loaded</p> : <Loader />

        if(this.state.ingredients){
             burger = (
            <Auxi>
                 <Burger
                        ingredient={this.state.ingredients}
                 />
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

             orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseSuccess={this.purchaseSuccessHandler}  />

             }

             if(this.state.loading){
                orderSummary=<Loader />
            } 

        return(
            <Auxi>
              
               
                <Modal show={this.state.purchasing}
                    clicked={this.purchaseCancelHandler}
                    bg={this.state.loading?'rgba(76, 175, 80, 0)':'white'}
                    brdr={this.state.loading?'none':'1px solid #ccc'}
                    bxshd={this.state.loading?'0px 0px 0px 0px':' 5px solid hsl(0, 0%, 40%)'}
                >
                    {orderSummary}
                </Modal>

                {burger}
              
            </Auxi>
        )
    }

}

export default withErrorHandler(BurgerBuilder,axios)