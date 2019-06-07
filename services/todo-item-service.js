const { TodoItem } = require('../models');
const ItemNotFoundError = require('../errors/item-not-found-error');

class TodoItemService {
  async getTodoItem(id) {
    const todoItem = await TodoItem.findByPk(id);
    if (!todoItem) {
      throw new ItemNotFoundError();
    }
    return todoItem;
  }

  async getTodoItems({ completed } = {}) {
    const where = {};
    if (typeof completed === 'boolean') {
      where.completed = completed;
    }
    return await TodoItem.findAll({
      where,
      order: [
        ['completed', 'asc'],
        ['updatedAt', 'desc'],
      ],
    });
  }

  async createTodoItem({ title, position, completed }) {
    return await TodoItem.create({ title, position, completed })
  }

  async updateTodoItem(id, { title, completed, position }) {
    const todoItem = await this.getTodoItem(id);
    return todoItem.update({ title, completed, position })
  }

  async deleteTodoItem(id) {
    return await TodoItem.destroy({ where: { id } });
  }
}

module.exports = new TodoItemService();
