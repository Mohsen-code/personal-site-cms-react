import Dexie from "dexie";
import {AccountDTO} from "../adapters/AccountDTO";

const db = new Dexie('MyDataBase');
db.version(1).stores({
    accounts: "id, firstName, lastName, username, email, password, permission",
    posts: "id, thumbnail, title, summary, content, *tags, visits, *comments, *categories",
    comments: "id, postId, name, email, content, isPublic, replyId, userId",
    categories: "id, thumbnail, title, isPublic",
    messages: "id, name, email, title, content, *files"
})

async function configuration() {
    const data = await db.accounts.get({username: 'mohsen_coder'})
    if (!data) {
        const accountDTO = new AccountDTO({
            firstName: 'Mohsen',
            lastName: 'Falahnejad',
            username: 'mohsen_coder',
            email: 'test@gmail.com',
            password: '76mnoZxA',
            permission: 'admin'
        });

        db.accounts.put(accountDTO)
    }
}

configuration();

export default db;