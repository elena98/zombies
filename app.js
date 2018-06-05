var express= require('express');
var path=require('path');
var http =require('http');
var logger = require("morgan");
var bodyParse = require("body-parser");
var app= express();


app.set("views",path.resolve(__dirname, "views"));
app.set("view engine","ejs");

var IP_DENEGADA = "::1";
var publicPath = path.join(__dirname,'public');
app.use('/recursos',express.static(publicPath));

app.get('/',(request, response) => {
    response.render("header");
});


app.get('/zombies.ejs',(request, response)=>{
    response.render("zombies");
});

app.get('/armas.ejs',(request, response)=>{
    response.render("armas");
});

app.get('/Victimas.ejs',(request, response)=>{
    response.render("victimas");
});

app.use((request,response)=>{
    response.writeHead(404,{"Content-type":"text/html"});
    response.end("<h2>404 Not Found</h2>");
    
});

var entries=[];
app.locals.entries = entries;

app.use(logger("dev"));
app.use(bodyParse.urlencoded({extended:false}));

app.get("/",(request,response) => response.render("new-entry"));

app.post('/new-entry',(request,response) => {
    if(!request.body.title || !request.body.body){
        response.status(400).send("las entradas deben de tener la informacion requerida")
        return;
    }
    entries,push({
        title: request.body.title,
        body: request.body.body,
        created:new Date()
    });
    response,redirect("/");
});


http.createServer(app).listen(3000);

