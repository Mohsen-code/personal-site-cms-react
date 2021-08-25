import db from './db'

export class AccountDAO {

    createAccount(account) {
        db.accounts.put(account)
    }

    updateAccount(account) {
        db.accounts.update(account.id, account)
    }

    async getAccountByEmail(email) {
        return await db.accounts.get({email: email})
    }

    async getAccountById(accountID) {
        return await db.accounts.get({id: accountID})
    }

    async getAccounts() {
        return await db.accounts.toArray();
    }

    async deleteAccount(accountID) {
        db.accounts.delete(accountID);
    }
}