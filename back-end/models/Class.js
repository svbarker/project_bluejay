const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const ClassSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			required: true
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}
		],
		teachers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher'
			}
		]
	},
	{
		timestamps: true
	}
);

ClassSchema.plugin(uniqueValidator);

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
