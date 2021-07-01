import React, { Component } from 'react'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Loader from '../../../components/UI/Loader/Loader'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as orderActions from '../../../store/actions/index'
import { updatedObject, checkvalidity } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    label: 'Name'
                },
                value: "",
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    label: 'street'
                },
                value: "",
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                    label: 'Zip Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                validity: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    label: 'Country'
                },
                value: "",
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                    label: 'E-Mail'
                },
                value: "",
                validation: {
                    required: true,
                    mailCheck: true
                },
                validity: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                    label: 'Delivery Type'
                },
                value: "fastest",
                validity: true
            },
        },
        formIsValid: false,
    }



    orderHandler = (event) => {
        const userOrderFormData = {}
        for (let key in this.state.orderForm) {
            userOrderFormData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            userData: userOrderFormData,
            userId: this.props.userId
        }

        this.props.onPurchaseBurger(order, this.props.token)
    }


    inputChangedHandler = (event, elementIdentifier) => {


        const updatedformElement = updatedObject(this.state.orderForm[elementIdentifier], {
            value: event.target.value,
            touched: true,
            validity: checkvalidity(event.target.value, this.state.orderForm[elementIdentifier].validation)
        })

        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [elementIdentifier]: updatedformElement
        })

        let formValid = true
        for (let key in updatedOrderForm) {
            formValid = updatedOrderForm[key].validity && formValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formValid })


    }

    render() {

        if ((this.props.ing === null && this.props.price === 40)) {
            return <Redirect to="/"></Redirect>
        }

        if ((this.props.ing !== null && this.props.price !== 40) && this.props.purchased === true) {
            return <Redirect to="/"></Redirect>
        }

        const formElementArray = []

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler} >
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                    label={formElement.config.elementConfig.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.validity}
                    validationRequired={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <button type="submit" className={classes.OrderButton}
                disabled={!this.state.formIsValid}><span className={classes.Order}>Order</span></button>
        </form>)

        if (this.props.loading) {
            form = <Loader />
        }



        return (
            <div className={classes.ContactData}>
                <h4>enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        orderable: state.burgerBuilder.orderable,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => (dispatch(orderActions.purchaseBurger(orderData, token)))
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(ContactData, axios))