import {v4 as uuid} from 'uuid';

export class AccountDTO {
    id = uuid().replace(/-/g, '');
    thumbnail = null
    firstName = ""
    lastName = ""
    email = ""
    password = ""
    permission = ""
    createDate = new Date().getTime()

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}