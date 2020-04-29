class TaskList {

	constructor(list) {

		this._taskList = list
	}

	get taskList() {

		return this._taskList
	}

	addTask(text) {

		let newTask = new ToDo(text)
		this._taskList.push(newTask)

	}

	finishTask(task) {

		let finishedTask = new Done(task)
		this._taskList.push(finishedTask)
	}
}