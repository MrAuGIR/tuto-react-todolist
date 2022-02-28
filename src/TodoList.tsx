import * as React from 'react'
import TodoStore from './TodoStore'
import { Todo } from './Interface'

interface TodoListProps {

}

interface TodoListState {
    todos: Todo[]
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {

    private store: TodoStore = new TodoStore()

    constructor(props: TodoListProps){
        super(props)
        this.state = {
            todos: this.store.todos
        }
    }

    render () {
        let {todos} = this.state
        return <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="what nedds tobe done"/>
            </header>
            <section className="main">
                <input className="toggle-all" type="checkbox"/>
                <label htmlFor="toggle-all">Mark all as completed</label>
                <ul className="todo-list">
                    {todos.map(todo => {
                        return 
                    })}
                    
                </ul>
            </section>
            <footer className="footer">
                <span className="todo-count"><strong>i</strong> item left</span>
                <ul>
                    <li><a href="#/">All</a></li>
                    <li><a href="#/active">Active</a></li>
                    <li><a href="#/completed">Completed</a></li>
                </ul>
            </footer>
            <button className="clear-completed">clear completed</button>
        </section>



    }

}