const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const r = require('../controller');

r(router, 'controller');
