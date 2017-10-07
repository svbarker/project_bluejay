module.exports = io => (req, res) => {
	console.log("wtf");
	const router = require(`./${req.params.resource}`);
	router.socket = io;
	router(req, res);
};
