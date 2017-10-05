module.exports = {
	INTERNAL_ERROR: `An internal error occurred: %error.message%.`,

	TEMPLATE_LOGGED_IN: `%owner.profile.displayName% logged in.`,
	TEMPLATE_LOGGED_OUT: `%owner.profile.displayName% logged out.`,
	TEMPLATE_LOGIN_FAILED: `Login attempt with credentials %owner.username% failed.`,

	TEMPLATE_TEACHER_CREATE: `New teacher registered with credentials: %owner.email%, %owner.fname%, %owner.lname%.`,
	TEMPLATE_TEACHER_READ: `Data retrieval for teacher %user.profile.displayName% initiated by %owner.profile.displayName%.`,
	TEMPLATE_TEACHER_TASK_READ: `Task retrieval for teacher %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.taskList%]`,
	TEMPLATE_TEACHER_TASK_ASSIGN_MSG: `%owner.profile.displayName% assigned you a task: %task.title%`,
	TEMPLATE_TEACHER_TASK_CONFIRM_COMPLETION_MSG: `%owner.profile.displayName% confirmed your completion of task: %task.title%`,
	TEMPLATE_TEACHER_TASK_REJECT_COMPLETION_MSG: `%owner.profile.displayName% rejected your completion of task: %task.title%`,
	TEMPLATE_TEACHER_REWARD_READ: `Reward retrieval for teacher %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.rewardList%]`,
	TEMPLATE_TEACHER_REWARD_DISTRIBUTE_MSG: `%owner.profile.displayName% gave you a reward %reward.title%, congratulations!.`,
	TEMPLATE_TEACHER_CLASSROOM_READ: `Classroom retrieval for teacher %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.classroomList%]`,
	TEMPLATE_TEACHER_NOTIFICATION_READ: `Notification retrieval for teacher %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.notificationList%]`,
	TEMPLATE_TEACHER_UPDATE: `%owner.profile.displayName% updated teacher %user.profile.displayName%. [%user.fields%] [%user.values%]`,
	TEMPLATE_TEACHER_DELETE: `%owner.profile.displayName% deleted teacher %user.profile.displayName%.`,

	TEMPLATE_STUDENT_CREATE: `New student registered with credentials: %owner.email%, %owner.fname%, %owner.lname%.`,
	TEMPLATE_STUDENT_READ: `Data retrieval for student %user.profile.displayName% initiated by %owner.profile.displayName%.`,
	TEMPLATE_STUDENT_TASK_READ: `Task retrieval for student %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.taskList%]`,
	TEMPLATE_STUDENT_REWARD_READ: `Reward retrieval for student %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.rewardList%]`,
	TEMPLATE_STUDENT_CLASSROOM_READ: `Classroom retrieval for student %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.classroomList%]`,
	TEMPLATE_STUDENT_NOTIFICATION_READ: `Notification retrieval for student %user.profile.displayName% initiated by %owner.profile.displayName%. [%user.notificationList%]`,
	TEMPLATE_STUDENT_UPDATE: `%owner.profile.displayName% updated student %user.profile.displayName%. [%user.fields%] [%user.values%]`,
	TEMPLATE_STUDENT_DELETE: `%owner.profile.displayName% deleted student %user.profile.displayName%.`,

	TEMPLATE_CLASSROOM_CREATE: `%owner.profile.displayName% created new classroom named %class.title%.`,
	TEMPLATE_CLASSROOM_READ: `Data retrieval for classroom %class.title% initiated by %owner.profile.displayName%.`,
	TEMPLATE_CLASSROOM_STUDENT_READ: `Student retrieval for classroom %classroom.title% initiated by %owner.profile.displayName%. [%classroom.studentList%]`,
	TEMPLATE_CLASSROOM_TEACHER_READ: `Teacher retrieval for classroom %classroom.title% initiated by %owner.profile.displayName%. [%classroom.teacherList%]`,
	TEMPLATE_CLASSROOM_UPDATE: `%owner.profile.displayName% updated classroom %class.title%. [%class.fields] [%class.values%]`,
	TEMPLATE_CLASSROOM_DELETE: `%owner.profile.displayName% deleted %class.title%.`,

	TEMPLATE_PROFILE_CREATE: `Initial profile created for %owner.profile.displayName%.`,
	TEMPLATE_PROFILE_READ: `Data retrieval for profile %profile.title% initiated by %owner.profile.displayName%.`,
	TEMPLATE_PROFILE_UPDATE: `%owner.profile.displayName% updated profile %profile.title%. [%profile.fields] [%profile.values%]`,
	TEMPLATE_PROFILE_DELETE: `%owner.profile.displayName% deleted %profile.title%.`,

	TEMPLATE_TASK_CREATE: `%owner.profile.displayName% created task %task.title% with rewards [%task.rewards].`,
	TEMPLATE_TASK_READ: `Data retrieval for task %task.title% initiated by %owner.profile.displayName%.`,
	TEMPLATE_TASK_STUDENT_READ: `Student retrieval for task %task.title% initiated by %owner.profile.displayName%. [%task.studentList%]`,
	TEMPLATE_TASK_ASSIGN: `%owner.profile.displayName% assigned task %task.title% to %user.profile.displayName%.`,
	TEMPLATE_TASK_CONFIRM_COMPLETION: `%owner.profile.displayName% confirmed completion of task %task.title% for %user.profile.displayName%.`,
	TEMPLATE_TASK_REJECT_COMPLETION: `%owner.profile.displayName% rejected completion of task %task.title% for %user.profile.displayName%.`,
	TEMPLATE_TASK_UPDATE: `%owner.profile.displayName% updated task %task.title%. [%task.fields%] [%task.values%]`,
	TEMPLATE_TASK_DELETE: `%owner.profile.displayName% deleted task %task.title%.`,

	TEMPLATE_REWARD_CREATE: `%owner.profile.displayName% created reward %reward.title%.`,
	TEMPLATE_REWARD_READ: `Data retrieval for reward %reward.title% initiated by %owner.profile.displayName%.`,
	TEMPLATE_REWARD_DISTRIBUTE: `%owner.profile.displayName% distributed reward %reward.title% to %user.profile.displayName%`,
	TEMPLATE_REWARD_UPDATE: `%owner.profile.displayName% updated reward %reward.title%. [%reward.fields%] [%reward.values%]`,
	TEMPLATE_REWARD_DELETE: `%owner.profile.displayName% deleted reward %reward.title%.`,

	TEMPLATE_SEND_MESSAGE: `%owner.profile.displayName% sent a message to %user.profile.displayName%`
};
