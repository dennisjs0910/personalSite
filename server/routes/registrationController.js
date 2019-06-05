const routes = require('express').Router();
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);