import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");

export const emitLogin = id => {
	socket.emit("login", id);
};

export const assignTask = id => {
	socket.emit("assign", id);
};

export const getNotifications = callback => {
	socket.on("notification", callback);
};
