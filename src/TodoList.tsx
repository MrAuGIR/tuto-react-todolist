import * as React from 'react'
import TodoStore from './TodoStore'
import { Todo } from './Interface'
import TodoItem from './TodoItem'
import { KeyboardEvent } from 'react'

interface TodoListProps {

}

interface TodoListState {
    todos: Todo[],
    newTodo: ''
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {

    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo:Todo) => void
    private destroyTodo: (todo:Todo) => void

    constructor(props: TodoListProps){
        super(props)
        this.state = {
            todos: [],
            newTodo: ''
        }
        this.store.onchange((store) => {
            this.setState({todos: store.todos})
        })
        this.toggleTodo= this.store.toggleTodo.bind(this.store)
        this.destroyTodo= this.store.removeTodo.bind(this.store)
    }

    componentDidMount (){
        this.store.addTodo('Salut')
        this.store.addTodo('hello')
    }

    render () {
        let {todos, newTodo} = this.state
        return <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" 
                value={newTodo}
                placeholder="what nedds tobe done" 
                onInput={this.updateNewTodo}
                onKeyPress={this.addTodo}
                />
            </header>
            <section className="main">
                <input className="toggle-all" type="checkbox"/>
                <label htmlFor="toggle-all">Mark all as completed</label>
                <ul className="todo-list">
                    {todos.map(todo => {
                        return <TodoItem todo={todo} key={todo.id} onToggle={this.toggleTodo} onDestroy={this.destroyTodo}/>
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
    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState( {newTodo: (e.target as HTMLInputElement).value})
    }

    addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ENter') {
            this.store.addTodo(this.state.newTodo)
            this.setState({newTodo: ''})
        }
    }
}
