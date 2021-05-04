import React,{Component} from 'react'
import Auxi from '../../../hoc/Auxi/Auxi'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentDidUpdate(){
        console.log('[orderSummary.js] will updates')
    }
    
    render(){
        const SummaryIngredient=Object.keys(this.props.ingredients)
        .map(igKey=>{
            return <li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        })

        return(
            <Auxi>
            <h3>Your Order</h3>
            <p>A burger with these ingredients:</p>
            <ul>
                {SummaryIngredient}
            </ul>
            <strong>Total Price: {this.props.price}tk</strong>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} btnClicked={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnType={'Success'} btnClicked={this.props.purchaseSuccess}>SUBMIT</Button>
        </Auxi>
        )
    }
}
export default OrderSummary