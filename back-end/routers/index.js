module.exports = io => (req, res) => {
	const router = require(`./${req.params.resource}`);
	router.socket = io;
	router(req, res);
};
