class Task {

	constructor(task) {

		this._color = task.color ?? '#6fcf97'
		this._data = task.data ? new Date(`${task.data}`) : new Date()
		this._text = task.text ?? ':D'
		this._status = task.status ?? true
		this._taskElement = this.createElement()
		// this._color = '#6fcf97'
		// this._data = new Date()
		// this._text = text
		// this._status = true
		// this._taskElement = this.createElement()
	}

	get color() {
		return this._color
	}

	get data() {
		return this._data
	}

	get text() {
		return this._text
	}

	get status() {
		return this._status
	}

	get taskElement() {
		return this._taskElement
	}


	fullMonth() {
		let month = this._data.getMonth()
		return [9, 10, 11].includes(month) ? month + 1 : '0' + (month + 1)
	}

	createElement() {
		let element = document.createElement('div')
		element.className = 'tasks'
		element.style = `background-color: ${this._color};`

		element.innerHTML = `
		<div id="taskHeaderID" class="taskHeader">
			<div id="changeColorButtonID" class="changeColorButton"></div>
			<p id="taskDateID">
			${this._data.getDate()}/${this.fullMonth()}
			</p>
		</div>
		<div class="taskContent">
			<p id="taskContentID">${this._text}</p>
		</div>
		<button class="doneButton" onclick="taskManager.finishTask(this.parentElement)"><p>done!</p></button>
				`
		element.addEventListener('mouseenter', () => {
			element.querySelector('button').animate([
				{
					opacity: 0,
					width: "0px"
				},
				{
					opacity: 1,
					width: "74px"
				}
			], {
				duration: 200,
				fill: "forwards"
			})
		}, false)

		element.onmouseleave = () => {
			element.querySelector('button').animate([
				{
					opacity: 1,
					width: "74px"
				},
				{
					opacity: 0,
					width: "0px"
				}
			], {
				duration: 200,
				fill: "forwards"
			})

		}
		return element
	}


}