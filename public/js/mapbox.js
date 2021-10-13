/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY29uYWw4NCIsImEiOiJja3VmdnZmeXgxeWlhMnVtb2s4dXBsdHUzIn0.oO2f_bHXq82vQ3FrnPjvBA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/conal84/ckulg9fhr864g17nv01833zvh',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 6,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
