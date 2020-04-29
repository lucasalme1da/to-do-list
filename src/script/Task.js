class Task {

	constructor(task) {

		this._color = task.color ?? '#bbbbbb'
		this._data = task.data ? new Date(`${task.data}`) : new Date()
		this._text = task.text ?? ':D'
		this._status = task.status ?? true
	}

	get color() {

		return this._color
	}

	set color(c) {
		this._color = c
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
}