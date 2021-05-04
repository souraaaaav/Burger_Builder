import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const Burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredient).map((igkey) =>{

        return [...Array(props.ingredient[igkey])].map((_,i)=>{
            
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })

     } ).reduce((arr,el)=>{
         return arr.concat(el)
     },[])
    //  let ingreLength=0
    //  for(let i in transformedIngredients){
    //     ingreLength+=(transformedIngredients[i].length)  
    //  }

     if(transformedIngredients.length===0){
         transformedIngredients=<p>Please Add Ingredients</p>
     }

    return(
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
            {transformedIngredients}
        <BurgerIngredient type='bread-bottom' />
    </div>    
    )

}

export default Burger