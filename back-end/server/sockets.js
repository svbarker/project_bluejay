const socketMap = {};

module.exports = client => {
	console.log("PRE-CORRELATE", client.id);
	client.on("CORRELATE_SOCKET", function(data) {
		console.log("POST-CORRELATE", this.id);
		socketMap[userId] = client;
		delete socketMap[this.id];
	});
	socketMap[client.id] = client;
};

// {
// userId => client,
// userId => client,
// }
