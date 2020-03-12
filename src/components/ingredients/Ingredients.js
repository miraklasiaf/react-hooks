import React, { useReducer, useCallback } from 'react'
import IngredientForm from './IngredientForm'
import Search from './Search'
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'


const ingredientReducer = (state, action) => {
    switch(action.type){
        case 'SET': return action.ingredient
        case 'ADD': return [...state, action.ingredient]
        case 'REMOVE': return state.filter(ing => ing.id !== action.id)
        default: throw new Error('Should not get there')
    }
}

const responseReducer = (state, action) => {
    switch(action.type){
        case 'START': return { ...state, loading: true }
        case 'SUCCESS': return { ...state, loading: false }
        case 'FAILED': return { ...state, error: action.error }
        case 'CLEAR': return {...state, error: null }
        default: throw new Error('Should not get there')
    }
}  

export default function Ingredients() {
    const [ingredients, dispatch] = useReducer(ingredientReducer, [])
    const [response, dispatchResponse] = useReducer(responseReducer, { loading: false, error: null })

    const addIngredient = (ingredient) => {
        dispatchResponse({type: 'START'})
        fetch('https://react-hooks-b7c34.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            dispatchResponse({ type: 'SUCCESS' })
            return res.json()
        }).then(resData => {
            dispatch({ type: 'ADD', ingredient: { id: resData.name, ...ingredient } })
        })
    }

    const removeIngredient = (ingredientId) => {
        dispatchResponse({ type: 'START' })
        fetch(`https://react-hooks-b7c34.firebaseio.com/ingredients/${ingredientId}.jon`, {
            method: 'DELETE'
        }).then(res => {
            dispatchResponse({ type: 'SUCCESS' })
            dispatch({type: 'DELETE', id: ingredientId})
        }).catch(error => {
            dispatchResponse({ type: 'FAILED', error: 'Something went wrong' })
        });
    }

    const handleFilterChange = useCallback( ingredient => {
        dispatch({type: 'SET', ingredient: ingredient })
    }, []) // Cache the function

    const clearError = () => {
        dispatchResponse({type: 'CLEAR'})
    }

    return (
        <div className="App">
            {response.error && <ErrorModal onClose={clearError}>{response.error}</ErrorModal>}
            <IngredientForm 
                storeIngredient={addIngredient} 
                isLoading={response.loading}
            />

            <section>
                <Search loadIngredients={handleFilterChange} />
                <IngredientList ingredients={ingredients} deleteItem={removeIngredient}/>
            </section>
        </div>
    )
}
