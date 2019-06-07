const express = require('express');
const router = express.Router();
const ValidationError = require('../../errors/validation-error');
const todoItemService = require('../../services/todo-item-service');

/**
 * Get TodoItems
 */
router.get('/', async function(req, res, next) {
  try {
    const todoItems = await todoItemService.getTodoItems();
    res.status(200).json(todoItems);
  } catch (e) {
    next(e);
  }
});

/**
 * Create TodoItem
 */
router.post('/', async function(req, res, next) {
  req.checkBody('title', 'Title is required field').notEmpty();
  req.checkBody('title', 'Title must be a string').isString();

  if (req.body.position) {
    req.checkBody('position', 'Position must be a number').isNumeric();
  }

  if (req.body.completed) {
    req.checkBody('completed', 'Completed must be a boolean').isBoolean();
  }

  const errors = req.validationErrors();

  if (errors) {
    return next(new ValidationError(errors));
  }

  try {
    const todoItem = await todoItemService.createTodoItem(req.body);
    res.status(201).json(todoItem);
  } catch (e) {
    next(e);
  }
});

/**
 * Update TodoItem
 */
router.put('/:id', async function(req, res, next) {
  req.checkParams('id', 'Id must be numeric').isNumeric();

  if (req.body.title) {
    req.checkBody('title', 'Title must be a string').isString();
  }

  if (req.body.position) {
    req.checkBody('position', 'Position must be a number').isNumeric();
  }

  if (req.body.completed) {
    req.checkBody('completed', 'Completed must be a boolean').isBoolean();
  }

  let errors = req.validationErrors();

  if (errors) {
    return next(new ValidationError(errors));
  }

  try {
    const todoItem = await todoItemService.updateTodoItem(req.params.id, req.body);
    res.status(201).json(todoItem);
  } catch (e) {
    next(e);
  }
});

/**
 * Delete TodoItem
 */
router.delete('/:id', async function(req, res, next) {
  req.checkParams('id', 'Id must be numeric').isNumeric();

  let errors = req.validationErrors();

  if (errors) {
    return next(new ValidationError(errors));
  }

  try {
    const result = await todoItemService.deleteTodoItem(req.params.id);
    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});


module.exports = router;
