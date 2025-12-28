let button = document.querySelector('button')
button.addEventListener('click', getCords)
function getCords() {
    console.log(navigator.geolocation)
    console.log(navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        let lat = position.coords.latitude
        let long = position.coords.longitude
        console.log(lat)
        console.log(long)
        locationFinder(lat, long)
    }))
}

function locationFinder(lat,long){
 fetch(`https://geocode.xyz/${lat},${long}?json=1&auth=21200425931751816733x21296`).then(response => response.json().then(response =>{
     console.log(response)
    let {country,city,state} = response
    console.log(country)
    console.log(city)
    console.log(state)
    displayCards(country,city,state)
 } ))
function displayCards(country,city,state){
 fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json().then(response =>{
     console.log(response)
     let {population,unMember,area} = response[0]
let digits = population.toString().length
let divider = 10 ** (digits - 3)

let scaled = (population / divider).toFixed(0)

console.log(scaled)
     let timeZone = response[0].timezones[0]
     let continents = response[0].continents[0]
     let capital =response[0].capital[0]
let [neighbour1,neighbour2,neighbour3,neighbour4]= response[0].borders
let {png:flag} = response[0].flags
     console.log(population)
     console.log(timeZone)
     console.log(capital)
     console.log(unMember)
     console.log(area)
     console.log(neighbour1)
     console.log(neighbour2)
     console.log(neighbour3)
     console.log(neighbour4)
     console.log(flag)
let card = document.querySelector('.country-card')
card.innerHTML = `<img class="country-flag" src="${flag}"/>

  <div class="card-body">
    <h2 class="country-name">Country: ${country}</h2>
    <p class="country-location">Region: ${city},${state}</p>

    <h3>About your Country</h3>

    <ul class="country-info">
      <li><strong>Population:</strong> <span class="population">${scaled}M+</span></li>
      <li><strong>Area:</strong> <span class="area">${area}</span> km²</li>
      <li><strong>UN Member:</strong> <span class="un">${unMember?'Yes':'No'}</span></li>
      <li><strong>Capital:</strong> <span class="capital">${capital}</span></li>
      <li><strong>Time Zone:</strong> <span class="timezone">${timeZone}</span></li>
      <li><strong>Neighbours:</strong> <span class="neighbours">${neighbour1},${neighbour2},${neighbour3},${neighbour4},</span></li>
    </ul>
  </div>`
} ))
}

}
