class TaskList {

	constructor() {
		this._taskList = []
	}

	get taskList() {
		return this._taskList
	}

	addTask(text) {
		let newTask = new Task(text)
		this._taskList.push(newTask)

	}

	finishTask(task) {
		let finishedTask = new FinishedTask(task)
		this._taskList.push(finishedTask)
	}
}