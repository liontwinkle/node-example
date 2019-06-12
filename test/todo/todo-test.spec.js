const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../constants/config');
const _ = require('lodash');

chai.use(chaiHttp);

const request = chai.request(`${config.HOST}:${config.PORT}`);
const should = chai.should();

/**
 * ToDoList API test
 */

describe('Check ToDoList service', () => {
    before(() => {});

    /**
     * Get TodoItems
     */
    describe('GET /api/v1/todo-items', () => {
        it('it should get the todo list', done => {
            request.get('/api/v1/todo-items?completed=true').end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    /**
     * Create TodoItem
     */
    describe('POST /api/v1/todo-items', () => {
        const body = {
            title: 'TodoTest#1',
            position: 1,
            completed: true
        };

        it('it should add the new item to the todo list', done => {
            request
                .post('/api/v1/todo-items')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it('it should\'t add the new item to the todo list because of mandatory params loss (title)', done => {
            request
                .post('/api/v1/todo-items')
                .send(_.omit(body, ['title']))
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });

    /**
     * Update TodoItem
     */
    describe('PUT /api/v1/todo-items', () => {
        const body = {
            title: 'TodoTest#2',
            position: 2,
            completed: false
        };

        it('it should update the existing item in the todo list', done => {
            request
                .post('/api/v1/todo-items')
                .send(body)
                .end((err, res) => {
                    const item = res.body;
                    request
                        .put(`/api/v1/todo-items/${item.id}`)
                        .send(body)
                        .end((err, res) => {
                            res.should.have.status(201);
                            done();
                        });
                });
        });

        it('it should\'t update the existing item in the todo list because of field wrong type (id)', done => {
            request
                .put('/api/v1/todo-items/sfsdfsdf')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });

    /**
     * Delete TodoItem
     */
    describe('DELETE /api/v1/todo-items', () => {
        const body = {
            title: 'TodoTest#3',
            position: 3,
            completed: true
        };

        it('it should delete the existing item from the todo list', done => {
            request
                .post('/api/v1/todo-items')
                .send(body)
                .end((err, res) => {
                    const item = res.body;
                    request
                        .delete(`/api/v1/todo-items/${item.id}`)
                        .send(body)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

        it('it should\'t delete the existing item from the todo list because of field wrong type (id)', done => {
            request
                .delete('/api/v1/todo-items/sfsdfsdf')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });
});
