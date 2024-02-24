import { createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import droneData from "../api/drone-data.json";

const DroneView = () => {
  // State to hold the ID
  const [id, setId] = createSignal(useParams().id);
  const [data, setData] = createSignal();
  const navigate = useNavigate();

  let intervalId;

  onMount(() => {

    const drone = droneData.find(drone => drone.id === +id());

    if (!drone) {
      navigate('/');
      return;
    }

    setData(drone);
    console.log(data());

    

    intervalId = setInterval(() => {
      setData(droneData.find(drone => drone.id === +id()));
      console.log(data());
    }, 10000);
  });

  onCleanup(() => {
    clearInterval(intervalId);
  });

  return (
    <div>
      <h1>View for ID: {id()}</h1>
      {/* Other view components using the id state */}
    </div>
  );
};

export default DroneView;
