function getWeatherTxt() {
	const country = document.getElementById("country").value;

	Promise.all([fetch("http://api.weatherapi.com/v1/forecast.json?key=99b6f193ebd642889c5150710221307&q=" + country + "&days=5&aqi=no&alerts=no"), fetch("./icons.json")])
		.then(function (responses) {
			// Get a JSON object from each of the responses
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then((data) => {
			console.log(data[0]);
			console.log(data[1]);
			// console.log(data.current.temp_c);
			const currentTemp = data[0].current.temp_c;
			const currentCondition = data[0].current.condition.text;
			const currentHumidity = data[0].current.humidity;
			const currentWindSpeed = data[0].current.wind_kph;
			const currentDate = data[0].location.localtime;
			var icon = "";

			if (document.getElementById("space1").hasChildNodes) {
				document.getElementById("space1").removeChild(document.getElementById("space1").childNodes[0]);
				document.getElementById("space1").innerHTML = ` <div class="grid lg:grid-cols-3 lg:grid-rows-none grid-rows-3 gap-5 mx-10" id="vis">`;
			}
			//get correct icon
			if (currentCondition.indexOf("rain") != -1 || currentCondition.indexOf("Rain") != -1) {
				icon = data[1].rain;
			} else if (currentCondition.indexOf("sun") != -1 || currentCondition.indexOf("Sun") != -1) {
				icon = data[1].sun;
			} else if (currentCondition.indexOf("cloud") != -1 || currentCondition.indexOf("Cloud") != -1) {
				icon = data[1].cloud;
			} else if (currentCondition.indexOf("wind") != -1 || currentCondition.indexOf("Wind") != -1) {
				icon = data[1].wind;
			} else if (currentCondition.indexOf("snow") != -1 || currentCondition.indexOf("Snow") != -1) {
				icon = data[1].snow;
			} else if (currentCondition.indexOf("clear") != -1 || currentCondition.indexOf("Clear") != -1) {
				icon = data[1].clear;
			} else {
				icon = data[1].default;
			}
			console.log(icon);

			// Format date
			var d = currentDate + ":00";
			var d1 = d.split(" ");
			var date = d1[0].split("-");
			var time = d1[1].split(":");
			var dd = date[2];
			var mm = date[1] - 1;
			var yy = date[0];
			var hh = time[0];
			var min = time[1];
			var ss = time[2];
			var ms = 0;
			var fromdt = new Date(yy, mm, dd, hh, min, ss, ms);

			$("#space1").removeClass("hidden");
			$("#vis").append(`

            <div class="lg:col-span-1 row-span-1 w-auto h-auto mx-auto my-auto">
            <!--Date and time-->
            <h1 class="text-xl text-slate-300 flex justify-center text-center" id="date">${fromdt.toUTCString()}</h1>
            <!--icon and temp-->
            <div class="grid grid-cols-2 gap-4 my-5">
                <div class="md:h-20 md:w-20 h-10 w-10 mx-auto" id="icon">
                    <img src="./images/${icon}" alt="${currentCondition}" class="w-full h-full" />
                </div>
                <div class="md:text-6xl text-4xl font-bold my-auto" id="temp">${currentTemp}°c</div>
            </div>
            <!--weather condition-->
            <div class="md:text-4xl text-2xl font-bold flex justify-center text-center" id="weather">
                <p>${currentCondition}</p>
            </div>
            <!--wind speed and humidity-->
            <div class="grid grid-cols-2 gap-2">
                <!--humidity-->
                <div class="w-full">
                    <p class="text-xl text-slate-300 text-center">Humidity</p>
                    <p class="md:text-2xl text-xl text-center" id="wind">${currentHumidity} %</p>
                </div>
                <!--wind speed-->
                <div class="w-full">
                    <p class="text-xl text-slate-300 text-center">Wind Speed</p>
                    <p class="md:text-2xl text-xl text-center" id="wind">${currentWindSpeed} km/j</p>
                </div>
            </div>
        </div>
        <div class="lg:col-span-2 row-span-2" >
            <div class = "flex flex-col space-y-10 w-full h-auto">

                <!-- Forecast Chart -->
    <div class="w-[85%] mx-auto " id="space">
        <canvas id="myChart" class="w-full h-full" style="display: block; box-sizing: border-box"></canvas>
    </div>

                <!-- container for weekly data -->

                <div class = "grid grid-cols-3 gap-5 mx-5" id="forecast"></div>
            </div>

        </div>`);
			var firstIteration = true;
			var label = [];
			var temp = [];
			for (var i = 0; i < data[0].forecast.forecastday.length; i++) {
				const forecastTemp = data[0].forecast.forecastday[i].day.avgtemp_c;
				const forecastCondition = data[0].forecast.forecastday[i].day.condition.text;
				const forecastDays = data[0].forecast.forecastday[i].date;
				const forecastHumidity = data[0].forecast.forecastday[i].day.avghumidity;

				label.push(forecastDays);
				temp.push(forecastTemp);

				var forecastIcon;
				//get forecast correct icon
				if (forecastCondition.indexOf("rain") != -1 || forecastCondition.indexOf("Rain") != -1) {
					forecastIcon = data[1].rain;
				} else if (forecastCondition.indexOf("sun") != -1 || forecastCondition.indexOf("Sun") != -1) {
					forecastIcon = data[1].sun;
				} else if (forecastCondition.indexOf("cloud") != -1 || forecastCondition.indexOf("Cloud") != -1) {
					forecastIcon = data[1].cloud;
				} else if (forecastCondition.indexOf("wind") != -1 || forecastCondition.indexOf("Wind") != -1) {
					forecastIcon = data[1].wind;
				} else if (forecastCondition.indexOf("snow") != -1 || forecastCondition.indexOf("Snow") != -1) {
					forecastIcon = data[1].snow;
				} else if (forecastCondition.indexOf("clear") != -1 || forecastCondition.indexOf("Clear") != -1) {
					forecastIcon = data[1].clear;
				} else {
					forecastIcon = data[1].default;
				}
				//append forecast data to html
				$("#forecast").append(`

                                    <div class ="flex flex-col space-y-4 bg-blue-400 text-white w-fit mx-auto  h-fit p-5 rounded-md">
                                            <p class="text-center" id="day">${forecastDays}</p>
                                            <div class="h-10 w-10 mx-auto" id="icon">
                                                <img src="./images/${forecastIcon}" alt="${forecastCondition}" class="w-full h-full" />
                                            </div>
                                            <p class="text-center" id="temp">Humidity</p>
                                            <p class="text-2xl text-center" id="temp">${forecastHumidity}%</p>
                                    </div>
                    `);
			}
			console.log(label);
			console.log(temp);

			if (document.getElementById("space").hasChildNodes) {
				document.getElementById("space").removeChild(document.getElementById("space").childNodes[0]);
				document.getElementById("space").innerHTML = '<canvas id="myChart" class="w-full h-full"  style="display: block; box-sizing: border-box; height: 555px; width: 1111.5px"></canvas>';
			}
			const ctx = document.getElementById("myChart").getContext("2d");
			const myChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: label,
					datasets: [
						{
							label: "Average Temperature",
							data: temp,
							backgroundColor: "teal",
							borderColor: "cyan",
							borderWidth: 2,
							fill: true,
						},
					],
				},
				options: {
					elements: {
						line: {
							tension: 0.5,
						},
					},
					responsive: true,
					scales: {
						y: {
							beginAtZero: false,
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
