const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongooseeder = require('mongooseeder');
const models = require('../models/index');
const {
	Student,
	Teacher,
	Profile,
	Classroom,
	Task,
	AssignedTask,
	PointReward,
	LootReward
} = models;
const mongodbUrl = 'mongodb://localhost/final_project';
const faker = require('faker');

const { RewardEvent, Messages } = require('../models/events');

mongooseeder.seed({
	mongodbUrl: mongodbUrl,
	models: models,
	clean: false,
	mongoose: mongoose,
	seeds: () => {
		let students = [];
		let teachers = [];
		let profiles = [];
		let classrooms = [];
		let tasks = [];
		let rewards = [];
		let events = [];

		// Students.
		for (let s = 0; s < 5; s++) {
			process.stdout.write('.');
			const student = new Student({
				email: `student${s + 1}@learn.com`,
				password: 'foo',
				profile: new Profile({
					title: '',
					displayName: '<Cool Display Name Here>',
					avatar: faker.image.avatar(),
					gender: !!Math.round(Math.random()) ? 'M' : 'F',
					fname: faker.name.firstName(),
					lname: faker.name.lastName()
				}),
				classrooms: [],
				tasks: [],
				rewards: [],
				notifications: []
			});
			profiles.push(student.profile);
			students.push(student);
		}

		// Teachers.
		for (let t = 0; t < 5; t++) {
			process.stdout.write('.');
			const teacher = new Teacher({
				email: `teacher${t + 1}@teach.com`,
				password: 'foo',
				about: "I'm an awesome teacher bruh",
				profile: new Profile({
					title: faker.name.title(),
					displayName: '<Cool Display Name Here>',
					avatar: faker.image.avatar(),
					gender: !!Math.round(Math.random()) ? 'M' : 'F',
					fname: faker.name.firstName(),
					lname: faker.name.lastName()
				}),
				classrooms: [],
				tasks: [],
				rewards: [],
				notifications: []
			});
			profiles.push(teacher.profile);
			teachers.push(teacher);
		}

		// Classrooms.
		for (let c = 0; c < 5; c++) {
			process.stdout.write('.');
			const classroom = new Classroom({
				title: faker.company.companyName(),
				description: faker.lorem.paragraph(),
				students,
				teachers
			});
			classrooms.push(classroom);
		}

		// Rewards.
		for (let r = 0; r < 5; r++) {
			process.stdout.write('.');
			const pointReward = new PointReward({
				title: faker.company.companyName(),
				description: faker.lorem.paragraph(),
				value: Math.round(Math.random() * 10 + 1),
				teacher: teachers[0]
			});

			rewards.push(pointReward);
			let rewardEvent = new RewardEvent({
				message: 'This is a test event!',
				owner: students[0].toObject(),
				reward: pointReward.toObject()
			});
			events.push(rewardEvent);

			process.stdout.write('.');
			const lootReward = new LootReward({
				title: faker.company.companyName(),
				description: faker.lorem.paragraph(),
				value: Math.round(Math.random() * 10 + 1),
				teacher: teachers[0]
			});

			rewards.push(lootReward);
			rewardEvent = new RewardEvent({
				message: 'This is a test event!',
				owner: students[0].toObject(),
				reward: lootReward.toObject()
			});
			events.push(rewardEvent);
		}

		// Tasks.
		for (let t = 0; t < 5; t++) {
			process.stdout.write('.');
			const task = new Task({
				title: faker.lorem.word(),
				description: faker.lorem.paragraph(),
				rewards,
				teacher: teachers[0],
				class: classrooms[0]
			});
			tasks.push(task);
		}

		classrooms[0].students = [...students];
		classrooms[1].students = [...students];

		teachers = teachers.map(teacher => {
			teacher.classrooms = [classrooms[0], classrooms[1]];
			teacher.tasks = [...tasks];
			teacher.rewards = [...rewards];
			return teacher;
		});

		students = students.map(student => {
			student.classrooms = [classrooms[0], classrooms[1]];
			student.rewards = [...rewards];
			return student;
		});

		const promiseArr = [];
		[
			students,
			teachers,
			classrooms,
			profiles,
			tasks,
			rewards,
			events
		].forEach(models =>
			models.forEach(model => {
				return promiseArr.push(model.save());
			})
		);
		return Promise.all(promiseArr);
	}
});
