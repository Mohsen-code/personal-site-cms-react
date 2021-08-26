import db from './db'
export class MessageDAO {

    createMessage(message) {
        db.messages.put(message)
    }

    updateMessage(message) {
        db.messages.update(message.id, message)
    }

    deleteMessage(messageId){
        db.messages.delete(messageId)
    }

    async getMessage(messageId){
        return await db.messages.get({id: messageId})
    }

    async getMessagesByStatus(isSeen = false){
        return db.messages.toCollection().filter(message => message.isSeen === isSeen).toArray()
    }

    async getMessagesCountByStatus(isSeen){
        const allMessages = await db.messages.toArray();
        if (isSeen === null) return allMessages.length;
        if (isSeen === true) {
            const seenMessages = allMessages.filter(message => message.isSeen === true);
            return seenMessages.length;
        }
        const unSeenMessages = allMessages.filter(message => message.isSeen === false);
        return unSeenMessages.length;
    }
}