const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
const searchInput = document.getElementsByClassName("searchInput")[0];
const suggestions = document.getElementsByClassName('suggestions')[0];
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(data));


function findMatches(zip, cities){

    return cities[0].filter(place =>{
        const regex = new RegExp(zip, 'gi');
        return (place.zip).match(regex);
    }); 
}

function numberwithCommas(x){
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(event){
    
    let matchingZipCodes = findMatches(event.target.value, cities);
    console.log(matchingZipCodes);
    const html = matchingZipCodes.map(place => {
        const regex = new RegExp(this.value, 'gi');
        return `
        <li>
            <span class = "name">${place.name}</span>
            <span class="type">${place.type} | ${place.category} </span>
            <span class = "address">${place.city}, ${place.state}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

async function windowActions(){
    
    searchInput.addEventListener('keyup', (evt)=>{
        displayMatches(evt);
    });
}

window.onload = windowActions;
