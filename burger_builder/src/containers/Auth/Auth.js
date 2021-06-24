import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as authActions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'

class Auth extends Component {

    state = {
        controls: {
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
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                    label: 'Password'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                validity: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: true
    }

    componentDidMount(){
        if(this.props.ingredients){
            this.props.onSetAuthRedirectPath("/checkout")
        }
        else if(!this.props.buildingBurger&&this.props.authRedirectPath){
            this.props.onSetAuthRedirectPath("/")
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validity: this.checkvalidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        }
        let formValid = true

        for (let key in updatedControls) {
            formValid = updatedControls[key].validity && formValid
        }
        this.setState({ controls: updatedControls, formIsValid: formValid })

    }

    AuthHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {

        const formElementArray = []

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (<form onSubmit={this.AuthHandler}>
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
            <button type="submit" className={classes.LoginButton}
                disabled={!this.state.formIsValid}><span className={this.state.formIsValid ? classes.Login : null}>Login</span></button>
        </form>)

        if (this.props.loading) {
            form = <Loader />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = <h2 style={{ color: "red" }}>{this.props.error.message}</h2>
        }
        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                <h3>PLEASE {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</h3>
                {errorMessage}
                {authRedirect}
                {form}
                <Button btnType="Danger"
                    btnClicked={this.switchModeHandler}
                >SWITCH TO {this.state.isSignUp ? "SIGN UP" : "SIGN IN"} </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath,
        ingredients:state.burgerBuilder.totalPrice>41
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath:(path)=>dispatch(authActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)