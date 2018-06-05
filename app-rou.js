var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.set("views",path.resolve(__dirname, "views"));
app.set("view engine","ejs");

var IP_MALVADA = "::1";
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



http.createServer(app).listen(3000);