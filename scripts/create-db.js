const { Client } = require('pg');

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB
} = require('../constants/config');

const CONNECTION_STRING = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/postgres`;
const client = new Client(CONNECTION_STRING);

client.connect();
client.query(`CREATE DATABASE ${POSTGRES_DB}`, () => {
    client.end();
});
