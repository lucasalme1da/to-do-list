class Task {

	constructor(text) {

		this._color = '#6fcf97'
		this._data = new Date()
		this._text = text
		this._status = true
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
		element.className = 'tasks'
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