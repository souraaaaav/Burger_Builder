import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'


const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
]
const BuildControls = (props) => (

        <div className={classes.BuildControls}>
                <p>Burger price is {props.price}

                        <span className={classes.Taka}>tk</span> </p>
                {controls.map(cntrl => < BuildControl
                        label={cntrl.label}
                        key={cntrl.type}
                        added={() => props.moreIngredient(cntrl.type)}
                        remove={() => props.lessIngredient(cntrl.type)}
                        disable={props.disable[cntrl.type]}
                />)}

                <button type="button" className={classes.OrderButton}
                        onClick={props.ordered}
                        disabled={props.orderDisability}><span className={classes.Order}>{props.isAuthenticated ? "ORDER" : "SIGN UP"}</span></button>

        </div>

)

export default BuildControls