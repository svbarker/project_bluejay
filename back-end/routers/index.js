module.exports = (req, res) => require(`./${req.params.resource}`)(req, res);
