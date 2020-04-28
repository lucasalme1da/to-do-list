class FinishedTask {

	constructor(task) {

		this._color = task.color
		this._data = task.data
		this._text = task.text
		this._status = task.status
		this._taskElement = this.createElement()
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

	createElement() {
		let element = document.createElement('div')
		element.className = 'finishedTasks'
		element.style = `background-color: ${this._color};`

		element.innerHTML = `
		<div id="taskHeaderID" class="taskHeader">
			<div id="changeColorButtonID" class="changeColorButton"></div>
			<p id="taskDateID">
			${this._data.getDate()}/0${this._data.getMonth()}
			</p>
		</div>
		<div class="taskContent">
			<p id="taskContentID">${this._text}</p>
		</div>
				`

		return element
	}


}