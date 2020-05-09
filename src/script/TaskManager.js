class TaskManager {

	constructor() {

		let $ = document.querySelector.bind(document)

		this._title = $('title')
		this._usernameContainer = $('#catchUsernameID')
		this._usernameInput = $('#catchUsernameID #containerID #nameContainerID input')
		this._usernamePElement = $('#usernameContainerID p')
		this._tasksDoneContainer = $('#tasksDoneContainerID')
		this._tasksToDoElement = $('#tasksToDoID')
		this._tasksDoneElement = $('#tasksDoneID')
		this._addButonElement = $('#buttonID')
		this._addInputElement = $('#inputID')
		this._showFinishedButton = { element: $('#showFinishedButtonID'), state: 'unshowing' }
		this._storage = localStorage
		this._dragging = false

		this.load()
	}

	set dragging(status) {

		this._dragging = status
	}

	get dragging() {

		return this._dragging
	}

	render() {

		this._tasksToDoElement.innerHTML = ''
		this._tasksToDoList.taskList.forEach(e => {
			this._tasksToDoElement.appendChild(e.taskElement);
		});

		this._tasksDoneList.taskList.length === 0 ?
			this.toggleFinishedButton(false) : this.toggleFinishedButton(true)

		this._tasksDoneElement.innerHTML = ''
		this._tasksDoneList.taskList.forEach(e => {
			this._tasksDoneElement.appendChild(e.taskElement);
		});

		this.save()
	}

	toggleFinishedButton(status) {

		if (!this.dragging) {
			let button = this._showFinishedButton
			if (status) {
				button.element.disabled = false
				button.element.classList = 'showFinishedButton'
			} else {
				button.element.disabled = true
				button.element.classList = 'disabledButton'
				button.state = 'showing'
				this.showFinishedTasks()
			}
		}

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

		let button = this._showFinishedButton
		if (button.state === 'unshowing') {
			button.state = 'showing'
			button.element.innerHTML = '<p>Unshow Finished</p>'
			this._tasksDoneContainer.style["display"] = "flex"
		} else {
			button.state = 'unshowing'
			button.element.innerHTML = '<p>Show Finished</p>'
			this._tasksDoneContainer.style["display"] = "none"
		}
	}

	catchUsername(e) {

		e.preventDefault()
		if (this._usernameInput.value.trim() === '') return
		this._usernamePElement.innerHTML = this._usernameInput.value
		this._usernameContainer.style['display'] = "none"
		this._storage.setItem('username', this._usernameInput.value)
		this.changeTitle(this._usernameInput.value)
		this._addInputElement.focus()
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

	changeUsername(container) {

		container.onmouseover = ""

		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'none'
		$('.edit').style['display'] = 'none'
		$('form').style['display'] = 'flex'
		$('form input').value = this._usernamePElement.innerHTML
		$('form input').focus()
		$('form input').select()

		document.addEventListener("click", e => {
			if (e.target !== $('form input') && e.target !== $('.edit img')) {
				this.cancelChangeUsername(container)
			}
		}, false)
	}

	confirmUsername(container) {

		container.onmouseover = function () { this.querySelector('div .edit').style['display'] = 'flex' }

		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'flex'
		$('form').style['display'] = 'none'
		if ($('form input').value.trim() === '') return
		$('p').innerHTML = $('form input').value

		this._storage.setItem('username', $('form input').value)
		this.changeTitle($('form input').value)
		this._addInputElement.focus()
	}

	cancelChangeUsername(container) {

		container.onmouseover = function () { this.querySelector('div .edit').style['display'] = 'flex' }

		let $ = container.querySelector.bind(container)
		$('p').style['display'] = 'flex'
		$('form').style['display'] = 'none'
		document.removeEventListener("click", e => {
			if (e.target !== $('form input') && e.target !== $('.edit img')) {
				this.cancelChangeUsername(container)
			}
		}, false)
	}

	changeTitle(text) {
		this._title.innerHTML = `To-Do • ${text}`
	}

	rearrengeToDoList(list) {

		let newSortedElements = [...this._tasksToDoElement.children]
		let newSortedList = []

		newSortedElements.map(task => {
			this._tasksToDoList.taskList.forEach(
				item => {
					if (task === item.taskElement)
						newSortedList.push(item)
				}
			)
		})

		this._tasksToDoList.taskList = newSortedList
		this.render()
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

		let user = this._storage.getItem('username')

		if (user != null) {
			this._usernameContainer.style['display'] = "none"
			this._usernamePElement.innerHTML = user
			this.changeTitle(user)
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

	clearStorage() {
		// for development only
		this._storage.clear()
	}
}