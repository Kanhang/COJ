var express= require("express");
var app= express();
var restRouter=require("./routes/rest");
var indexRouter=require("./routes/index");
var mongoose=require("mongoose");
var path=require("path");
var http=require('http');
var socketIo=require('socket.io');
var io= socketIo();
var SocketService=require('./services/SocketService.js')(io);
mongoose.connect("mongodb://Kanhang:Thomas123321@ds251022.mlab.com:51022/cojdb");

app.use(express.static(path.join(__dirname,"../public")));

app.use('/',indexRouter);
app.use ("/api/v1",restRouter); //the way to use restRouter
app.use(function(req,res)	
{
	res.sendFile("index.html",{root:path.join(__dirname,'../public/')});

});




// app.listen(3000,function(){
// console.log("app listening on port 3000 ");
// });
var server=http.createServer(app);
io.attach(server);
console.log(io);
server.listen(3000);
server.on('error',	onError);
server.on('listening',onListening);
function onError(error){
	throw error;
}
function onListening(){
	
	var addr=server.address();
	var bind= typeof addr =='string'
	?'pipe' +address
	:'port'+addr.port;
	console.log('Listening on'+bind);
}