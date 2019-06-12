class ItemNotFoundError extends Error {
    constructor(errors) {
        const message = 'Item not found.';
        super(message);
        this.status = 404;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = ItemNotFoundError;
