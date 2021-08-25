import db from './db';

export class PostDAO {

    createPost(post) {
        db.posts.put(post)
    }

    async updatePost(post) {
        return db.posts.update(post.id, post)
    }

    async deletePost(postId) {
        return db.posts.delete(postId)
    }

    async getPost(postId) {
        return db.posts.get(postId);
    }

    async getPosts() {
        return db.posts.toArray();
    }

    async getPostsCount() {
        return await db.posts.count();
    }
}