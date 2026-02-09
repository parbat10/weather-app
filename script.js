const cy=document.querySelector("#Location");
cy.placeholder="Enter a location..."
const form=document.querySelector("form");
const body = document.querySelector("body")
const tempContainer=document.querySelector(".weather-container");

const apiKey = 'U46X9V9CJGBXHWEM6AUG9G3NJ';
form.addEventListener("submit",(e)=>{
  e.preventDefault()

  const city = cy.value;
  fetchWeatherData(city)
  cy.value="";
})


async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log('Weather data:', data.days[0]);
    displayWeather(data.days[0]);
  } catch (error) {
    console.log('Error fetching weather data:', error);
  } 
}


function displayWeather(weather) {
  
  tempContainer.innerHTML="";

  const h1 = document.createElement("h1")
  h1.textContent = `Temperature: ${weather.temp}\u00B0c`;
  const icons=displayIcons(weather.icon);

  const image=document.createElement("img")
  image.src=icons;
  const p = document.createElement("p")
  p.textContent = weather.description;

  console.log(weather.humidity)
  const feelsLike=document.createElement("p");
  feelsLike.textContent=`Feels Like: ${weather.feelslike}\u00B0c` 

  const hour1=document.createElement("p")
  hour1.textContent=`temp after 1 hour: ${weather.hours[0].temp}\u00B0c`

  const hour2=document.createElement("p")
  hour2.textContent=`temp after 2 hour: ${weather.hours[1].temp}\u00B0c`

  const hour3=document.createElement("p")
  hour3.textContent=`temp after 3 hour: ${weather.hours[2].temp}\u00B0c`

  const hour4=document.createElement("p")
  hour4.textContent=`temp after 4 hour: ${weather.hours[3].temp}\u00B0c`

  const hour5=document.createElement("p")
  hour5.textContent=`temp after 5 hour: ${weather.hours[4].temp}\u00B0c`
  

  tempContainer.append(
    feelsLike,
    h1,
    p,
    image,
    hour1,
    hour2,
    hour3,
    hour4,
    hour5
  );
}

function displayIcons(icons) {
  switch (icons) {
    case "sunny":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrfgVoMeyMdKrMmNsnF6o-3pljESmRAJa4A&s"

    case "clear-day":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSVbFlD3ZmqXPp95danqP3uALSV4f1vBxdA&s"

    case "rain":
      return "https://cdn-icons-png.flaticon.com/512/4724/4724091.png"

    case "snow":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxH45TW8lg_fzXENJdJbHItn4--ggAh2yfmg&s"
  }
}