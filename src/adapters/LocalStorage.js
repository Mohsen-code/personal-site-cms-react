export default class LocalStorage {
  dbName = "";

  constructor(dbName) {
    this.dbName = dbName;
    if (!this.dbExist()) {
      localStorage.setItem(this.dbName, "[]");
    }
  }

  dbExist() {
    return localStorage.getItem(this.dbName) !== null;
  }

  getItems() {
    if (this.dbExist()) {
      return JSON.parse(localStorage.getItem(this.dbName));
    }
    return [];
  }

  setItems(items) {
    localStorage.setItem(this.dbName, JSON.stringify(items));
  }

  getItemById(itemId) {
    const items = this.getItems();
    const [item] = items.filter((itemArg) => itemArg.id === itemId);
    return item;
  }

  getUserByEmail(email) {
    const users = this.getItems();
    const [user] = users.filter((userArg) => userArg.email === email);
    return user;
  }

  addItem(item) {
    if (!this.dbExist()) return false;
    const items = this.getItems();
    items.push(item);
    this.setItems(items);
    return true;
  }

  itemExist(itemId) {
    if (!this.dbExist()) return false;
    const items = this.getItems();
    const itemIndex = items.findIndex((itemArg) => itemArg.id === itemId);
    return itemIndex > -1;
  }

  removeItem(itemId) {
    if (!this.dbExist()) return false;
    const items = this.getItems();
    const filteredItems = items.filter((itemArg) => itemArg.id !== itemId);
    this.setItems(filteredItems);
    return true;
  }

  updateItem(item) {
    if (!this.dbExist()) return false;
    const items = this.getItems();
    const itemIndex = items.findIndex((itemArg) => itemArg.id === item.id);
    items[itemIndex] = item;
    this.setItems(items);
    return true;
  }

  emailExist(email) {
    const items = this.getItems();
    const itemIndex = items.findIndex((itemArg) => itemArg.email === email);
    return itemIndex > -1;
  }

  saveUserData(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  }
}
