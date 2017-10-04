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

const autoPopulate = function(next) {
	this.populate([
		{
			path: 'students',
			populate: {
				path: 'profile',
				model: 'Profile'
			}
		},
		{
			path: 'teachers',
			populate: {
				path: 'profile',
				model: 'Profile'
			}
		}
	]);
	next();
};

ClassroomSchema.pre('findOne', autoPopulate);
ClassroomSchema.pre('findOneAndUpdate', autoPopulate);
ClassroomSchema.pre('findOneAndRemove', autoPopulate);

ClassroomSchema.plugin(uniqueValidator);

ClassroomSchema.methods.toString = function() {
	return `${this.title}`;
};

const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;
