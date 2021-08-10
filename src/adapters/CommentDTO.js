import {v4 as uuid} from 'uuid'

export class CommentDTO {
    id = uuid().replace(/-/g, '');
    postId = null;
    name = "";
    email = ""
    content = ""
    isPublic = false
    replyId = null
    userId = null

    constructor(init) {
        if (init) Object.assign(init)
    }
}