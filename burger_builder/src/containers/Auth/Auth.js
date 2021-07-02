import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/LoginInput/LoginInput'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as authActions from '../../store/actions/index'
// import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import { updatedObject, checkvalidity } from '../../shared/utility'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email',
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
                    placeholder: 'password',
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

    componentDidMount() {
        if (this.props.ingredients) {
            this.props.onSetAuthRedirectPath("/checkout")
        }
        else if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath("/")
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls, {
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validity: checkvalidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        })

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
        let passwordMessage = null
        if (this.state.controls.password.value.length < 6 &&
            this.state.controls.password.touched &&
            !this.state.isSignUp
        ) {
            passwordMessage = <p style={{paddingTop:"-10px",textAlign:"center"}}>minimum 6 characters</p>
        }
        let form = (<form onSubmit={this.AuthHandler}>
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.validity}
                    validationRequired={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    underlabel={passwordMessage}
                />
            ))}
            <div style={{ textAlign: "center" }}>
                <button type="submit" className={classes.signinButton}
                    disabled={!this.state.formIsValid}>
                    <span style={this.state.formIsValid ? { color: "white" } : { color: "rgb(179,179,179)" }}>{this.state.isSignUp ? "log in" : "create account"}</span></button>
            </div>
        </form>)

        if (this.props.loading) {
            form = <Loader />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = <h2 style={{ color: "red" }}>{this.props.error.message}</h2>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.loginBody}>
            <div className={classes.loginDiv}>
                <div className={classes.logo}></div>
                <div className={classes.title}>Burger Builder</div>
                <div className={classes.subTitle}>CR3W</div>
                {errorMessage}
                {authRedirect}
                <div className={classes.fields}>
                    {form}
                </div>

                <div className={classes.link}>
                    {this.state.isSignUp ? "Don't have account?" : "Already have account?"}
                    <span onClick={this.switchModeHandler}>
                        {this.state.isSignUp ? "Sign up" : "Log in"}
                    </span>
                </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        ingredients: state.burgerBuilder.totalPrice > 41
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)