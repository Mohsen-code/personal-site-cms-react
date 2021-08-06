import {v4 as uuid} from 'uuid';

export class AccountDTO {
    id = uuid().replace(/-/g, '');
    firstName = ""
    lastName = ""
    email = ""
    password = ""
    permission = ""

    constructor(init) {
        if (init) Object.assign(this, init)
    }
}