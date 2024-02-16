import { onMount } from 'solid-js';

function MapComponent() {
  let map;

  onMount(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.body.appendChild(script);

    return () => {
      window.initMap = undefined;
    };
  });

  const initMap = () => {
    const locations = [
      { lat: -34.397, lng: 150.644, color: 'red', label: 'Label 1' },
      { lat: -34.497, lng: 150.744, color: 'blue', label: 'Label 2' },
      // add more locations as needed
    ];
  
    map = new google.maps.Map(document.getElementById('map'), {
      center: locations[0],
      zoom: 8,
    });
  
    map.addListener('tilesloaded', () => {
      locations.forEach(location => {
        new google.maps.Marker({
          position: location,
          map: map,
          icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${location.color}-dot.png`,
          },
          label: {
            text: location.label,
            color: location.color,
            fontSize: '16px',
          },
        });
      });
    });
  };

  return (
    <div id="map" style="height: 400px; width: 100%;"></div>
  );
}

export default MapComponent;