import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Loader from '../../../components/UI/Loader/Loader'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'

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
        loading: false,
        formIsValid: false,
    }

    checkvalidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.mailCheck) {
            const copiedValue = value.trim()
            isValid = copiedValue.match('@') && copiedValue.endsWith(".com") && isValid
        }
        return isValid
    }

    orderHandler = (event) => {

        this.setState({ loading: true })
        const userOrderFormData = {}
        for (let key in this.state.orderForm) {
            userOrderFormData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            userData: userOrderFormData,
        }

        axios.post('/orders.json', order)
            .then(res => {
                // console.log(res.data)
                this.setState({ loading: false })
                if (res.status === 200) {
                    alert('successfully purchased')
                    window.location.href="/"
                }
                // return false

            })
            .catch(error => {
                this.setState({ loading: false })
                alert('Something Went Wrong')

            })

    }


    inputChangedHandler = (event, elementIdentifier) => {

        const updatedOrderForm = { ...this.state.orderForm }
        const updatedformElement = { ...updatedOrderForm[elementIdentifier] }

        updatedformElement.value = event.target.value
        updatedformElement.touched = true
        if (updatedformElement.validation) {
            updatedformElement.validity = this.checkvalidity(updatedformElement.value, updatedformElement.validation)
        }
        updatedOrderForm[elementIdentifier] = updatedformElement

        let formValid = true
        for (let key in updatedOrderForm) {
            formValid = updatedOrderForm[key].validity && formValid

        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formValid })


    }

    render() {

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
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
        </form>)

        if (this.state.loading) {
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
        ing: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios))