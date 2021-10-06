/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiY29uYWw4NCIsImEiOiJja3VmdnZmeXgxeWlhMnVtb2s4dXBsdHUzIn0.oO2f_bHXq82vQ3FrnPjvBA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
