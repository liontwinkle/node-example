const express = require('express');
const router = express.Router();
const ValidationError = require('../../errors/validation-error');
const todoItemService = require('../../services/todo-item-service');
const stringToBoolean = require('../../utils/string-to-boolean');

/**
 * Get TodoItems
 */
router.get('/', async function(req, res, next) {
    try {
        if (req.query.completed) {
            req.checkQuery('completed', 'Completed must be a boolean').isBoolean();
        }

        const errors = req.validationErrors();

        if (errors) {
            return next(new ValidationError(errors));
        }

        const completed = stringToBoolean(req.query.completed);
        const todoItems = await todoItemService.getTodoItems({ completed });
        res.status(200).json(todoItems);
    } catch (e) {
        next(e);
    }
});

/**
 * Create TodoItem
 */
router.post('/', async function(req, res, next) {
    try {
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
    try {
        req.checkParams('id', 'Id must be a numeric').isNumeric();

        if (req.body.title) {
            req.checkBody('title', 'Title must be a string').isString();
        }

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
    try {
        req.checkParams('id', 'Id must be a numeric').isNumeric();

        const errors = req.validationErrors();

        if (errors) {
            return next(new ValidationError(errors));
        }

        await todoItemService.deleteTodoItem(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
