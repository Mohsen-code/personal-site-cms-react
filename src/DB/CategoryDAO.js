import db from './db'

export class CategoryDAO {

    createCategory(category) {
        db.categories.put(category)
    }

    async updateCategory(category) {
        return db.categories.update(category.id, category)
    }

    async deleteCategory(categoryId) {
        return db.categories.delete(categoryId)
    }

    async getCategory(categoryId) {
        return db.categories.get(categoryId);
    }

    async getCategories() {
        return db.categories.toArray();
    }

}