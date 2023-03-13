const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(form);

	try {
		const response = await fetch("/main", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.fromEntries(formData.entries())),
		});

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
});
