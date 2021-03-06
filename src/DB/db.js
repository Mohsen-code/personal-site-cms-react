import Dexie from "dexie";
import {AccountDTO} from "../adapters/AccountDTO";

const db = new Dexie('MyDataBase');
db.version(1).stores({
    accounts: "id, thumbnail, firstName, lastName, email, password, permission, createDate",
    posts: "id, thumbnail, title, summary, content, *tags, visits, *comments, *categories",
    comments: "id, postId, name, email, content, isPublic, replyId, userId, parentId",
    categories: "id, thumbnail, title, isPublic",
    messages: "id, name, email, title, content, isSeen",
    todos: "id, title, description, isDone, isImportant"
})

async function configuration() {
    const data = await db.accounts.get({email: 'test@gmail.com'})
    if (!data) {
        const accountDTO = new AccountDTO({
            firstName: 'Mohsen',
            lastName: 'Falahnejad',
            email: 'test@gmail.com',
            password: '76mnoZxA',
            permission: 'admin'
        });

        db.accounts.put(accountDTO)
    }
}

configuration();

export default db;