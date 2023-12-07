const update = document.querySelector('#update-watch');
const deleteButton = document.querySelector('#delete-media');

deleteButton.addEventListener('click', (_) => {
	fetch('/mediaTitles', {
		method: 'delete',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: { title },
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((data) => {
			window.location.reload();
		});
});
