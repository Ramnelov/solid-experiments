import axios from "axios";

//const lat = 57.643542;
//const lng = 11.829234;
const username = import.meta.env.VITE_GEONAMES_USERNAME;
const directions = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];
const cities = "cities15000";

export async function getPlaceNearbyWithDirection(lat, lng) {
  let place, direction;

  try {
    const response = await axios.get(
      `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&cities=${cities}&username=${username}`
    );
    if (response.data.geonames[0]) {
      place = response.data.geonames[0].name;

      const cityLat = parseFloat(response.data.geonames[0].lat);
      const cityLng = parseFloat(response.data.geonames[0].lng);

      const dLon = (lng - cityLng) * (Math.PI / 180);
      const latInRadians = lat * (Math.PI / 180);
      const cityLatInRadians = cityLat * (Math.PI / 180);

      const y = Math.sin(dLon) * Math.cos(latInRadians);
      const x =
        Math.cos(cityLatInRadians) * Math.sin(latInRadians) -
        Math.sin(cityLatInRadians) * Math.cos(latInRadians) * Math.cos(dLon);
      let brng = Math.atan2(y, x) * (180 / Math.PI);
      brng = (brng + 360) % 360;

      direction = directions[Math.round((brng % 360) / 45) % 8];
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.log(error);
  }

  return { place, direction };
}

