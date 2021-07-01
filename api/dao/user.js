export default class user {

	constructor() {}

	get getId() {
		return this.id
	}

	set setId(value) {
		this.id = value
	}

	get getName() {
		return this.name
	}

	set setName(value) {
		this.name = value
	}

	toString() {
		return {
			id: this.id,
			userName: this.name,
		}
	}
}