import React, { useState } from 'react'
import './styles/IngredientForm.css'
import LoadingIndicator from '../UI/LoadingIndicator' 
import Card from '../UI/Card'

const IngredientForm = React.memo( props => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.storeIngredient({ name, amount })
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                        {props.loading && <LoadingIndicator />}
                    </div>
                </form>
            </Card>
        </section>
    )
})

export default IngredientForm