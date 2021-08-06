import {v4 as uuid} from 'uuid'

export class CommentDTO {
    id = uuid().replace(/-/g, '');
    postId = null;
    name = "";
    email = ""
    content = ""
}