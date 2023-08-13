import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItems } from '../redux/todos/sliceItems'

export const TodoBarRender = ({ todoData }) => {

    const errorMessage = useSelector((store) => store.item.error)

    const dispatch = useDispatch()
    return (
        <ul className='todo-bar-render'>
            <h3>Contacts: {errorMessage && 'Error'}</h3>
            {todoData && todoData.map(todo => <li key={todo.id}>{todo.name}: {todo.phone}
                <button onClick={() => dispatch(deleteItems(todo.id))} >X</button>
            </li>)}
        </ul>
    )
}
