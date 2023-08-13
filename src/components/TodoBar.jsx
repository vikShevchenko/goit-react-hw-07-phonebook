import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getItems } from '../redux/todos/sliceItems'
import { useState } from 'react'
import { sortListItems, addItems } from '../redux/todos/sliceItems'
import { TodoBarRender } from './TodoBarRender'

export const TodoBar = () => {

    const dispatch = useDispatch()

    useEffect(() => { dispatch(getItems()) }, [dispatch])

    const todoValue = useSelector((store) => store.item.items)
    const todoSorted = useSelector((store) => store.item.sorted)
    const isLoading = useSelector((store) => store.item.isLoading)
    const error = useSelector((store) => store.item.error)
    const [changeName, setChangeName] = useState('')
    const [changeNumber, setChangeNumber] = useState('')

    const handleChange = () => {

        const compar = todoValue.filter(todo => changeName === todo.name)
        if (!!compar.length) {
            alert(`Name ${changeName} in List!`)

        } else {

            dispatch(addItems([changeName, changeNumber]))
            setChangeName('')
            setChangeNumber('')

        }
    }

    return (
        <div className='container'>
            <div className='todo-bar'>
                <form >
                    <input type="text" onChange={(e) => setChangeName(e.target.value)} value={changeName} placeholder='Name' />
                    <input type="number" onChange={(e) => setChangeNumber(e.target.value)} value={changeNumber} placeholder='Number' />
                </form>
                <button onClick={handleChange} disabled={!changeName || !changeNumber}>Add To List</button>
            </div>

            <form className='todo-bar-search'>
                <input type="text" onChange={(e) => { dispatch(sortListItems(e.target.value)) }} placeholder='Search' />
            </form>

            <TodoBarRender todoData={todoSorted.length ? todoSorted : todoValue} />
            {!isLoading && !error && <h2>Loading...</h2>}
        </div>
    )
}
