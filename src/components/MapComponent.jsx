import { onMount, createEffect } from "solid-js";

function MapComponent({ initialCenter, initialZoom, markerPosition }) {
  let map;
  let marker = null;

  const initMap = async () => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      map = new google.maps.Map(mapElement, {
        center: initialCenter,
        zoom: initialZoom,
        mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
      });

      marker = new google.maps.Marker({
        position: markerPosition(),
        map: map,
      });

      createEffect(() => {
        if (marker) {
          marker.setPosition(markerPosition());
        }
      });
    }
  };

  onMount(() => {
    window.initMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=marker&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });

  

  return <div id="map" style="height: 400px; width: 100%;"></div>;
}

export default MapComponent;