function connectToWebSockets() {
	const socket = new WebSocket('ws://localhost:3000/ws');

	socket.onmessage = async (event) => {
		const { type, payload } = JSON.parse(event.data);
		if (type === 'on-assign-ticket') renderTickets(payload);
		/* console.log(event.data); */ //on-ticket-count-changed
	};

	socket.onclose = (event) => {
		console.log('Connection closed');
		setTimeout(() => {
			console.log('retrying to connect');
			connectToWebSockets();
		}, 1500);
	};

	socket.onopen = (event) => {
		console.log('Connected');
	};
}

const renderTickets = (tickets = []) => {
	if (tickets.length > 0) {
		tickets.map((ticket, index) => {
			document.querySelector(`#lbl-ticket-${index}`).innerHTML = `Ticket ${ticket.number}`;
			document.querySelector(`#lbl-desk-${index}`).innerHTML = `Desk ${ticket.handleAtDesk}`;
		});
	}
};

const getWorkingOn = async () => {
	const workingOn = await fetch('/api/ticket/workingOn')
		.then((response) => response.json())
		.catch((error) => console.log(error));

	renderTickets(workingOn.data);

	// return workingOn.data;
};

(async () => {
	connectToWebSockets();
	await getWorkingOn();
})();
