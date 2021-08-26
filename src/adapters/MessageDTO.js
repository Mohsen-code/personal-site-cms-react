import {v4 as uuid} from 'uuid'

export class MessageDTO {
    id = uuid().replace(/-/g, '');
    name = "";
    email = "";
    title = "";
    content = "";
    isSeen = false;

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}