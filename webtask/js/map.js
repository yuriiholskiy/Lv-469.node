mapboxgl.accessToken = 'pk.eyJ1IjoiZXJldHkiLCJhIjoiY2s1MDF5NmJhMGRhMDNlbWlmNHJuM2VuZyJ9.VvA1nt0FOFUVrHtbqQGH-g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [24.0191, 49.839],
  zoom: 15
})

const marker = new mapboxgl.Marker()
  .setLngLat([24.0191, 49.839])
  .addTo(map);
