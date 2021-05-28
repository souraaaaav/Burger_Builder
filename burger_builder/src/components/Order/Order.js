import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {

    const allIngredients = []
    for (let igName in props.ingredients) {
        allIngredients.push([igName, props.ingredients[igName]])
    }

    const displayIngred = allIngredients.map(item => {
        return <p key={[item[0]]}>{item[0]} (<strong>{item[1]}</strong> pc)</p>
    })

    return (
        <div className={classes.Order}>
            <p><strong>Ingredients:</strong></p> <span> {displayIngred} </span>
            <p>Price: <strong>{props.totalPrice}TK</strong></p>
        </div>)
}

export default Order