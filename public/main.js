const update = document.querySelector('#update-watch');
const deleteButton = document.querySelectorAll('.delete-btn');

deleteButton.forEach((button) => {
	button.addEventListener('click', (event) => {
		const movieId = event.target.getAttribute('data-id');
		fetch(`/mediaTitles/${movieId}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (res.ok) return res.json();
				throw new Error('Movie deletion failed');
			})
			.then((data) => {
				window.location.reload();
			})
			.catch((error) => console.error(error));
	});
});
