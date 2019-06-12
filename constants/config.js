const path = require('path');
const rootDir = path.join(__dirname, '..');

require('dotenv').config();

exports.ROOT_DIR = rootDir;
exports.DB_DIALECT = 'postgres';

exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.SECRET_KEY = process.env.SECRET_KEY || 'Very Secret Key';
exports.HOST = process.env.HOST || 'http://localhost';
exports.PORT = process.env.PORT || '3000';
exports.POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
exports.POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
exports.POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
exports.POSTGRES_DB = process.env.POSTGRES_DB || 'nodejs-sample';
