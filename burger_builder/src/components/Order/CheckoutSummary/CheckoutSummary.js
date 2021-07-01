import React from 'react'
import Burger from '../../../components/Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            {/* <div style={{ width: '80%', margin: 'auto' }}> */}
                <Burger ingredient={props.ingredients} />
            {/* </div> */}
            <Button
                btnType='Danger'
                btnClicked={props.checkoutCancelled}
            >CANCEL</Button>
            <Button
                btnType='Success'
                btnClicked={props.checkoutContinued}
            >SUBMIT</Button>
        </div>
    )
}

export default CheckoutSummary