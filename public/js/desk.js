const searchParams = new URLSearchParams(window.location.search);

const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const ticketAlert = document.querySelector('.alert');
const btnDone = document.querySelector('#btn-done');
const btnAssign = document.querySelector('#btn-assign');
const lblCurrentLabel = document.querySelector('#currentTicket');
const lblNoTicket = document.querySelector('#no-ticket');

let workingTicket = null;

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('Desktop is required');
}

const deskNumber = searchParams.get('escritorio');
deskHeader.innerHTML = `Desk ${deskNumber}`;

const checkTicketCount = async (currentCount = 0) => {
	if (currentCount === 0) {
		ticketAlert.classList.remove('d-none');
	} else {
		ticketAlert.classList.add('d-none');
	}
	lblPending.innerHTML = currentCount;
};

const getPendingTicket = async () => {
	const pendantTickets = await fetch('/api/ticket/pendant')
		.then((response) => response.json())
		.catch((error) => console.log(error));
	checkTicketCount(pendantTickets.data.length);
};

function connectToWebSockets() {
	const socket = new WebSocket('ws://localhost:3000/ws');

	socket.onmessage = (event) => {
		const { type, payload } = JSON.parse(event.data);
		if (type === 'on-ticket-count-changed') checkTicketCount(payload);
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

const handleDone = async () => {
	await fetch(`/api/ticket/done/${workingTicket}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
	workingTicket = null;
	toggleElements([lblNoTicket, btnAssign], [lblCurrentLabel, btnDone]);
};

const assignTicket = async () => {
	const response = await fetch(`/api/ticket/assign/${deskNumber}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
	if (response) {
		workingTicket = response.data.id;
		lblCurrentLabel.innerHTML = `Atendiento ticket ${response.data.number}`;
		toggleElements([lblCurrentLabel, btnDone], [lblNoTicket, btnAssign]);
	}
};

const toggleElements = (elementsToShow, elementsToHide) => {
	elementsToShow.forEach((element) => element.classList.remove('d-none'));
	elementsToHide.forEach((element) => element.classList.add('d-none'));
};

(async () => {
	connectToWebSockets();
	await getPendingTicket();
})();


