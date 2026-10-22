const [{ Map, InfoWindow }, { AdvancedMarkerElement },{ LatLngBounds }] = await Promise.all([
  google.maps.importLibrary('maps'),
  google.maps.importLibrary('marker'),
   google.maps.importLibrary('core'),
]);

const APIKEY = '';

const bmgLoc = { lat: 40.09543950426593, lng: -74.2221793333354 };
const pcsLoc = { lat: 40.108884911823516, lng: -74.21764740599487 };

const map = new /*google.maps.*/Map(document.getElementById('map'), {
  center: bmgLoc,
  zoom: 18,
  renderingType: 'VECTOR',
  mapTypeId: 'satellite',
  mapId: 'DEMO_MAP_ID'
});

const infoWindow = new InfoWindow();
const bounds = new LatLngBounds();
let storageGeo = [];
let markers = []

async function fetchJson(url){
    const data = await fetch(url);
    if(!data.ok) {
        throw new Error(`${data.status} ${data.statusText}`);
    }
    return await data.json();
}

const resultsDiv = document.querySelector("#results");
const clearButton = document.querySelector("#clearButton");

async function loadResults(data) {
  // const data = await fetchJson(url);
  // console.log(data);
  const locations = [];

  // resultsDiv.innerHTML = '';

  data.geonames.forEach(geoname => {
    const marker = new AdvancedMarkerElement({
      map,
      position: {lat: geoname.lat , lng:geoname.lng },
      title: geoname.title
    });
    markers.push(marker);

    const s = {
      lat: geoname.lat,
      lng: geoname.lng,
      title: geoname.title,
      summary: geoname.summary,
      wikipediaUrl: geoname.wikipediaUrl
      };


    storageGeo.push(s);
    
    locations.push(marker.position)

    const markerImg = document.createElement('img');
    markerImg.src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Guacamole_IMGP1271.jpg";
    markerImg.className = 'map-icon';
    marker.append(markerImg);

    marker.addEventListener('click',()=>{
      infoWindow.setContent(
         `<div class="popup">
                <div>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Guacamole_IMGP1271.jpg" alt="Location Image">
                </div>
                <h3>${geoname.title}</h3>
                <p>${geoname.summary}</p>
                <a href="https://${geoname.wikipediaUrl}" target="_blank">Visit Website</a>
            </div>`
      )
      infoWindow.open({
        anchor: marker
      })
    })

    resultsDiv.insertAdjacentHTML('beforeend', `<div class="card">
                <div>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Guacamole_IMGP1271.jpg" alt="Location Image">
                </div>
                <h3>${geoname.title}</h3>
                <p>${geoname.summary}</p>
                <a href="https://${geoname.wikipediaUrl}" target="_blank">Visit Website</a>
            </div>`);

     resultsDiv.lastElementChild.addEventListener("click", ()=>{
      map.panTo(marker.position)
      map.setZoom(18)
     })
  });

      
  localStorage.setItem('data', JSON.stringify({ geonames: storageGeo }));

  
  locations.forEach(location =>{
    bounds.extend(location);
  })

  map.fitBounds(bounds);

}

const searchButton = document.querySelector("#searchButton");
const search = document.querySelector("#search");

searchButton.addEventListener("click",async ()=>{

    const place = search.value;

    const geonameUrl = `http://api.geonames.org/wikipediaSearch?q=${place}&maxRows=10&username=${APIKEY}&type=json`;
    const data = await fetchJson(geonameUrl);

    loadResults(data)
})

clearButton.addEventListener('click', ()=>{
  markers.forEach(m => m.map = null)
  markers = []
  localStorage.clear();
  resultsDiv.innerHTML = '';
});

async function onLoad(){
  const data = JSON.parse(localStorage.getItem('data'));
  
  if(data){
   await loadResults(data)
  }
}
onLoad();
