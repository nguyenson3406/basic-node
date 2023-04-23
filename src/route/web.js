import express from "express";
import homeController from "../controller/homeController"

let route = express.Router();

const initWebRoute = (app) => {
    route.get('/', homeController.getHomepage);
    route.get('/detail/:id', homeController.getDetailpage);
    route.get('/card', homeController.getCardpage);

    return app.use('/',route)
}

export default initWebRoute;