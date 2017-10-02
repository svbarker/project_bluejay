const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ClassroomSchema = new mongoose.Schema(
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

ClassroomSchema.plugin(uniqueValidator);

const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;
