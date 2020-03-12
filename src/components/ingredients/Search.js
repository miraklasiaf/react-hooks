import React, { useState, useEffect, useRef} from 'react'
import Card from '../UI/Card'
import './styles/Search.css'

const Search = React.memo(props => {
    const [filter, setFilter] = useState('')
    const {loadIngredients} = props
    const inputRef = useRef()

    //  It runs after component update (re render)
    //  UseEffect acts like componentDidUpdate
    useEffect(() => {
        const timer = setTimeout(() => {
            if(filter === inputRef.current.value){
                (async function fetchData () {
                    const query = filter.length === 0 ? '' : `?orderBy="name"&equalTo="${filter}"`
                    const response = await fetch('https://react-hooks-b7c34.firebaseio.com/ingredients.json' + query)
                    const responseData = await response.json()
                    const loadedIngredients = []
                    for (const key in responseData) {
                        loadedIngredients.push({
                            id: key,
                            name: responseData[key].name,
                            amount: responseData[key].amount
                        })
                    }
                    loadIngredients(loadedIngredients)
                })();
            }
        }, 500);
        
        // Cleanup
        return () => clearTimeout(timer)
    }, [filter, loadIngredients, inputRef])
    // Runs only once
    // acts like componentDidMount

    return (
        <section className="search">
            <Card>
                <div>
                    <label className="search-input">Filter by Title</label>
                    <input ref={inputRef} type="text" value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
            </Card>
        </section>
    )
})

export default Search
