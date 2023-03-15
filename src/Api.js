class Api {
	constructor() {
		this.path = "https://api.petiteweb.dev/sber";
	}
	signIn(data){
		return fetch(`${this.path}/evu/auth`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	signUp(data){
		return fetch(`${this.path}/evu/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	recoveryPass(data){
		return fetch(`${this.path}/evu/pwd`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	recoveryPassAnswer(data){
		return fetch(`${this.path}/evu/pwd`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	showEvent() { 
		return fetch(`${this.path}/events/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});
	}
	showEventById(id) { 
		return fetch(`${this.path}/events/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});
	}
	addEvent(data) { 
		return fetch(`${this.path}/events/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	deleteEvent(id){
		return fetch(`${this.path}/events/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export { Api };