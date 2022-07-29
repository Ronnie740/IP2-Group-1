// https://api.covid19api.com/dayone/country/mauritius/status/confirmed/live
function getCovTxt() {
	const cov1 = document.getElementById("cov1").value;

	// test
	Promise.all([fetch("https://api.covid19api.com/dayone/country/" + cov1), fetch("https://api.covid19api.com/summary")])
		.then(function (responses) {
			// Get a JSON object from each of the responses
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then(function (data) {
			const country = data[1].Countries.map((country) => country.Country);
			const slug = data[1].Countries.map((country) => country.Slug);

			var confirmed, deaths;
			var test = country.length;
			if ($("#api_info").hasChildNodes) {
				$("#api_info").removeChild($("#api_info").childNodes[0]);
			}
			for (let i = 0; i < test; i++) {
				if (country[i] == cov1 || slug[i] == cov1) {
					confirmed = data[1].Countries[i].TotalConfirmed;
					deaths = data[1].Countries[i].TotalDeaths;
					console.log(confirmed + " " + deaths);
					console.log(i);
					console.log(country[i]);
					$("#api_info").addClass("flex justify-center my-5 text-2xl font-bold");
					$("#api_info").html(
						`
            <div class=" col-span-1 mx-auto ">
                    <p class="text-center">Confirmed <br /> Cases: <br /> ${confirmed.toLocaleString()}</p>
            </div>`
					);
					break;
				}
			}

			const date = data[0].map((data) => data.Date);
			// console.log(date);

			// const confirmed = data.map((data) => data.Confirmed);
			const confirmed2 = data[0].map((day, index) => {
				if (index) return Math.abs(day.Confirmed - data[0][index - 1].Confirmed);
				else day.Confirmed;
			});
			// console.log(confirmed2);
			// console.log(data);
			$("#space").removeClass("hidden");
			if (document.getElementById("space").hasChildNodes) {
				document.getElementById("space").removeChild(document.getElementById("space").childNodes[0]);
				document.getElementById("space").innerHTML =
					'<canvas id="myChart" class="w-full" width="2223" height="1110" style="display: block; box-sizing: border-box; height: 555px; width: 1111.5px"></canvas>';
			}

			const ctx = document.getElementById("myChart").getContext("2d");
			const myChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: date,
					datasets: [
						{
							label: "Daily Covid Cases",
							data: confirmed2,
							backgroundColor: "#c57dff",
							borderColor: "#8805f2",
							borderWidth: 2,
							fill: true,
						},
					],
				},
				options: {
					elements: {
						line: {
							tension: 0,
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
		});
}
