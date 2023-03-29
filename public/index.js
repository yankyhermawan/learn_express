const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(form);

	try {
		const response = await fetch("/public/main", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: JSON.stringify(Object.fromEntries(formData.entries())),
		});

		const data = await response.json();
	} catch (error) {
		console.error(error);
	}
});
