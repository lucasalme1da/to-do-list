class ToDo extends Task {

	constructor(task) {

		super(task)
		this._taskElement = this.createElement()
	}

	createElement() {

		let element = document.createElement('div')
		element.className = 'tasks'
		element.style["backgroundColor"] = this._color
		element.innerHTML = `
			<div id="taskHeaderID" class="taskHeader">
				<div id="changeColorButtonID" class="changeColorButton"></div>
				<p id="taskDateID">${this.fullDate()}/${this.fullMonth()}</p></div>
			<div class="taskContent"><p id="taskContentID">${this._text}</p></div>
			<button class="doneButton" onclick="taskManager.finishTask(this.parentElement)"><p>done!</p></button>`

		element.draggable = true

		element.ondrag = event => {
			taskManager.dragging = true
			this.handleDrag(event)
		}

		element.ondragover = event => {
			event.preventDefault();
		}

		element.ondragend = event => {
			this.handleDrop(event)
			setTimeout(() => { taskManager.dragging = false }, 100)
		}

		element.onmouseenter = () => {
			if (!taskManager.dragging && screen.width > 380) {
				element.animate([{
					boxShadow: "0px 0px var(--dark-grey-color)"
				},
				{
					boxShadow: "4px 4px var(--dark-grey-color)"
				}
				], {
					duration: 200,
					fill: "forwards"
				})

				element.querySelector('button').animate([{
					opacity: 0, width: "0px"
				},
				{
					opacity: 1, width: "74px"
				}
				], {
					duration: 50,
					fill: "forwards"
				})
			}
		}

		element.onmouseleave = () => {
			if (!taskManager.dragging && screen.width > 380) {
				element.animate([{
					boxShadow: "4px 4px var(--dark-grey-color)"
				},
				{
					boxShadow: "0px 0px var(--dark-grey-color)"
				}
				], {
					duration: 50,
					fill: "forwards"
				})

				element.querySelector('button').animate([
					{
						opacity: 1, width: "74px"
					},
					{
						opacity: 0, width: "0px"
					}
				], {
					duration: 200,
					fill: "forwards"
				})
			}
		}

		element.onclick = function () { taskManager.changeColor(this) }

		return element
	}

	handleDrag(event) {

		let selectedElement = event.target
		let list = selectedElement.parentNode
		let x = event.clientX
		let y = event.clientY
		let currentTarget = document.elementFromPoint(x, y) === null ? selectedElement : document.elementFromPoint(x, y);

		selectedElement.classList.add('selectedTask')


		if (list === currentTarget.parentNode) {

			currentTarget = currentTarget !== selectedElement.nextSibling ? currentTarget : currentTarget.nextSibling;
			list.insertBefore(selectedElement, currentTarget);

			taskManager.rearrengeToDoList(list)
		}
	}

	handleDrop(event) {

		event.target.classList.remove('selectedTask')
	}
}