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

export default class TodoList extends React.PureComponent<TodoListProps, TodoListState> {

    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo:Todo) => void
    private destroyTodo: (todo:Todo) => void
    private clearCompleted: () => void

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
        this.clearCompleted = this.store.clearCompleted.bind(this.store)
    }

    get remainingCount (): number{
        return this.state.todos.reduce((count, todo) => !todo.completed ? count+1 : count, 0)
    }

    get completedCount ():number{
        return this.state.todos.reduce((count, todo) => todo.completed ? count+1 : count, 0)
    }

    componentDidMount (){
        this.store.addTodo('Salut')
        this.store.addTodo('hello')
    }

    render () {

        let remainingCount = this.remainingCount
        let completedCount = this.completedCount
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
                {todos.length > 0 && <input className="toggle-all" type="checkbox" checked={remainingCount == 0} onChange={this.toggle}/>}
                <label htmlFor="toggle-all">Mark all as completed</label>
                <ul className="todo-list">
                    {todos.map(todo => {
                        return <TodoItem todo={todo} key={todo.id} onToggle={this.toggleTodo} onDestroy={this.destroyTodo}/>
                    })}
                    
                </ul>
            </section>
            <footer className="footer">
                {remainingCount > 0 && <span className="todo-count"><strong>{remainingCount}</strong> item{remainingCount > 1 && 's'} left</span>}
                <ul>
                    <li><a href="#/">All</a></li>
                    <li><a href="#/active">Active</a></li>
                    <li><a href="#/completed">Completed</a></li>
                </ul>
            </footer>
            {completedCount > 0 && <button className="clear-completed" onClick={this.clearCompleted}>clear completed</button>}
        </section>

                    

    }
    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ newTodo: ''})
    }

    addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ENter') {
            this.store.addTodo(this.state.newTodo)
            this.setState({newTodo: ''})
        }
    }

    toggle = (e: React.FormEvent<HTMLInputElement>) => {
        this.store.toggleAll(this.remainingCount > 0)
    }
}
