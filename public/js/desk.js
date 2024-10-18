const getPendingTicket = async () => {
	const pendantTickets = await fetch('/api/ticket/pendant')
		.then((response) => response.json())
		.catch((error) => console.log(error));

	document.querySelector('#lbl-pending').innerHTML = pendantTickets.data.length || 0;
};

function connectToWebSockets() {
	const socket = new WebSocket('ws://localhost:3000/ws');

	socket.onmessage = (event) => {
		const { type, payload } = JSON.parse(event.data);
		if (type === 'on-ticket-count-changed') document.querySelector('#lbl-pending').innerHTML = payload;
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

(async () => {
	await getPendingTicket();
	connectToWebSockets();
})();
