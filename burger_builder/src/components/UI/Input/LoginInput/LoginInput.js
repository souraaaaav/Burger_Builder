import React from 'react'
import classes from './LoginInput.module.css'

const Input = (props) => {

    let inputElement = null
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.validationRequired && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case ('password'):

            inputElement = (
                <div>
                    <input 
                    className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        style={{background: "url('./images/padlock.png') no-repeat scroll 7px 7px"}}
                    ></input>
                    <h6>{props.underlabel}</h6>
                </div>)
            break;

        case ('email'):
            inputElement =  <input className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
        
            break;


        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}

export default Input