import {v4 as uuid} from "uuid";
import LocalStorage from "./LocalStorage";

export default class TodoList {
    ls = new LocalStorage("app-todo-list");

    newTodo(title, description) {
        const id = uuid().replace(/-/g, "");
        this.ls.addItem({id, title, description});
    }

    getTodos() {
        return this.ls.getItems();
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
