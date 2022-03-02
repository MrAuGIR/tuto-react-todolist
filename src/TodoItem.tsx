import * as React from 'react'
import { Todo } from './Interface';
import classNames, * as cx from 'classnames'
import { ChangeEvent, FormEvent, MouseEvent } from 'react'

interface Props{
    todo: Todo
    onToggle: (todo:Todo) => void
    onDestroy: (todo:Todo) => void
}

interface State{
    editing: boolean
    title: string
}

export default class TodoItem extends React.PureComponent<Props,State>{

    constructor(props:Props){
        super(props)
        this.state = {
            editing: false,
            title: ''
        }
    }
    
    render(){
        let {todo} = this.props
        let liClass = classNames({ completed: todo.completed });
        return <li  className={liClass}>
            <div className="view">
                <input className="toggle" 
                    type="checkbox" 
                    onChange={this.toggle} 
                    checked={todo.completed}/>
                <label>{todo.title}</label>
                <button className="destroy" onClick={this.destroy}></button>
            </div>
        </li>
    }

    toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
       
        this.props.onToggle(this.props.todo)
    }

    destroy = (e: MouseEvent<HTMLButtonElement>) => {
        this.props.onDestroy(this.props.todo)
    }

}