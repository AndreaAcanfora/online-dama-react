const express = require("express"),
	http      = require("http"),
	socketIo  = require("socket.io"),
	port      = process.env.PORT || 4001,
	index     = require("./routes/index"),
	app       = express(),
	server    = http.createServer(app),
	io        = socketIo(server);

app.use(index);

io.on("connection", (socket) => {

  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");

  }).on("move", ( msg ) => {

  	console.log( msg );
    socket.broadcast.emit('move', msg);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

