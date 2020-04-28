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
		this._storage = localStorage
		this.load()

	}

	render() {

		this._tasksToDoElement.innerHTML = ''
		this._tasksToDoList.taskList.forEach(e => {
			this._tasksToDoElement.appendChild(e.taskElement);
		});

		this._tasksDoneElement.innerHTML = ''
		this._tasksDoneList.taskList.forEach(e => {
			console.log('preenchendo');

			this._tasksDoneElement.appendChild(e.taskElement);
		});

		this.save()
	}

	addTask(e) {

		e.preventDefault()
		if (this._addInputElement.value === '') return
		this._tasksToDoList.addTask({ text: this._addInputElement.value })
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

	deleteTask(element) {

		this._tasksDoneList.taskList.forEach((e, index) => {
			if (e.taskElement === element) {
				this._tasksDoneList.taskList.splice(index, 1)
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

	save() {
		// salvar nome do usuario
		// criar um array com as propriedades de cada task e salvar
		let todos = []
		this._tasksToDoList.taskList.forEach(t => {
			let todo = {
				color: t.color,
				data: t.data,
				text: t.text,
				status: t.status
			}
			todos.push(todo)
		})
		this._storage.setItem('todos', JSON.stringify(todos))
		// this._tasksToDoList.addTask()
		// console.log(JSON.stringify(this._tasksToDoList.taskList[0]));
		// this._tasksToDoList.addTask(JSON.parse(JSON.stringify(this._tasksToDoList.taskList[0])))
		// this._storage.setItem('tasks', JSON.stringify([...this._tasksToDoList.taskList]))


		// this._storage.clear()

	}

	load() {
		// this._storage.clear()

		this._tasksToDoList = new TaskList([])
		this._tasksDoneList = new TaskList([])

		let todos = JSON.parse(this._storage.getItem('todos'))
		if (todos != null) {
			todos.forEach(todo => {
				this._tasksToDoList.addTask(todo)
			})
			this.render()
		}


	}
}