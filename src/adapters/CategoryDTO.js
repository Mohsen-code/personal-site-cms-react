import {v4 as uuid} from 'uuid'

export class CategoryDTO {
    id = uuid().replace(/-/g, '');
    thumbnail = null;
    title = "";
    isPublic = false;

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}