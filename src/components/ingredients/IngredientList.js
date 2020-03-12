import React from 'react'
import './styles/IngredientList.css'

export default function IngredientList(props) {
    return (
        <section className="ingredient-list">
            <h2>Loaded Ingredients</h2>
            <ul>
                {props.ingredients.map(ig => (
                    <li key={ig.id} onClick={props.deleteItem.bind(this, ig.id)}>
                        <span>{ig.name}</span>
                        <span>{ig.amount}x</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
