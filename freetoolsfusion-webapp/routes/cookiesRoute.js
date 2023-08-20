const express = require('express');
const cookiesRouter = express.Router();
const cookiesController = require('../controllers/cookiesController');

cookiesRouter.get("/", cookiesController.getAllSites);
cookiesRouter.get("/:appname", cookiesController.getAppCookie);

module.exports = cookiesRouter;