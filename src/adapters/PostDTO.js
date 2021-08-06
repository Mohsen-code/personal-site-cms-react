import {v4 as uuid} from 'uuid'

export class PostDTO {
    id = uuid().replace(/-/g, '');
    thumbnail = null;
    title = "";
    summary = "";
    content = "";
    tags = [];
    visits = 0;
    comments = [];
    categories = [];

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}