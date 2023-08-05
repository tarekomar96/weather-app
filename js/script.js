
let cityInput = document.getElementById('cityInput')


async function getWeatherData(city){
let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
if(result.status != 400 ){
let data = await result.json();
// console.log(data.current.condition.text);
// console.log(data.forecast.forecastday)
DisplayLiveDay(data.location , data.current)
DisplayNextDays(data.forecast.forecastday)

}

}

getWeatherData('london')




cityInput.addEventListener('keyup' , (city)=>{
let cityName = city.target.value;
getWeatherData(cityName)
})

//             0            1            2          3           4            5 
let days = [ 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ];

let months = ["January","February","March" , "April" , "May" , "June" , "July","August","September","October","November","December"];

function DisplayLiveDay(cityLocation , cityCurrent ){
let date = new Date();
let cartoona = 


`<div class="col-md-3 translate-middle-y">


<div class="item1 h-100  ">


    <div class="item1-uppdiv d-flex justify-content-between bg-danger">
        <span class="ms-2">${days[date.getDay()]}</span>
        <span class="me-2">${date.getDate()} ${months[date.getMonth()]}</span>
    </div>

    <p class="mt-4 ms-3">${cityLocation.name}</p>

    <div class="d-flex justify-content-between">
        <p class="mt-3 ms-3 fs-1">${cityCurrent.temp_c}</p>
        <img src="https:${cityCurrent.condition.icon}" class="me-3" />
    </div>

    <p class=" ms-3">${cityCurrent.condition.text}</p>


    <div class="item1-lowerinfo d-flex justify-content-start mb-3 ">

        <div>
            <img src="./images/icon-umberella@2x.png" />
            <span> ${cityCurrent.wind_kph}</span>
        </div>

        <div>
            <img src="./images/icon-wind@2x.png" />
            <span> ${cityCurrent.wind_dir}</span>
        </div>

        <div>
            <img src="./images/icon-compass@2x.png" />
            <span> ${cityCurrent.humidity}</span>
        </div>


    </div>



</div>
</div>
`



document.getElementById('result').innerHTML = cartoona
}

function DisplayNextDays(cityForecast){
let date = new Date();
cartoona = ''
for (let index = 1; index < (cityForecast.length); index++) {
    let dayWeek =( date.getDay() + index )
console.log(index);
if(dayWeek > 6 ){
    dayWeek = index - 1

}
// console.log(dayWeek);

// console.log(days[dayWeek]);

cartoona +=


`
<div class="col-md-3 translate-middle-y">
<div class="item2 bg-white text-center h-100 ">


    <div class="item2-uppdiv text-center">
        <span>${days[dayWeek]}</span>
    </div>


    <img src="https:${cityForecast[index].day.condition.icon}" class="mt-3" />



    <div>
        <p>${cityForecast[index].day.maxtemp_c}</p>
        <p>${cityForecast[index].day.mintemp_c}</p>
    </div>

    <p>${cityForecast[index].day.condition.text}</p>

</div>
</div>




`

}

document.getElementById('result').innerHTML += cartoona;

}