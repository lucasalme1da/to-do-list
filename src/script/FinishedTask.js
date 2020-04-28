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

	fullMonth() {
		let month = this._data.getMonth()
		return [9, 10, 11].includes(month) ? month + 1 : '0' + (month + 1)
	}


	createElement() {
		let element = document.createElement('div')
		element.className = 'finishedTasks'
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
		<button class="doneButton" onclick="taskManager.deleteTask(this.parentElement)"><p>delete</p></button>
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