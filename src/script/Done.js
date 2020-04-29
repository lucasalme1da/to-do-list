class Done extends Task {

	constructor(task) {

		super(task)
		this._taskElement = this.createElement()
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
		element.querySelector('button').style['opacity'] = 0
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