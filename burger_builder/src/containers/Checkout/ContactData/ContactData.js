import React,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Loader from '../../../components/UI/Loader/Loader'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component{
    state={
        name:' ',
        email:' ',
        address:{
            street:' ',
            postalCode:' '
        },
        loading:false
    }
    
   orderHandler=(event)=>{
        
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'hulo Debnath',
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
                this.setState({loading:false })
                if(res.status===200){
                alert('successfully purchased')
               this.props.history.push('/')
                }
                // return false

            })
            .catch(error=>{ 
                this.setState({loading:false})
                alert('Something Went Wrong')
                
            })
      
    }

    render(){

        let form = (<form >
            <input type="text" name="name" placeholder="your name" />
            <input type="email" name="email" placeholder="your email" />
            <input type="text" name="street" placeholder="street" />
            <input type="text" name="postal" placeholder="postal code" />
            <Button btnType="Success" btnClicked={this.orderHandler}>Order</Button>
        </form>)

            if(this.state.loading){
                form=<Loader />
            }
            console.log(this.props)
        return(
            <div className={classes.ContactData}>
                <h4>enter your contact data</h4>
                {form}
            </div>
        )
    }

}

export default withErrorHandler(ContactData,axios)