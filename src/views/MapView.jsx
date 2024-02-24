import { createSignal, createMemo } from "solid-js";
import MapComponent from "../components/MapComponent";
import { getPlaceNearbyWithDirection } from "../api/geonames.js";

function MapView() {
  const [location, setLocation] = createSignal({ place: "", direction: "" });
  const [lat, setLat] = createSignal(57.640658); // initial latitude
  const [lng, setLng] = createSignal(11.824122); // initial longitude

  const markerPosition = createMemo(() => ({ lat: lat(), lng: lng() }));

  async function fetchLocation() {
    const location = await getPlaceNearbyWithDirection(lat(), lng());
    setLocation(location);
    // use location here
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // update the latitude and longitude state variables
    setLat(parseFloat(event.target.lat.value));
    setLng(parseFloat(event.target.lng.value));
    
    fetchLocation();
  };

  return (
    <>
      <MapComponent
        initialCenter={{ lat: 57.640658, lng: 11.824122 }} // pass the latitude and longitude as props
        initialZoom={10}
        markerPosition={markerPosition} // pass the latitude and longitude as props
      />
      <div>
        Location: {location().place} - {location().direction}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="number"
            step="any"
            name="lat" // add name attribute to the input fields
            value={lat()}
            onChange={(e) => setLat(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            step="any"
            name="lng" // add name attribute to the input fields
            value={lng()}
            onChange={(e) => setLng(parseFloat(e.target.value))}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default MapView;
