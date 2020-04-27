class TaskManager {

	constructor() {
		let $ = document.querySelector.bind(document)
		this._tasksToDoElement = $('#tasksToDoID')
		this._addButonElement = $('#buttonID')
		this._addInputElement = $('#inputID')
		this._tasksToDoList = new TaskList()
		this._tasksDoneList = new TaskList()
	}

	render() {
		// this._tasksToDoElement.innerHTML = '' //limpa tasks
		this._tasksToDoList.taskList.forEach(e => {
			this._tasksToDoElement.appendChild(e.taskElement);

		});

		// Pegar lista de tasks
		// renderizar lista de tasks to do e tasks done
	}

	addTaskToDo(e) {
		e.preventDefault()
		if (this._addInputElement.value === '') return

		this._tasksToDoList.addTask(this._addInputElement.value)
		this.render()

		this._addInputElement.value = ''
	}
}