import * as React from 'react'
import { render } from 'react-dom'
import s from './TodoStore'
import TodoList from './TodoList'

console.log(s)

render(
    <TodoList />,
    document.getElementById('app')
)
