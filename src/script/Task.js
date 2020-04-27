class Task {

	constructor(text) {

		this._color = '#6fcf97'
		this._data = new Date()
		this._text = text
		this._status = true
		this._taskElement = document.createElement('div')
		this._taskElement.className = 'tasks'
		this._taskElement.style = `background-color: ${this._color};`
		this._taskElement.innerHTML = `
		<div id="taskHeaderID" class="taskHeader">
			<div id="changeColorButtonID" class="changeColorButton"></div>
			<p id="taskDateID">
			${this._data.getDate()}/${this._data.getDate()}
			</p>
		</div>
		<div class="taskContent">
			<p id="taskContentID">${this._text}</p>
		</div>
		<!-- <div class="doneButton">
		<p id="doneButtonID">done!</p>
	</div> -->
				`
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
}