import express from "express";
import configViewEngine from "./configs/viewEngine";

const app = express();
const port = 8080;

configViewEngine(app);

app.get('/',(rep,res) => {
    // res.send("Hello Wellcome to node js")
    res.render('index.ejs')
})

app.listen(port,() => {
    console.log(`This is  http://localhost:${port}`)
})