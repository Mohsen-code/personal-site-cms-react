import {v4 as uuid} from "uuid";
import LocalStorage from "./LocalStorage";

export default class TodoList {
    ls = new LocalStorage("app-todo-list");

    newTodo(title, description) {
        const id = uuid().replace(/-/g, "");
        const isDone = false;
        this.ls.addItem({id, title, description, isDone});
    }

    getTodos(type = "all") {
        const todos = this.ls.getItems();
        switch (type) {
            case "finished":
                return todos.filter(todo => todo.isDone === true);
            case "unFinished":
                return todos.filter(todo => todo.isDone === false);
            default:
                return todos;
        }
    }

    getTodo(todoId) {
        return this.ls.getItemById(todoId);
    }

    updateTodo(updatedTodo) {
        return this.ls.updateItem(updatedTodo);
    }

    removeTodo(todoId) {
        return this.ls.removeItem(todoId);
    }
}
