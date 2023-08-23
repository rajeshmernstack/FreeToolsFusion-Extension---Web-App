const express = require('express');
const cookiesRouter = express.Router();
const cookiesController = require('../controllers/cookiesController');

cookiesRouter.get("/", cookiesController.getAllSites);
cookiesRouter.get("/:cid", cookiesController.getAppCookie);
cookiesRouter.get("/:cid/delete", cookiesController.deleteAppCookie);
cookiesRouter.post("/", cookiesController.addCookies);

module.exports = cookiesRouter;