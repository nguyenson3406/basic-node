import express, { request } from "express";
import configViewEngine from "./configs/viewEngine";
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

configViewEngine(app);

app.get('/',(rep,res) => {
    // res.send("Hello Wellcome to node js")
    res.render('index.ejs')
})

app.listen(port,() => {
    console.log(`This is  http://localhost:${port}`)
})