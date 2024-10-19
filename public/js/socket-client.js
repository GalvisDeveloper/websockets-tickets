const connectToWebSockets = ({ onMessage }) => {
	const socket = new WebSocket('ws://localhost:3000/ws');
	socket.onmessage = (event) => {
		// console.log(event.data);
		onMessage && onMessage(event);
	};
	socket.onclose = (event) => {
		console.log('Connection closed');
		setTimeout(() => {
			console.log('retrying to connect');
			connectToWebSockets({ onMessage });
		}, 1500);
	};
	socket.onopen = (event) => {
		console.log('Connected');
	};
};
