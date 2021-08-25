import db from './db'
export class TodoDAO {

    createTodo(todo) {
        db.todos.put(todo)
    }

    updateTodo(todo) {
        db.todos.update(todo.id, todo)
    }

    deleteTodo(todoId){
        db.todos.delete(todoId)
    }

    async getTodosByIsDone(isDone){
        return db.todos.toCollection().filter(todo => todo.isDone === isDone);
    }

    async getTodosByIsImportant(isImportant){
        return db.todos.toCollection().filter(todo => todo.isImportant === isImportant);
    }

    async getTodoById(todoId){
        return await db.todos.get({id: todoId})
    }

}