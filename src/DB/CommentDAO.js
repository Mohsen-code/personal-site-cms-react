import db from './db'

export class CommentDAO{

    createComment(comment){
        db.comments.put(comment)
    }

    updateComment(comment){
        db.comments.update(comment.id, comment)
    }

    deleteComment(commentId){
        db.comments.delete(commentId)
    }

    async getComment(commentId){
        return db.comments.get(commentId)
    }

    async getComments(isPublic){
        return db.comments.toCollection().filter(comment => comment.isPublic === isPublic).toArray();
    }

    async getCommentsCount() {
        return await db.comments.count();
    }
}