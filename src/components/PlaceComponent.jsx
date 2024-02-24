import { createSignal, onMount } from "solid-js";

import { getPlaceNearbyWithDirection } from '../api/geonames.js';

function PlaceComponent() {
  const [place, setPlace] = createSignal("");
  const [direction, setDirection] = createSignal("");

  onMount(async () => {
    const lat = 57.643542;
    const lng = 11.829234;

    const { place, direction } = await getPlaceNearbyWithDirection(lat, lng);

    setPlace(place);
    setDirection(direction);
  });

  return (
    <p>{place()} - {direction()}</p>
  );
}

export default PlaceComponent;