import express from "express";
import home from "../controller/home"

let route = express.Router();

const initWebRoute = (app) => {
    route.get('/', home.getHomepage);
    route.get('/about', (req, res) => {
        res.send(`Wellcome! back`)
    })

    return app.use('/',route)
}

export default initWebRoute;