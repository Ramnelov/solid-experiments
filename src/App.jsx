import { onMount, onCleanup } from "solid-js";
import { Router, Route } from "@solidjs/router";
import HomeView from "./views/HomeView";
import DroneView from "./views/DroneView";
import MapComponent from "./components/MapComponent";
import LoginComponent from "./components/LoginComponent";

const App = () => {
  let intervalId;

  onMount(() => {
    console.log("Printing every 10 seconds");
    intervalId = setInterval(() => {
      console.log("Printing every 10 seconds");
    }, 10000);
  });

  onCleanup(() => {
    clearInterval(intervalId);
  });

  return (
    <>
      <h1>My Site with lots of tes</h1>
      <Router>
        <Route path="/" component={HomeView} />
        <Route path="/map" component={MapComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/:id" component={DroneView} />
      </Router>
    </>
  );
};

export default App;