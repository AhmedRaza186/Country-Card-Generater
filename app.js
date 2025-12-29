let button = document.querySelector('button')
let body = document.querySelector('body')
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

 
}
function displayCards(country,city,state){
 fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json().then(response =>{
     console.log(response)
     let {population,unMember,area} = response[0]
let scaled = (population / 1000000).toFixed(1) + ' M'

console.log(scaled)
     let timeZone = response[0].timezones[0]
     let continents = response[0].continents[0]
     let capital =response[0].capital[0]
 let neighbours = response[0].borders || []
let {png:flag} = response[0].flags

let card = document.createElement('div')
card.className = 'country-card'
body.appendChild(card)
card.innerHTML = `<img class="country-flag" src="${flag}"/>

  <div class="card-body">
    <h2 class="country-name">Your Country: ${country}</h2>
    <p class="country-location">Your Region: ${city},${state}</p>

    <h3>About your Country</h3>

    <ul class="country-info">
      <li><strong>Population:</strong> <span class="population">${scaled}</span></li>
      <li><strong>Area:</strong> <span class="area">${area}</span> km²</li>
      <li><strong>UN Member:</strong> <span class="un">${unMember?'Yes':'No'}</span></li>
      <li><strong>Capital:</strong> <span class="capital">${capital}</span></li>
      <li><strong>Time Zone:</strong> <span class="timezone">${timeZone}</span></li>

    </ul>
  </div>`
  let neighbourH1 = document.createElement('h1')
  neighbourH1.innerText = 'Your Neighbouring Countries :'
  body.appendChild(neighbourH1)
  neighbours.forEach(neighbour => {
    neighboursDisplay(neighbour)
  });
} ))


}

function neighboursDisplay(neighbour){
 fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(response => response.json().then(response =>{
     console.log(response)
     let {population,unMember,area} = response[0]
let {common:name} = response[0].name

let scaled = (population / 1_000_000).toFixed(1) + ' M'

console.log(scaled)
     let timeZone = response[0].timezones[0]
     let continents = response[0].continents[0]
     let capital =response[0].capital[0]
let {png:flag} = response[0].flags

let card = document.createElement('div')
card.className = 'country-card'
body.appendChild(card)
card.innerHTML = `<img class="country-flag" src="${flag}"/>

  <div class="card-body">
    <h2 class="country-name">Country: ${name}</h2>

    <h3>About Country</h3>

    <ul class="country-info">
      <li><strong>Population:</strong> <span class="population">${scaled}</span></li>
      <li><strong>Area:</strong> <span class="area">${area}</span> km²</li>
      <li><strong>UN Member:</strong> <span class="un">${unMember?'Yes':'No'}</span></li>
      <li><strong>Capital:</strong> <span class="capital">${capital}</span></li>
      <li><strong>Time Zone:</strong> <span class="timezone">${timeZone}</span></li>

    </ul>
  </div>`
} ))
}