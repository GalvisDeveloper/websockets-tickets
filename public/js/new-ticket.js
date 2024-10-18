const getLastTicket = async () => {
	try {
		const response = await fetch('/api/ticket/last');
		const data = await response.json();

		if (data?.data) {
			document.querySelector('#lbl-new-ticket').innerText = `Ticket ${data.data}`;
		}

		return data;
	} catch (error) {
		console.log(error);
	}
};

const createTicket = async () => {
	try {
		const response = await fetch('/api/ticket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();

		if (data?.data) {
			document.querySelector('#lbl-new-ticket').innerText = `Ticket ${data.data.number}`;
		}

		return data;
	} catch (error) {
		console.log(error);
	}
};

(async () => {
	await getLastTicket();
})();
