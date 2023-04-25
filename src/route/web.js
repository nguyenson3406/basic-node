import express from "express";
import homeController from "../controller/homeController"

let route = express.Router();

const initWebRoute = (app) => {
    route.get('/', homeController.getHomepage);
    route.get('/detail/:id', homeController.getDetailpage);
    route.get('/card', homeController.getCardpage);
    route.post('/create-new-user', homeController.createUserpage);
    route.get('/update-user/:id', homeController.getUpdatepage);
    route.post('/update-user-DB/:id', homeController.postUpdateuser);
    route.post('/delete/:id', homeController.postDeleteuser)

    return app.use('/',route)
}

export default initWebRoute;