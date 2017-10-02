const router = require('express').Router();
const { Teacher, Profile } = require('../models');
const { createResponse } = require('../server/util');

// creating a teacher
router.post('/', async (req, res) => {
	try {
		const { email, password, title, fname, lname, gender } = req.body;
		const teacher = new Teacher({ email, password });
		const profileParams = {
			title,
			displayName: email.split('@')[0],
			avatar: null,
			gender,
			fname,
			lname
		};
		const profile = new Profile(profileParams);
		teacher.profile = profile;
		await teacher.save();
		await profile.save();
		await req.login(teacher, () => {});
		res.json(createResponse(teacher));
	} catch (error) {
		console.error(error);
		res.json(createResponse(error));
	}
});

// reading a teacher
router.get('/:id', async (req, res) => {
	try {
		const _id = req.params.id;
		const teacher = await Teacher.findById(_id);
		res.json(createResponse(teacher));
	} catch (error) {
		res.json(createResponse(error));
	}
});

// updating a teacher
router.patch('/:id', async (req, res) => {
	try {
		const { updates } = req.body;
		const _id = req.params.id;
		const teacher = await Teacher.findByIdAndUpdate(_id, updates);
		res.json(createResponse(teacher));
	} catch (error) {
		console.error(error);
		res.json(createResponse(error));
	}
});

// deleting a teacher
router.delete('/:id', async (req, res) => {
	try {
		const _id = req.params.id;
		const teacher = await Teacher.findByIdAndRemove(_id);
		res.json(createResponse(teacher));
	} catch (error) {
		console.log(error);
		res.json(createResponse(error));
	}
});

module.exports = router;
