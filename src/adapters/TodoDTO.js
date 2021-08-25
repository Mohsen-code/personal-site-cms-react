import {v4 as uuid} from 'uuid'
export class TodoDTO {
    id = uuid().replace(/-/g, '')
    title = "";
    description = "";
    isDone = false
    isImportant = false

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}