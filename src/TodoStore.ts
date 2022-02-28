import { Todo } from './Interface'

declare type ChangeCallback = (store: TodoStore) => void

export default class TodoStore {

    private static i = 0
    private callbacks: ChangeCallback[] = []
    public todos: Todo[] = []

    static increment () {

        return this.i++
    }

    inform () {
        this.callbacks.forEach(cb => cb(this))
    }

    onchange(cb:( store: TodoStore) => void){
        this.callbacks.push(cb)
    }

    addTodo(title: string): void {
        this.todos = [{
            id: TodoStore.increment(),
            title: title,
            completed: false
        },...this.todos]
    }
        
    removeTodo(todo: Todo):void{
        this.todos = this.todos.filter(t => t !== todo)
        this.inform()
    }

    toggleTodo(todo: Todo): void {
        this.todos = this.todos.map (t => t === todo ? { ...t, completed: !t.completed } : t)
        this.inform()
    }

    editTodo(todo: Todo, title: string):void {
        this.todos = this.todos.map (t => t === todo ? { ...t, title } : t)
        this.inform()
    }

    toggleAll(completed = true){
        this.todos = this.todos.map( t => completed ! == t.completed? { ...t, completed }: t)
        this.inform()
    }

    cleanTodo (): void {
        this.todos = this.todos.filter (t => !t.completed)
        this.inform()
    }

}
