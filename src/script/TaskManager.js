class TaskManager {

	constructor() {

		let $ = document.querySelector.bind(document)
		this._usernameContainer = $('#catchUsernameID')
		this._usernameInput = $('#catchUsernameID #containerID #nameContainerID input')
		this._usernamePElement = $('#usernameContainerID p')
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
			this._tasksDoneElement.appendChild(e.taskElement);
		});

		this.save()
	}

	addTask(e) {

		e.preventDefault()
		if (this._addInputElement.value.trim() === '') return
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

	catchUsername(e) {
		e.preventDefault()
		if (this._usernameInput.value.trim() === '') return

		this._usernamePElement.innerHTML = this._usernameInput.value
		this._usernameContainer.style['display'] = "none"
		this._storage.setItem('username', this._usernameInput.value)
		this._addInputElement.focus()
	}

	save() {

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

		let dones = []
		this._tasksDoneList.taskList.forEach(t => {
			let done = {
				color: t.color,
				data: t.data,
				text: t.text,
				status: t.status
			}
			dones.push(done)
		})
		this._storage.setItem('dones', JSON.stringify(dones))

	}

	load() {

		if (this._storage.getItem('username') != null) {
			this._usernameContainer.style['display'] = "none"
			this._usernamePElement.innerHTML = this._storage.getItem('username')
			this._addInputElement.focus()
		} else {
			this._usernameContainer.style['display'] = "flex"
			this._usernameInput.focus()
		}

		this._tasksToDoList = new TaskList([])
		this._tasksDoneList = new TaskList([])

		let todos = JSON.parse(this._storage.getItem('todos'))
		if (todos != null) {
			todos.forEach(todo => {
				this._tasksToDoList.addTask(todo)
			})
		}

		let dones = JSON.parse(this._storage.getItem('dones'))
		if (dones != null) {
			dones.forEach(done => {
				this._tasksDoneList.finishTask(done)

			})

		}
		this.render()
	}

	changeColor(element) {

		this._tasksToDoList.taskList.forEach((e, index) => {
			if (e.taskElement === element) {
				this._tasksToDoList.taskList[index].color =
					Color.nextColor(this._tasksToDoList.taskList[index]
						.taskElement.style['backgroundColor'])
				this._tasksToDoList.taskList[index]
					.taskElement.style['backgroundColor'] = this._tasksToDoList.taskList[index].color
			}
		})
		this.save()
	}

	clearStorage() {
		// for development only
		this._storage.clear()
	}



	changeUsername(container) {
		container.onmouseover = ""
		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'none'
		$('.edit').style['display'] = 'none'
		$('form').style['display'] = 'flex'
		$('form input').value = ''
		$('form input').focus()
	}

	confirmUsername(container) {
		container.onmouseover = function () { this.querySelector('div .edit').style['display'] = 'flex' }
		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'flex'
		$('form').style['display'] = 'none'
		if ($('form input').value.trim() === '') return
		$('p').innerHTML = $('form input').value
		this._storage.setItem('username', $('form input').value)
		this._addInputElement.focus()
	}

	cancelChangeUsername(container) {
		container.onmouseover = function () { this.querySelector('div .edit').style['display'] = 'flex' }
		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'flex'
		$('form').style['display'] = 'none'
	}
}