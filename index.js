var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(3020);
console.log("Server is running...");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});

var arruser = [];
var kttontai = true;

//Bắt sự kiện kết nối
io.sockets.on('connection', function(socket) {
	console.log("co thiet bi ket noi");
	//server lắng nghe
	socket.on('client-register-user', function(data){
		console.log(data);
		if(arruser.indexOf(data) == -1){
			arruser.push(data);
			kttontai = false;
			console.log("Dang ky thanh cong: " + data);
			socket.emit('server-send-result',{ketqua: kttontai});
		}else{
			kttontai = true;
			console.log("Da ton tai user: "+ data);
		}
		//tất cả kết nối đều thấy
		// io.sockets.emit('server-send-data', {noidung : data});
	});
});
