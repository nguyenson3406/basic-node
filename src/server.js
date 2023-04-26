import express, { request } from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web"
import initAPIRoute from "./route/api"

require('dotenv').config();
var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 8080;

app.use((req,res,next) => {
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.use(morgan('combined'))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

initAPIRoute(app);

app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port,() => {
    console.log(`This is  http://localhost:${port}`)
})