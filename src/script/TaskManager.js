class TaskManager {

	constructor() {

		let $ = document.querySelector.bind(document)
		this._tasksDoneContainer = $('#tasksDoneContainerID')
		this._tasksToDoElement = $('#tasksToDoID')
		this._tasksDoneElement = $('#tasksDoneID')
		this._addButonElement = $('#buttonID')
		this._addInputElement = $('#inputID')
		this._showFinishedButton = {
			element: $('#showFinishedButtonID'), state: 'unshowing'
		}
		this._tasksToDoList = new TaskList()
		this._tasksDoneList = new TaskList()
	}

	render() {

		this._tasksToDoElement.innerHTML = ''
		this._tasksToDoList.taskList.forEach(e => {
			this._tasksToDoElement.appendChild(e.taskElement);
		});

		this._tasksDoneList.taskList.forEach(e => {
			this._tasksDoneElement.appendChild(e.taskElement);
		});
	}

	addTaskToDo(e) {

		e.preventDefault()
		if (this._addInputElement.value === '') return
		this._tasksToDoList.addTask(this._addInputElement.value)
		this.render()
		this._addInputElement.value = ''
	}

	finishTask(element) {

		this._tasksToDoList.taskList.forEach((e, index) => {
			if (e.taskElement === element) {
				this._tasksDoneList.finishTask(e)
				this._tasksToDoList.taskList.splice(index, 1)
			}
		})
		this.render()
	}

	showFinishedTasks() {

		if (this._showFinishedButton.state === 'unshowing') {
			this._showFinishedButton.state = 'showing'
			this._showFinishedButton.element.innerHTML = '<p>Unshow Finished</p>'
			this._tasksDoneContainer.style["display"] = "flex"
		} else {
			this._showFinishedButton.state = 'unshowing'
			this._showFinishedButton.element.innerHTML = '<p>Show Finished</p>'
			this._tasksDoneContainer.style["display"] = "none"
		}
	}
}