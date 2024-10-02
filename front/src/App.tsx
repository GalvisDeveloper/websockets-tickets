import { FormEvent, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';

const socketUrl = 'ws://localhost:3000';

function App() {
	const [statusSocket, setStatusSocket] = useState(false);
	const [message, setMessage] = useState('');
	const [arrMessages, setArrMessages] = useState<string[]>([]);

	const { sendMessage } = useWebSocket(socketUrl, {
		onOpen: () => {
			setStatusSocket(true);
		},
		onClose: () => setStatusSocket(false),
		onMessage: (e) => {
			const payload = JSON.parse(e.data);
			setArrMessages([...arrMessages, payload.data]);
		},
		//Will attempt to reconnect on all close events, such as server shutting down
		shouldReconnect: () => true,
	});

	const send = (e: FormEvent) => {
		e.preventDefault();
		if (message) sendMessage(message);
		setMessage('');
	};

	return (
		<>
			<h1>
				Websockets - <small>{statusSocket ? 'online' : 'disconnect'}</small>
			</h1>
			<form onSubmit={send}>
				<input type='text' placeholder='Send message' value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type='submit'>Send</button>
			</form>

			{arrMessages.length > 0 && (
				<ul id='messages'>
					{arrMessages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			)}
		</>
	);
}

export default App;
