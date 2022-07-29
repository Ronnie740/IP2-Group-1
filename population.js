var cont1, cont2, cont3, space;
// var cont4 = document.getElementById("cont4").value;

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "acc1d482bdmsh4e87efa6aba44c1p18c85cjsn8b71eb3b3f4b",
		"X-RapidAPI-Host": "world-population.p.rapidapi.com",
	},
};
function getText() {
	cont1 = document.getElementById("cont1").value;
	cont2 = document.getElementById("cont2").value;
	cont3 = document.getElementById("cont3").value;
	space = document.getElementById("space");
	space.classList.remove("hidden");
	Promise.all([
		fetch("https://world-population.p.rapidapi.com/population?country_name=" + cont1, options),
		fetch("https://world-population.p.rapidapi.com/population?country_name=" + cont2, options),
		fetch("https://world-population.p.rapidapi.com/population?country_name=" + cont3, options),
	])
		.then(function (responses) {
			// Get a JSON object from each of the responses
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then(function (data) {
			// Log the data to the console
			// You would do something with both sets of data here
			console.log(data);
			const mu_pop = data[0].body.population;
			const ken_pop = data[1].body.population;
			const uk_pop = data[2].body.population;
			const mu_country = data[0].body.country_name;
			const ken_country = data[1].body.country_name;
			const uk_country = data[2].body.country_name;
			const label = ["Countries"];
			const mu_bg = ["red"];
			const ken_bg = ["blue"];
			console.log(mu_pop);
			console.log(ken_pop);
			console.log(mu_country);
			console.log(ken_country);
			console.log(uk_pop);
			console.log(uk_country);

			if (document.getElementById("space").hasChildNodes) {
				document.getElementById("space").removeChild(document.getElementById("space").childNodes[0]);
				document.getElementById("space").innerHTML =
					'<canvas id="myChart" class="w-full" width="2223" height="1110" style="display: block; box-sizing: border-box; height: 555px; width: 1111.5px"></canvas>';
			}
			const ctx = document.getElementById("myChart").getContext("2d");
			const myChart = new Chart(ctx, {
				type: "bar",
				data: {
					labels: label,
					datasets: [
						{
							label: mu_country,
							data: [mu_pop, 0, 0],
							backgroundColor: mu_bg,
							borderColor: mu_bg,
							borderWidth: 1,
						},
						{
							label: ken_country,
							data: [ken_pop, 0, 0],
							backgroundColor: ken_bg,
							borderColor: ken_bg,
							borderWidth: 1,
						},
						{
							label: uk_country,
							data: [uk_pop, 0, 0],
							backgroundColor: "green",
							borderColor: "green",
							borderWidth: 1,
						},
					],
				},
				options: {
					elements: {
						line: {
							tension: 1,
						},
					},
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		})
		.catch(function (error) {
			// if there's an error, log it
			console.log(error);
		});
}
